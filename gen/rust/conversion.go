package rust

import (
	"encoding/json"
	"fmt"
	"io/fs"
	"log"
	"os"
	"slices"
	"strconv"
	"strings"
	"text/template"

	"github.com/andrewbenington/go-pokemon-files/gen/schema"
	"github.com/samber/lo"
)

func isIntType(t string) bool {
	if len(t) < 2 {
		return false
	}
	if t[0] != 'i' && t[0] != 'u' {
		return false
	}
	number, err := strconv.Atoi(t[1:])
	return err == nil && (number == 8 || number == 16 || number == 32 || number == 64 || number == 128)
}

func rustBuildConversionMapReversed(source map[string]interface{}, keyType string, valueType string) string {
	mapString := "match "
	if valueType == "string" {
		mapString += "value.as_str() {"
	} else {
		mapString += "value {"
	}
	presentKeys := map[string]bool{}

	// create slice of key-value pairs sorted by key, so resulting map
	// is in alphabetical or numeric order
	keys := make([]string, 0, len(source))
	for k := range source {
		keys = append(keys, k)
	}

	if isIntType(keyType) {
		intKeys := lo.Map(keys, func(k string, _ int) int {
			i, err := strconv.Atoi(k)
			if err != nil {
				log.Fatalf("Int conversion map has non-int value: %s", k)
			}
			return i
		})
		slices.Sort(intKeys)
		keys = lo.Map(intKeys, func(k int, _ int) string { return strconv.Itoa(k) })
	} else {
		slices.Sort(keys)
	}

	var pairs []Pair
	for _, k := range keys {
		pairs = append(pairs, Pair{Key: k, Value: source[k]})
	}

	pairStrings := []string{}

	for _, pair := range pairs {
		keyString := pair.Key
		if keyType == "String" {
			keyString = fmt.Sprintf(`"%s".to_string()`, keyString)
		} else if keyType == "char" {
			keyString = fmt.Sprintf(`'%s'`, keyString)
		}
		valueString := fmt.Sprintf("%v", pair.Value)
		if valueType == "String" {
			valueString = fmt.Sprintf(`"%s"`, valueString)
		} else if valueType == "char" {
			valueString = fmt.Sprintf(`'%s'`, valueString)
		}
		if _, ok := presentKeys[valueString]; ok {
			continue
		}
		presentKeys[valueString] = true
		pairStrings = append(pairStrings, fmt.Sprintf("%v => Some(%v),", valueString, keyString))
	}

	mapString += strings.Join(pairStrings, "\n")
	mapString += "\n_ => None,\n}\n"
	return mapString
}

type Pair struct {
	Key   string
	Value interface{}
}

func rustBuildConversionMap(source map[string]interface{}, keyType string, valueType string) string {
	mapString := "match "
	if keyType == "string" {
		mapString += "key.as_str() {"
	} else {
		mapString += "key {"
	}

	// create slice of key-value pairs sorted by key, so resulting map
	// is in alphabetical or numeric order
	keys := make([]string, 0, len(source))
	for k := range source {
		keys = append(keys, k)
	}

	if isIntType(keyType) {
		intKeys := lo.Map(keys, func(k string, _ int) int {
			i, err := strconv.Atoi(k)
			if err != nil {
				log.Fatalf("Int conversion map has non-int value: %s", k)
			}
			return i
		})
		slices.Sort(intKeys)
		keys = lo.Map(intKeys, func(k int, _ int) string { return strconv.Itoa(k) })
	} else {
		slices.Sort(keys)
	}

	var pairs []Pair
	for _, k := range keys {
		pairs = append(pairs, Pair{Key: k, Value: source[k]})
	}

	pairStrings := []string{}

	for _, pair := range pairs {
		keyString := pair.Key
		if keyType == "String" {
			keyString = fmt.Sprintf(`"%s"`, keyString)
		} else if keyType == "char" {
			keyString = fmt.Sprintf(`'%s'`, keyString)
		}
		valueString := fmt.Sprintf("%v", pair.Value)
		if valueType == "String" {
			valueString = fmt.Sprintf(`"%s".to_string()`, valueString)
		} else if valueType == "char" {
			valueString = fmt.Sprintf(`'%s'`, valueString)
		}
		pairStrings = append(pairStrings, fmt.Sprintf("%v => Some(%v),", keyString, valueString))
	}

	mapString += strings.Join(pairStrings, "\n")
	mapString += "\n_ => None,\n}\n"
	return mapString
}

func getRustConversionType(t string) string {
	log.Println(t)
	if t == "string" {
		return "String"
	}
	if t == "char" {
		return "char"
	}
	if t == "uint8" {
		return "u8"
	}
	if t == "uint16" {
		return "u16"
	}
	return fmt.Sprintf("(TODO: getTSTypes (%s))", t)
}

const mapTemplate = `pub fn decode(key: {{ .InputType }}) -> Option<{{ .OutputType }}> {
	{{ buildFromMap .Map .InputType .OutputType }}
}

pub fn encode(value: {{ .OutputType }}) -> Option<{{ .InputType }}> {
	{{ buildToMap .Map .InputType .OutputType }}
}
`

func generateConversions() error {
	files, err := os.ReadDir("conversions")
	if err != nil {
		return err
	}
	names := []string{}
	for _, file := range files {
		err = generateConversion("conversions", file)
		if err != nil {
			return err
		}
		name := file.Name()
		names = append(names, name[:len(name)-5])
	}
	generateConversionIndex(names)
	return nil
}

func generateConversion(dir string, dirEntry fs.DirEntry) error {
	data, err := os.ReadFile(dir + "/" + dirEntry.Name())
	if err != nil {
		return err
	}
	conversion := schema.Conversion{}
	err = json.Unmarshal(data, &conversion)
	if err != nil {
		return err
	}

	err = os.MkdirAll("rust/src/conversion", 0755)
	if err != nil {
		return err
	}

	file, err := os.Create(fmt.Sprintf("rust/src/conversion/%s.rs", ToSnakeCase(conversion.Name)))
	if err != nil {
		fmt.Println("Error creating output file:", err)
		return nil
	}
	defer file.Close()

	if conversion.Type == "map" {
		mapConversion := schema.MapConversion{}
		err = json.Unmarshal(data, &mapConversion)
		if err != nil {
			return err
		}
		mapConversion.InputType = getRustConversionType(mapConversion.InputType)
		mapConversion.OutputType = getRustConversionType(mapConversion.OutputType)

		tmpl := template.Must(template.New("map").Funcs(template.FuncMap{
			"buildFromMap": rustBuildConversionMap,
			"buildToMap":   rustBuildConversionMapReversed,
			"getRustType":  getRustConversionType,
			"toSnakeCase":  ToSnakeCase,
		}).Parse(mapTemplate))
		err = tmpl.Execute(file, mapConversion)
	}

	if err != nil {
		fmt.Println("Error executing template:", err)
		return nil
	}
	return nil
}

func generateConversionIndex(names []string) {
	file, err := os.Create("rust/src/conversion.rs")
	if err != nil {
		fmt.Println("Error creating output file:", err)
		return
	}
	defer file.Close()

	fileText := ""

	for _, name := range names {
		fileText += fmt.Sprintf("pub mod %s;\n", ToSnakeCase(name))
	}

	fileText += "\n"

	_, err = file.WriteString(fileText)
	if err != nil {
		fmt.Println("Error writing to exports file:", err)
		return
	}
}

package typescript

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

func tsBuildConversionMapReversed(source map[string]interface{}, keyType string, valueType string) string {
	mapString := "{"
	presentKeys := map[string]bool{}

	// create slice of key-value pairs sorted by key, so resulting map
	// is in alphabetical or numeric order
	keys := make([]string, 0, len(source))
	for k := range source {
		keys = append(keys, k)
	}

	if keyType == "number" {
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

	for _, pair := range pairs {
		keyString := pair.Key
		if keyType == "string" {
			keyString = fmt.Sprintf(`"%s"`, keyString)
		}
		valueString := fmt.Sprintf("%v", pair.Value)
		if valueType == "string" {
			valueString = fmt.Sprintf(`"%s"`, valueString)
		}
		if _, ok := presentKeys[valueString]; ok {
			continue
		}
		presentKeys[valueString] = true
		mapString = fmt.Sprintf("%s\n%v: %v,", mapString, valueString, keyString)
	}
	mapString += "\n}"
	return mapString
}

type Pair struct {
	Key   string
	Value interface{}
}

func tsBuildConversionMap(source map[string]interface{}, keyType string, valueType string) string {
	mapString := "{"

	// create slice of key-value pairs sorted by key, so resulting map
	// is in alphabetical or numeric order
	keys := make([]string, 0, len(source))
	for k := range source {
		keys = append(keys, k)
	}

	if keyType == "number" {
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

	for _, pair := range pairs {
		keyString := pair.Key
		if keyType == "string" {
			keyString = fmt.Sprintf(`"%s"`, keyString)
		}
		valueString := fmt.Sprintf("%v", pair.Value)
		if valueType == "string" {
			valueString = fmt.Sprintf(`"%s"`, valueString)
		}
		mapString = fmt.Sprintf("%s\n%v: %v,", mapString, keyString, valueString)
	}
	mapString += "\n}"
	return mapString
}

func getTSType(t string) string {
	if t == "string" || t == "char" {
		return "string"
	}
	if strings.HasPrefix(t, "uint") {
		return "number"
	}
	return fmt.Sprintf("(TODO: getTSTypes (%s))", t)
}

const mapTemplate = `export const from{{ .Name }}Map: { [key: {{ .InputType }}]: {{ .OutputType }} } = {{ buildFromMap .Map .InputType .OutputType }}

export function from{{ .Name }}(key: {{ .InputType }}): {{ .OutputType }} {
	if (key in from{{ .Name }}Map) {
		return from{{ .Name }}Map[key]
	}
	{{- if eq .OutputType "string" }}
	return ` + "`${key}`" + `
	{{- else }}
	return key
	{{- end }}
}

export const to{{ .Name }}Map: { [key: {{ .OutputType }}]: {{ .InputType }} } = {{ buildToMap .Map .InputType .OutputType }}

export function to{{ .Name }}(key: {{ .OutputType }}): {{ .InputType }} {
	if (key in to{{ .Name }}Map) {
		return to{{ .Name }}Map[key]
	}
	{{- if eq .InputType "string" }}
	return ` + "`${key}`" + `
	{{- else if and (eq .OutputType "string") (eq (.InputType) "number") }}
	return parseFloat(key)
	{{- else }}
	return key
	{{- end }}
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
	fmt.Println(dir, dirEntry)
	data, err := os.ReadFile(dir + "/" + dirEntry.Name())
	if err != nil {
		return err
	}
	conversion := schema.Conversion{}
	err = json.Unmarshal(data, &conversion)
	if err != nil {
		return err
	}

	err = os.MkdirAll("src/conversion", 0755)
	if err != nil {
		return err
	}

	file, err := os.Create(fmt.Sprintf("src/conversion/%s.ts", conversion.Name))
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
		mapConversion.InputType = getTSType(mapConversion.InputType)
		mapConversion.OutputType = getTSType(mapConversion.OutputType)

		tmpl := template.Must(template.New("map").Funcs(template.FuncMap{
			"buildFromMap": tsBuildConversionMap,
			"buildToMap":   tsBuildConversionMapReversed,
			"getTSType":    getTSType,
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
	file, err := os.Create("src/conversion/index.ts")
	if err != nil {
		fmt.Println("Error creating output file:", err)
		return
	}
	defer file.Close()

	fileText := ""

	for _, name := range names {
		fileText += fmt.Sprintf("export * from './%s'\n", name)
	}

	fileText += "\n"

	_, err = file.WriteString(fileText)
	if err != nil {
		fmt.Println("Error writing to exports file:", err)
		return
	}
}

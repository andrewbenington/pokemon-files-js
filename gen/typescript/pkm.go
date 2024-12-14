package typescript

import (
	"encoding/json"
	"fmt"
	"os"
	"sort"
	"strings"
	"text/template"

	"github.com/andrewbenington/go-pokemon-files/gen/schema"
)

type InterfaceData struct {
	Formats string
	Fields  []InterfaceField
}

type InterfaceField struct {
	Name        string
	Universal   bool
	TypesJoined string
}

type IFieldByName []InterfaceField

func (a IFieldByName) Len() int           { return len(a) }
func (a IFieldByName) Less(i, j int) bool { return a[i].Name < a[j].Name }
func (a IFieldByName) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }

const interfaceTemplate = `// This file was generated by make generate
import * as types from './types'

export interface AllPKMFields {
	format: string
{{- range .Fields }}
	{{- if .Universal }}
  {{ .Name }}: {{ .TypesJoined }}
	{{- else }}
  {{ .Name }}?: {{ .TypesJoined }}
	{{- end }}
{{- end }}
	heldItemName: string
	language: string
  	isShadow?: boolean
	getLevel: () => number
	isShiny: () => boolean
	isSquareShiny: () => boolean
  	toBytes: () => ArrayBuffer
}`

var fieldOverrideList = []string{"formeNum", "trainerGender", "secretID"}

func generateInterface(formats []string) map[string]bool {
	fieldOverrides := map[string]bool{}
	universalFields := map[string]bool{}
	for _, field := range fieldOverrideList {
		fieldOverrides[field] = true
		universalFields[field] = true
	}
	allFieldTypes := map[string]map[string]bool{}
	allFormats := []string{}

	for i, format := range formats {
		// Read the content of the file
		data, err := os.ReadFile(fmt.Sprintf("src/schema/%s.json", format))
		if err != nil {
			fmt.Println("Error reading file:", err)
			return nil
		}

		var fileData schema.SchemaData
		json.Unmarshal(data, &fileData)

		allFormats = append(allFormats, fmt.Sprintf("'%s'", fileData.FileName))

		formatFields := map[string]bool{}

		for _, field := range fileData.Fields {
			formatFields[field.Name] = true
			tField, err := TypeScriptFieldFromSchemaField(field)
			if err != nil {
				fmt.Printf("%s: skipping %s (%s)\n", format, field.Name, err)
				continue
			}
			types, ok := allFieldTypes[tField.Name]
			if ok {
				if _, ok := types[tField.TypescriptType]; !ok {
					types[tField.TypescriptType] = true
				}
			} else {
				allFieldTypes[tField.Name] = map[string]bool{
					tField.TypescriptType: true,
				}
			}
		}

		// filter any fields not present from universalFields
		if i == 0 {
			for field := range formatFields {
				universalFields[field] = true
			}
		} else {
			for field := range universalFields {
				if _, ok := formatFields[field]; !ok {
					if !fieldOverrides[field] {
						delete(universalFields, field)
					}
				}
			}
		}

	}

	iData := InterfaceData{
		Formats: strings.Join(allFormats, " | "),
	}

	for name, typesMap := range allFieldTypes {
		types := []string{}
		for t := range typesMap {
			types = append(types, t)
		}
		iData.Fields = append(iData.Fields, InterfaceField{
			Name:        name,
			Universal:   universalFields[name],
			TypesJoined: strings.Join(types, " | "),
		})
	}

	sort.Sort(IFieldByName(iData.Fields))

	// Create the output file
	file, err := os.Create("src/util/pkmInterface.ts")
	if err != nil {
		fmt.Println("Error creating output file:", err)
		return nil
	}
	defer file.Close()

	// Create a template and execute it to generate the Go code
	tmpl := template.Must(template.New("PKMInterface").Parse(interfaceTemplate))
	err = tmpl.Execute(file, iData)
	if err != nil {
		fmt.Println("Error executing template:", err)
		return nil
	}

	return universalFields
}
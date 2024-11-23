package golang

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"text/template"

	"github.com/andrewbenington/go-pokemon-files/gen/schema"
)

// GoField represents a field with its properties and Go type
type GoField struct {
	schema.Field
	GoType string
}

// GoTemplateData represents the template data for PKM code generation
type GoTemplateData struct {
	FileName       string    `json:"fileName"`
	Fields         []GoField `json:"fields"`
	StringEncoding string    `json:"stringEncoding"`
	TotalBytes     int       `json:"totalBytes"`
}

func goGetIntFromBytesFunction(numBytes int, byteOffset int, endianness string) string {
	switch numBytes {
	case 1:
		return fmt.Sprintf("bytes[%d]", byteOffset)
	case 2:
		return fmt.Sprintf("binary.%sEndian.Uint16(bytes[%d:])", endianness, byteOffset)
	case 4:
		return fmt.Sprintf("binary.%sEndian.Uint32(bytes[%d:])", endianness, byteOffset)
	}
	return ""
}

const goTemplate = `
{{ $structName := .FileName }}
{{ $encoding := .StringEncoding }}
package pkm

import "encoding/binary"
{{- if eq $encoding "UTF-16" }}
import "github.com/andrewbenington/go-pokemon-files/util"
{{- end }}

// {{ $structName }} represents a Pokémon stored in a {{ $structName }} file
type {{ .FileName }} struct {
{{- range .Fields }}
	{{ .Name }} {{ .GoType }}
{{- end }}
}

{{- range .Fields }}

func (p *{{ $structName }}) write{{ .Name }}ToBytes(buffer []byte) {
{{- if eq .Type "number" }}
{{- if eq .NumBytes 1 }}
	buffer[{{ .ByteOffset }}] = p.{{ .Name }}
{{- else if eq .NumBytes 2 }}
	binary.{{ .Endian }}Endian.PutUint16(buffer[{{ .ByteOffset }}:], p.{{ .Name }})
{{- else if eq .NumBytes 4 }}
	binary.{{ .Endian }}Endian.PutUint32(buffer[{{ .ByteOffset }}:], p.{{ .Name }})
{{- else if eq .NumBytes 8 }}
	binary.{{ .Endian }}Endian.PutUint64(buffer[{{ .ByteOffset }}:], p.{{ .Name }})
{{- end }}
{{- else if and (eq .Type "string") (eq $encoding "UTF-16") }}
	utf16Bytes := util.EncodeUTF16ToBytes(p.{{ .Name }})
	copy(buffer[{{ .ByteOffset }}:], utf16Bytes)
{{- else if eq .Type "string" }}
	copy(buffer[{{ .ByteOffset }}:], []byte(p.{{ .Name }}))
{{- end }}
}



{{- end }}


func (p *{{ $structName }}) LoadFromBytes(bytes []byte) error {
{{- range .Fields }}
{{- if eq .Type "number" }}
	p.{{ .Name }} = {{ getIntFunction .NumBytes .ByteOffset .Endian }}
{{- else if and (eq .Type "string") (eq $encoding "UTF-16") }}
	{{ .Name }}Runes, err := util.DecodeBytesToUTF16(bytes[{{ .ByteOffset }}:{{ .ByteOffset }}+{{ .NumBytes }}])
	if err != nil {
		return err
	}
	p.{{ .Name }} = string({{ .Name }}Runes)
{{- else if eq .Type "string" }}
	p.{{ .Name }} = string(bytes[{{ .ByteOffset }}:{{ .ByteOffset }}+{{ .NumBytes }}])
{{- else if eq .Type "boolean" }}
	p.{{ .Name }} = getFlag(bytes, {{ .ByteOffset }}, {{ .BitOffset }})
{{- end }}
{{- end }}
	return nil
}

func (p *{{ $structName }}) WriteToBytes(bytes []byte) {
{{- range .Fields }}
{{- if eq .Type "number" }}
{{- if eq .NumBytes 1 }}
	bytes[{{ .ByteOffset }}] = p.{{ .Name }}
{{- else if eq .NumBytes 2 }}
	binary.{{ .Endian }}Endian.PutUint16(bytes[{{ .ByteOffset }}:], p.{{ .Name }})
{{- else if eq .NumBytes 4 }}
	binary.{{ .Endian }}Endian.PutUint32(bytes[{{ .ByteOffset }}:], p.{{ .Name }})
{{- else if eq .NumBytes 8 }}
	binary.{{ .Endian }}Endian.PutUint64(bytes[{{ .ByteOffset }}:], p.{{ .Name }})
{{- end }}
{{- else if and (eq .Type "string") (eq $encoding "UTF-16") }}
	copy(bytes[{{ .ByteOffset }}:], util.EncodeUTF16ToBytes(p.{{ .Name }}))
{{- else if eq .Type "string" }}
	copy(bytes[{{ .ByteOffset }}:], []byte(p.{{ .Name }}))
{{- end }}
{{- end }}
}

`

func GenerateFormat(format string) {

	// Read the content of the file
	data, err := os.ReadFile(fmt.Sprintf("src/schema/%s.json", format))
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	var fileData GoTemplateData
	json.Unmarshal(data, &fileData)

	filteredFields := []GoField{}
	for _, field := range fileData.Fields {
		if field.Type == "number" {
			if field.NumBytes == nil {
				continue
			}
			if *field.NumBytes == 1 {
				field.GoType = "uint8"
			} else if *field.NumBytes == 2 {
				field.GoType = "uint16"
			} else if *field.NumBytes == 4 {
				field.GoType = "uint32"
			} else {
				continue
			}
		} else if field.Type == "string" {
			field.GoType = "string"
		} else if field.Type == "boolean" {
			field.GoType = "bool"
		} else {
			continue
		}
		field.Name = strings.ToUpper(field.Name[:1]) + field.Name[1:]
		filteredFields = append(filteredFields, field)
	}

	fileData.Fields = filteredFields

	// Create the output file
	file, err := os.Create(fmt.Sprintf("pkm/%s.go", format))
	if err != nil {
		fmt.Println("Error creating output file:", err)
		return
	}
	defer file.Close()

	// Create a template and execute it to generate the Go code
	tmpl := template.Must(template.New(format).Funcs(template.FuncMap{
		"getIntFunction": goGetIntFromBytesFunction,
	}).Parse(goTemplate))
	err = tmpl.Execute(file, fileData)
	if err != nil {
		fmt.Println("Error executing template:", err)
		return
	}

	fmt.Println("Generated Go code in generated.go")
}

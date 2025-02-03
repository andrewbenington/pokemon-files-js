package rust

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/andrewbenington/go-pokemon-files/gen/schema"
)

var matchFirstCap = regexp.MustCompile("(.)([A-Z][a-z]+)")
var matchAllCap = regexp.MustCompile("([a-z0-9])([A-Z])")

func ToSnakeCase(str string) string {
	snake := matchFirstCap.ReplaceAllString(str, "${1}_${2}")
	snake = matchAllCap.ReplaceAllString(snake, "${1}_${2}")
	return strings.ToLower(snake)
}

// RustField represents a field with its properties and Rust type
type RustField struct {
	schema.Field
	RustType string
}

// RustSchemaData represents the template data for PKM code generation
type RustSchemaData struct {
	schema.SchemaData
	NameLowercase      string
	Fields             []RustField `json:"fields"`
	ImportsByNamespace map[string]RustImport
}

func (r *RustSchemaData) AddImport(namespace string, importItem string) {
	if existingNamespace, ok := r.ImportsByNamespace[namespace]; ok {
		for _, existingImport := range existingNamespace.Imports {
			if existingImport == importItem {
				return
			}
		}
		existingNamespace.Imports = append(existingNamespace.Imports, importItem)
		r.ImportsByNamespace[namespace] = existingNamespace
	} else {
		if r.ImportsByNamespace == nil {
			r.ImportsByNamespace = map[string]RustImport{}
		}
		r.ImportsByNamespace[namespace] = RustImport{
			Namespace: namespace,
			Imports:   []string{importItem},
		}
	}
}

func RustFieldFromSchemaField(sf schema.Field) (*RustField, error) {
	sf.Name = ToSnakeCase(sf.Name)
	rust_field := RustField{
		Field: sf,
	}
	if sf.NoWrite {
		rustType, err := getRustType(sf.Type, sf)
		if err != nil {
			return nil, err
		}
		rust_field.RustType = rustType
		return &rust_field, nil
	}
	if sf.Type == "ribbons" {
		return nil, fmt.Errorf("ribbons not implemented")

		// rust_field.RustType = "Vec<String>"
		// return &rust_field, nil
	}
	if sf.ByteOffset == nil {
		return nil, fmt.Errorf("ByteOffset not present")
	}

	if sf.Type == "boolean" {
		if sf.BitOffset == nil {
			return nil, fmt.Errorf("BitOffset not present in boolean field")
		}
	} else if sf.NumBytes == nil {
		return nil, fmt.Errorf("NumBytes not present in non-boolean field")
	}

	rustType, err := getRustType(sf.Type, sf)
	if err != nil {
		return nil, err
	}
	rust_field.RustType = rustType

	return &rust_field, nil
}

func getRustType(t string, f schema.Field) (string, error) {
	switch t {
	case "number", "number | undefined":
		if f.NumBytes == nil {
			return "", fmt.Errorf("NumBytes not present")
		}
		switch *f.NumBytes {
		case 1:
			return "u8", nil
		case 2:
			return "u16", nil
		case 4:
			return "u32", nil
		case 8:
			return "u64", nil
		}
	case "string":
		return "String", nil
	case "boolean":
		return "bool", nil
	case "Uint8Array":
		return fmt.Sprintf("[u8; %d]", *f.NumBytes), nil
	// case "pokedate", "pokedate | undefined":
	// 	return "types.PKMDate | undefined", nil
	case "stats", "ivs30Bits", "hyperTrainStats":
		return "Stats", nil
	case "statsPreSplit", "dvs":
		return "StatsPreSplit", nil
	// case "contestStats":
	// 	return "types.ContestStats", nil
	// case "marking":
	// 	return "types.Marking", nil
	// case "memory", "memory_3ds_trainer", "memory_3ds_handler", "memory_switch_trainer", "memory_switch_handler":
	// 	return "types.Memory", nil
	// case "geolocation":
	// 	return "types.Geolocation", nil
	case "tuple":
		tupleType, err := getRustType(f.TupleType, f)
		if err != nil {
			return "", err
		}
		return fmt.Sprintf("[%s; %d]", tupleType, f.TupleLength), nil
		// case "MarkingsFourShapes":
		// 	return "types.MarkingsFourShapes", nil
		// case "MarkingsSixShapesNoColor":
		// 	return "types.MarkingsSixShapesNoColor", nil
		// case "MarkingsSixShapesWithColor":
		// 	return "types.MarkingsSixShapesWithColor", nil
	}
	return "", fmt.Errorf("(TODO: getRustType(%s))", t)
}

type RustImport struct {
	Namespace string
	Imports   []string
}

func (i RustImport) GetUseString() string {
	if len(i.Imports) == 1 {
		return fmt.Sprintf("use %s::%s;", i.Namespace, i.Imports[0])
	}
	return fmt.Sprintf("use %s::{%s};", i.Namespace, strings.Join(i.Imports, ", "))
}

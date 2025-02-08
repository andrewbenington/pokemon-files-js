package typescript

import (
	"fmt"
	"strings"

	"github.com/andrewbenington/go-pokemon-files/gen/schema"
)

// Field represents a field with its properties and TypeScript type
type TypeScriptField struct {
	schema.Field
	NumBytes        int
	ByteOffset      int
	BitOffset       int
	TypescriptType  string
	NameCapitalized string
}

// TypeScriptSchemaData represents the template data for PKM code generation
type TypeScriptSchemaData struct {
	schema.SchemaData
	Fields         []TypeScriptField `json:"fields"`
	Imports        map[string]*[]string
	DefaultImports map[string]*[]string
}

func (t *TypeScriptSchemaData) AddImport(file string, imp string) {
	if existing, ok := t.Imports[file]; ok {
		for _, existingImport := range *existing {
			if existingImport == imp {
				return
			}
		}
		*existing = append(*existing, imp)
	} else {
		if t.Imports == nil {
			t.Imports = map[string]*[]string{}
		}
		t.Imports[file] = &[]string{imp}
	}
}

func (t *TypeScriptSchemaData) AddDefaultImport(file string, imp string) {
	if existing, ok := t.DefaultImports[file]; ok {
		for _, existingImport := range *existing {
			if existingImport == imp {
				return
			}
		}
		*existing = append(*existing, imp)
	} else {
		if t.DefaultImports == nil {
			t.DefaultImports = map[string]*[]string{}
		}
		t.DefaultImports[file] = &[]string{imp}
	}
}

func TypeScriptFieldFromSchemaField(sf schema.Field) (*TypeScriptField, error) {
	tf := TypeScriptField{
		Field:           sf,
		NameCapitalized: strings.ToUpper(sf.Name[:1]) + sf.Name[1:],
	}
	if sf.NoWrite {
		tf.TypescriptType = getTypescriptType(sf.Type)
		return &tf, nil
	}
	if sf.Type == "ribbons" {
		tf.TypescriptType = "string[]"
		return &tf, nil
	}
	if sf.ByteOffset == nil {
		return nil, fmt.Errorf("ByteOffset not present")
	}
	tf.ByteOffset = *sf.ByteOffset
	if sf.BitOffset != nil {
		tf.BitOffset = *sf.BitOffset
	}

	if sf.Type == "boolean" {
		if sf.BitOffset == nil {
			return nil, fmt.Errorf("BitOffset not present in boolean field")
		}
		tf.BitOffset = *sf.BitOffset
	} else if sf.NumBytes == nil {
		return nil, fmt.Errorf("NumBytes not present in non-boolean field")
	} else {
		tf.NumBytes = *sf.NumBytes
	}

	if sf.Type == "tuple" {
		tf.TypescriptType = fmt.Sprintf("%s[]", getTypescriptType(sf.TupleType))
	} else {
		tf.TypescriptType = getTypescriptType(sf.Type)
	}
	return &tf, nil
}

func getTypescriptType(t string) string {
	switch t {
	case "number", "float":
		return "number"
	case "number | undefined":
		return "number | undefined"
	case "string":
		return "string"
	case "boolean":
		return "boolean"
	case "Uint8Array":
		return "Uint8Array"
	case "pokedate", "pokedate | undefined":
		return "types.PKMDate | undefined"
	case "stats", "ivs30Bits":
		return "types.Stats"
	case "statsPreSplit", "dvs":
		return "types.StatsPreSplit"
	case "contestStats":
		return "types.ContestStats"
	case "hyperTrainStats":
		return "types.HyperTrainStats"
	case "marking":
		return "types.Marking"
	case "memory", "memory_3ds_trainer", "memory_3ds_handler", "memory_switch_trainer", "memory_switch_handler":
		return "types.Memory"
	case "geolocation":
		return "types.Geolocation"
	case "tuple":
		return fmt.Sprintf("%s[]", getTypescriptType(t))
	case "MarkingsFourShapes":
		return "types.MarkingsFourShapes"
	case "MarkingsSixShapesNoColor":
		return "types.MarkingsSixShapesNoColor"
	case "MarkingsSixShapesWithColor":
		return "types.MarkingsSixShapesWithColor"
	}
	return fmt.Sprintf("(TODO: getTypescriptType(%s))", t)
}

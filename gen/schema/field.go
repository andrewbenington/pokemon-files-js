package schema

import "fmt"

// Field represents a field with its properties
type Field struct {
	Name            string       `json:"Name"`
	Type            string       `json:"type"`
	TupleType       string       `json:"tupleType"`
	TupleLength     int          `json:"tupleLength"`
	SeperateBytes   bool         `json:"seperateBytes"`
	ByteOffset      *int         `json:"byteOffset"`
	NumBytes        *int         `json:"numBytes"`
	BitOffset       *int         `json:"bitOffset"`
	NumBits         *int         `json:"numBits"`
	Endian          string       `json:"endian"`
	Conversion      *Conversion  `json:"conversion"`
	TerminateString bool         `json:"terminateString"`
	RibbonSpans     []RibbonSpan `json:"ribbonSpans"`
	LengthCheck     int          `json:"lengthCheck"`
	NoWrite         bool         `json:"noWrite"`
	Default         *string      `json:"default"`
}

func (f *Field) ToString() string {
	if f.Type == "tuple" {
		return fmt.Sprintf("Field: %s (%s[%d])", f.Name, f.TupleType, f.TupleLength)
	}
	return fmt.Sprintf("Field: %s (%s)", f.Name, f.Type)
}

type Conversion struct {
	Type       string `json:"type"`
	Name       string `json:"name"`
	InputType  string `json:"inputType"`
	OutputType string `json:"outputType"`
}

type MapConversion struct {
	Name       string                 `json:"name"`
	Map        map[string]interface{} `json:"map"`
	InputType  string                 `json:"inputType"`
	OutputType string                 `json:"outputType"`
}

type RibbonSpan struct {
	RibbonSet     string `json:"ribbonSet"`
	RibbonOffset  int    `json:"ribbonOffset"`
	ByteOffset    int    `json:"byteOffset"`
	BitOffset     int    `json:"bitOffset"`
	NumBits       int    `json:"numBits"`
	NumBytes      int    `json:"numBytes"`
	ContestCounts bool   `json:"contestCounts"`
}

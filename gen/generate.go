package main

import (
	"github.com/andrewbenington/go-pokemon-files/gen/typescript"
)

var (
	// formats = []string{"PK5", "PK8"}
	formats = []string{"PK1", "PK2", "PK3", "COLOPKM", "XDPKM", "PK4", "PK5", "PK6", "PK7", "PB7", "PK8", "PA8", "PB8", "PK9"}
)

func main() {
	// golang.Generate(formats)
	typescript.Generate(formats)
	// rust.Generate(formats)
}

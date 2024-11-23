package typescript

import (
	"fmt"
	"os"
	"strings"
)

func generateIndex(formats []string) {
	file, err := os.Create("src/pkm/index.ts")
	if err != nil {
		fmt.Println("Error creating output file:", err)
		return
	}
	defer file.Close()

	fileText := generatedMessageWithNewline

	for _, format := range formats {
		fileText += fmt.Sprintf("import %s from './%s'\n", format, format)
	}

	fileText += "\n"

	for _, format := range formats {
		fileText += fmt.Sprintf("export * from './%s'\n", format)
	}

	fileText += "\nexport type PKM = " + strings.Join(formats, " | ")
	fileText += "\nexport type PKMType = typeof " + strings.Join(formats, " | typeof ")
	fileText += "\nexport * from './fileImport'"

	_, err = file.WriteString(fileText)
	if err != nil {
		fmt.Println("Error writing to exports file:", err)
		return
	}

}

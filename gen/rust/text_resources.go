package rust

import (
	"fmt"
	"io/fs"
	"os"
	"path"
	"strings"
)

func generateRustEnums(dir string) error {
	files, err := os.ReadDir(dir)
	if err != nil {
		return fmt.Errorf("read directory %s: %w", dir, err)
	}

	names := []string{}
	for _, file := range files {
		if file.IsDir() {
			return generateRustEnums(path.Join(dir, file.Name()))
		}
		err = generateRustEnum(dir, file)
		if err != nil {
			return fmt.Errorf("generateRustEnum: %w", err)
		}
		name := file.Name()
		names = append(names, name[:len(name)-5])
	}
	return nil
}

func generateRustEnum(dir string, dirEntry fs.DirEntry) error {
	if dirEntry.IsDir() {
		panic(fmt.Sprintf("direntry: %s", dirEntry.Name()))
	}
	data, err := os.ReadFile(path.Join(dir, dirEntry.Name()))
	if err != nil {
		return err
	}

	err = os.MkdirAll(path.Join("rust/src", dir), 0755)
	if err != nil {
		return err
	}

	filename := path.Join("rust/src", dir, strings.ReplaceAll(dirEntry.Name(), ".txt", ".rs"))

	file, err := os.Create(filename)
	if err != nil {
		fmt.Println("Error creating output file:", err)
		return nil
	}
	defer file.Close()

	arrayName := dirEntry.Name()
	arrayName = strings.TrimSuffix(arrayName, path.Ext(arrayName))

	arrayName = fmt.Sprintf("%s_%s", strings.ToUpper(arrayName), strings.ToUpper(path.Base(dir)))

	lines := strings.Split(string(data), "\n")
	file.WriteString(fmt.Sprintf("static %s: [&str; %d] = [", arrayName, len(lines)))
	for _, line := range lines {
		file.WriteString(fmt.Sprintf("\"%s\",\n", line))
	}
	file.WriteString("];")

	return nil
}

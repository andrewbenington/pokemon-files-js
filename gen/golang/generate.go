package golang

func Generate(formats []string) {
	for _, format := range formats {
		GenerateFormat(format)
	}
}

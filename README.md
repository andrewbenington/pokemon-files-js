# Pokémon Files

JavaScript/TypeScript library for reading and writing Pokémon binary files (`.pkm`, `.pk9`, etc).

The classes in this library are TypeScript implementations of the PKM source code in the [PKHeX](https://github.com/kwsch/PKHeX) project. This library would not exist without the research done by the PKHeX developers.

## Code Generation

Code generation is done with Go. Once you have Go installed, run `go run gen/generate.go` to generate the code. Then run `npm run lint` and `npm run format` to ensure the formatting is standardized. On Unix, you can accomplish all three with `make generate`.

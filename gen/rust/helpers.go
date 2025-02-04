package rust

import (
	"fmt"
	"strings"

	"github.com/andrewbenington/go-pokemon-files/gen/schema"
)

func panicIfNilNumBytes(field RustField, caller string) {
	if field.NumBytes == nil {
		panic(fmt.Sprintf("%s: NumBytes is nil for %s", caller, field.ToString()))
	}
}

func panicIfNilByteOffset(field RustField, caller string) {
	if field.ByteOffset == nil {
		panic(fmt.Sprintf("%s: ByteOffset is nil for %s", caller, field.ToString()))
	}
}

func panicIfNilBitOffset(field RustField, caller string) {
	if field.BitOffset == nil {
		panic(fmt.Sprintf("%s: BitOffset is nil for %s", caller, field.ToString()))
	}
}

func defaultValueByField(field RustField) string {
	if field.Name == "nickname" {
		return "PokemonData[this.dexNum].formes[0].name"
	}
	if field.Name == "trainerName" {
		return `"TRAINER"`
	}
	switch field.Type {
	case "Uint8Array":
		panicIfNilNumBytes(field, "defaultValueByField")
		return fmt.Sprintf("new Uint8Array(%d)", *field.NumBytes)
	case "tuple":
		str := "["
		for i := 0; i < field.TupleLength; i++ {
			if i > 0 {
				str += ", "
			}
			str += defaultValueByType(field.TupleType)
		}
		return str + "]"
	default:
		return defaultValueByType(field.Type)
	}
}

func defaultValueByType(t string) string {
	switch t {
	case "string":
		return `''`
	case "number", "number | undefined", "marking":
		return "0"
	case "boolean":
		return "false"
	// case "pokedate", "pokedate | undefined":
	// 	return defaultPokeDate
	// case "stats", "ivs30Bits":
	// 	return defaultStats
	// case "statsPreSplit", "dvs":
	// 	return defaultStatsPreSplit
	// case "contestStats":
	// 	return defaultContestStats
	// case "memory", "memory_3ds_handler", "memory_3ds_trainer", "memory_switch_handler", "memory_switch_trainer":
	// 	return defaultMemory
	// case "geolocation":
	// 	return defaultGeolocation
	// case "hyperTrainStats":
	// 	return defaultHyperTrain
	case "ribbons":
		return "[]"
	case "MarkingsFourShapes":
		return "{ circle: false, triangle: false, square: false, heart: false }"
	case "MarkingsSixShapesNoColor", "MarkingsSixShapesWithColor":
		return "{ circle: false, triangle: false, square: false, heart: false, star: false, diamond: false }"
	default:
		return fmt.Sprintf("(TODO defaultValueByType: %s)", t)
	}
}

func stringFromBufferFunction(numBytes int, byteOffset int, encoding string, fieldName string) string {
	if encoding == "UTF-16" {
		return fmt.Sprintf(`strings::utf16_be_from_bytes(bytes[%d..%d].to_vec()).map_err(|e| format!("read field '%s': {}", e))?`, byteOffset, byteOffset+numBytes, fieldName)
	}
	if encoding == "Gen5" {
		return fmt.Sprintf("stringLogic.readGen5StringFromBytes(dataView, 0x%x, %d)", byteOffset, numBytes/2)
	}
	if encoding == "Gen4" {
		return fmt.Sprintf("stringLogic.readGen4StringFromBytes(dataView, 0x%x, %d)", byteOffset, numBytes/2)
	}
	if encoding == "Gen3" {
		return fmt.Sprintf("stringLogic.readGen3StringFromBytes(dataView, 0x%x, %d)", byteOffset, numBytes)
	}
	if encoding == "GameBoy" {
		return fmt.Sprintf("stringLogic.readGameBoyStringFromBytes(dataView, 0x%x, %d)", byteOffset, numBytes)
	}
	return fmt.Sprintf("Array.from(buffer.slice(0x%x, %d)).map(b => String.fromCharCode(b)).join('')", byteOffset, byteOffset+numBytes)
}

func intResultFromBytesFunction(numBytes int, byteOffset int, endianness string, fieldName string) string {
	isLittleEndian := endianness == "Little"
	sliceEnd := byteOffset + numBytes
	endianLetter := strings.ToLower(endianness[:1])

	var numType string
	switch numBytes {
	case 1:
		numType = "u8"
		return fmt.Sprintf("bytes[%d]", byteOffset)
	case 2:
		numType = "u16"
	case 3:
		numType = "u32"
		if !isLittleEndian {
			return fmt.Sprintf("(dataView.getUint32(0x%x, false) >> 8) & 0xffffff", byteOffset)
		}
		return fmt.Sprintf("dataView.getUint32(0x%x, true) & 0xffffff", byteOffset)
	case 4:
		numType = "u32"
	}
	return fmt.Sprintf(`%s::from_%se_bytes(to_sized_array(&bytes[%d..%d]))`, numType, endianLetter, byteOffset, sliceEnd)
}

func tupleFromBufferFunction(field RustField, endianness string) string {
	panicIfNilByteOffset(field, "tupleToBufferFunction")
	elements := []string{}

	for i := 0; i < field.TupleLength; i++ {
		switch field.TupleType {
		case "number":
			byteOffset := *field.ByteOffset + i*(*field.NumBytes)
			if field.NumBits != nil {
				panicIfNilBitOffset(field, "tupleToBufferFunction")
				panicIfNilNumBytes(field, "tupleToBufferFunction")
				endianLetter := strings.ToLower(endianness[:1])
				numType := "u8"
				if *field.NumBytes == 2 {
					numType = "u16"
				} else if *field.NumBytes > 2 {
					numType = "u32"
				}

				byteOffset := *field.ByteOffset
				bitOffset := *field.BitOffset
				if field.SeperateBytes {
					byteOffset += i
					bitOffset += i * (*field.NumBits)
				}
				function := fmt.Sprintf(`util::int_from_buffer_bits_%se::<%s>`, endianLetter, numType)
				calledFunction := fmt.Sprintf(`%s(bytes, %d, %d, %d)`, function, byteOffset, bitOffset, *field.NumBits)
				elements = append(elements, calledFunction)
			} else {
				panicIfNilNumBytes(field, "tupleToBufferFunction")
				elements = append(elements, intResultFromBytesFunction(*field.NumBytes, byteOffset, endianness, fmt.Sprintf("%s[%d]", field.Name, i)))
			}
			// case "marking":
			// 	funcString += fmt.Sprintf("buffer[0x%x],\n", *field.ByteOffset+i)
			// case "geolocation":
			// 	funcString += fmt.Sprintf("types.readGeolocationFromBytes(dataView, 0x%x),\n", *field.ByteOffset+2*i)
		}
	}

	return "[" + strings.Join(elements, ", ") + "]"
}

func fieldExists(fields []RustField, name string) bool {
	for _, field := range fields {
		if field.Name == name {
			return true
		}
	}
	return false
}

func ribbonListFromName(name string) string {
	switch name {
	case "gen-3-standard":
		return "Gen3StandardRibbons"
	case "gen-3-contest":
		return "Gen3ContestRibbons"
	case "gen-4":
		return "Gen4Ribbons"
	case "modern":
		return "ModernRibbons"
	default:
		return fmt.Sprintf("(TODO: %s ribbon enum)", name)
	}
}

func commaJoinStrings(elems []string) string {
	return strings.Join(elems, ", ")
}

func ribbonsFromBuffer(field RustField) string {
	fromBufferString := ""
	for _, span := range field.Field.RibbonSpans {
		var spanString string
		if span.ContestCounts {
			if span.NumBits == 40 {
				spanString = fmt.Sprintf("gen3ContestRibbonsFromBytes(dataView, 0x%x)", span.ByteOffset)
			} else {
				spanString = fmt.Sprintf("gen3ContestRibbonsFromBuffer(dataView, 0x%x, %d)", span.ByteOffset, span.BitOffset)
			}
		} else if span.NumBytes != 0 && span.RibbonOffset > 0 {
			// GCN games store each ribbon in its own byte, denoted by NumBytes != nil
			spanString = fmt.Sprintf("byteLogic.getByteIndexes(dataView, 0x%x, %d).map(index => %s[index + %d])", span.ByteOffset, span.NumBytes, ribbonListFromName(span.RibbonSet), span.RibbonOffset)
		} else if span.NumBytes != 0 {
			spanString = fmt.Sprintf("byteLogic.getByteIndexes(dataView, 0x%x, %d).map(index => %s[index])", span.ByteOffset, span.NumBytes, ribbonListFromName(span.RibbonSet))
		} else if span.RibbonOffset > 0 {
			spanString = fmt.Sprintf("byteLogic.getFlagIndexes(dataView, 0x%x, %d, %d).map(index => %s[index + %d])", span.ByteOffset, span.BitOffset, span.NumBits, ribbonListFromName(span.RibbonSet), span.RibbonOffset)
		} else {
			spanString = fmt.Sprintf("byteLogic.getFlagIndexes(dataView, 0x%x, %d, %d).map(index => %s[index])", span.ByteOffset, span.BitOffset, span.NumBits, ribbonListFromName(span.RibbonSet))
		}

		if fromBufferString == "" {
			fromBufferString = spanString
		} else {
			fromBufferString = fmt.Sprintf("%s.concat(%s)", fromBufferString, spanString)
		}
	}
	return fromBufferString
}

func getDecryptionFunction(fileType string) string {
	switch fileType {
	case "PK3":
		return "decryptByteArrayGen3"
	case "PK4", "PK5":
		return "decryptByteArrayGen45"
	case "PK6", "PK7":
		return "decryptByteArrayGen67"
	case "PK8", "PB8":
		return "decryptByteArrayGen8"
	case "PA8":
		return "decryptByteArrayGen8A"
	}
	return ""
}

func getUnshuffleFunction(fileType string) string {
	switch fileType {
	case "PK3":
		return "unshuffleBlocksGen3"
	case "PK4", "PK5":
		return "unshuffleBlocksGen45"
	case "PK6", "PK7":
		return "unshuffleBlocksGen67"
	case "PK8", "PB8":
		return "unshuffleBlocksGen8"
	case "PA8":
		return "unshuffleBlocksGen8A"
	}
	return ""
}

func getShuffleFunction(fileType string) string {
	switch fileType {
	case "PK3":
		return "shuffleBlocksGen3"
	case "PK4", "PK5":
		return "shuffleBlocksGen45"
	case "PK6", "PK7":
		return "shuffleBlocksGen67"
	case "PK8", "PB8":
		return "shuffleBlocksGen8"
	case "PA8":
		return "shuffleBlocksGen8A"
	}
	return ""
}

func hexify(number int) string {
	return fmt.Sprintf("0x%02x", number)
}

func commaSeparate[T interface{}](values []T) string {
	if len(values) == 0 {
		return "[]"
	}
	output := fmt.Sprintf("[%v", values[0])
	for _, val := range values[1:] {
		output = fmt.Sprintf("%s,%v", output, val)
	}
	return fmt.Sprintf("%s]", output)
}

func assignFieldToVarFromBytes(field RustField, sch schema.SchemaData) string {
	output := ""

	if field.Field.NoWrite {
		output = fmt.Sprintf("let %s = %s;", field.Name, defaultValueByField(field))
	} else if field.Type == "tuple" {
		output = fmt.Sprintf("let %s = %s;", field.Name, tupleFromBufferFunction(field, sch.Endian))
		// } else if field.Conversion != nil {
		// 	output = fmt.Sprintf("this.%s = %s", field.Name, tsReadFromBufferWithConversionFunction(field, sch.Endian, sch.StringEncoding))
	} else {
		output = fmt.Sprintf("let %s = %s;", field.Name, assignScalarFieldToVarFromBytes(field, sch.Endian, sch.StringEncoding))
	}

	// if field.Field.LengthCheck != 0 {
	// 	return fmt.Sprintf(`if bytes.len() > 0 {
	// 		%s
	// } else {
	// 		this.%s = %s
	// }`,
	// 		field.Field.LengthCheck, output, field.Name, defaultValueByField(field))
	// }
	return output
}

func assignScalarFieldToVarFromBytes(field RustField, endianness string, encoding string) string {
	fnName := "assignScalarFieldToVarFromBytes"
	isLittleEndian := endianness == "Little"
	switch field.Type {
	case "string":
		panicIfNilNumBytes(field, fnName)
		return stringFromBufferFunction(*field.NumBytes, *field.ByteOffset, encoding, field.Name)
	case "number", "number | undefined":
		if field.Field.NumBits != nil {
			panicIfNilBitOffset(field, fnName)
			return fmt.Sprintf("byteLogic.uIntFromBufferBits(dataView, 0x%x, %d, %d, %t)", *field.ByteOffset, *field.BitOffset, *field.NumBits, isLittleEndian)
		}
		panicIfNilNumBytes(field, fnName)
		return intResultFromBytesFunction(*field.NumBytes, *field.ByteOffset, endianness, field.Name)
	case "boolean":
		panicIfNilBitOffset(field, fnName)
		return fmt.Sprintf(`util::get_flag(&bytes, %d, %d).map_err(|e| format!("read field '%s': {}", e))?`, *field.ByteOffset, *field.BitOffset, field.Name)
	case "Uint8Array":
		panicIfNilNumBytes(field, fnName)
		return fmt.Sprintf(`to_sized_array(&bytes[%d..%d])`, *field.ByteOffset, *field.ByteOffset+*field.NumBytes)
	case "pokedate", "pokedate | undefined":
		return fmt.Sprintf("types.pkmDateFromBytes(dataView, 0x%x)", *field.ByteOffset)
	case "ivs30Bits":
		return fmt.Sprintf("Stats::from_30_bits(to_sized_array(&bytes[%d..%d]))", *field.ByteOffset, *field.ByteOffset+4)
	case "stats":
		return fmt.Sprintf("Stats::from_bytes(to_sized_array(&bytes[%d..%d]))", *field.ByteOffset, *field.ByteOffset+6)
	case "statsPreSplit":
		return fmt.Sprintf("StatsPreSplit::from_bytes_be(to_sized_array(&bytes[%d..%d]))", *field.ByteOffset, *field.ByteOffset+10)
	case "dvs":
		return fmt.Sprintf("StatsPreSplit::from_dv_bytes(to_sized_array(&bytes[%d..%d]))", *field.ByteOffset, *field.ByteOffset+2)
	case "contestStats":
		return fmt.Sprintf("types.readContestStatsFromBytes(dataView, 0x%x)", *field.ByteOffset)
	case "memory_3ds_trainer":
		return fmt.Sprintf("types.read3DSTrainerMemoryFromBytes(dataView, 0x%x)", *field.ByteOffset)
	case "memory_3ds_handler":
		return fmt.Sprintf("types.read3DSHandlerMemoryFromBytes(dataView, 0x%x)", *field.ByteOffset)
	case "memory_switch_trainer":
		return fmt.Sprintf("types.readSwitchTrainerMemoryFromBytes(dataView, 0x%x)", *field.ByteOffset)
	case "memory_switch_handler":
		return fmt.Sprintf("types.readSwitchHandlerMemoryFromBytes(dataView, 0x%x)", *field.ByteOffset)
	case "memory":
		return fmt.Sprintf("types.readMemoryFromBytes(dataView, 0x%x)", *field.ByteOffset)
	case "hyperTrainStats":
		return fmt.Sprintf("Stats::from_hyper_train_bytes(to_sized_array(&bytes[%d..%d]))", *field.ByteOffset, *field.ByteOffset+6)
	case "MarkingsFourShapes":
		return fmt.Sprintf("types.markingsFourShapesFromBytes(dataView, 0x%x)", *field.ByteOffset)
	case "MarkingsSixShapesNoColor":
		return fmt.Sprintf("types.markingsSixShapesNoColorFromBytes(dataView, 0x%x)", *field.ByteOffset)
	case "MarkingsSixShapesWithColor":
		return fmt.Sprintf("types.markingsSixShapesWithColorFromBytes(dataView, 0x%x)", *field.ByteOffset)
	case "ribbons":
		// return ribbonsFromBuffer(field)
		return "None"
	default:
		return fmt.Sprintf("(TODO: assignScalarFieldToVarFromBytes: %s)", field.Type)
	}
}

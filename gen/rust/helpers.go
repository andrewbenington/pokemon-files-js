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
		// TODO: use pokemon nickname
		return `"NICKNAME".into()`
		// return "PokemonData[this.dexNum].formes[0].name"
	}
	if field.Name == "trainer_name" {
		return `"TRAINER".into()`
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
	case "Gender":
		return "Gender::default()"
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

func stringFromBytesFunction(numBytes int, byteOffset int, encoding string) string {
	switch encoding {
	case "UTF-16":
		return fmt.Sprintf(`strings::utf16::from_be_bytes(bytes[%d..%d].to_vec())`, byteOffset, byteOffset+numBytes)
	case "Gen5":
		return fmt.Sprintf(`Gen5String::from_bytes(to_sized_array::<[u8; %d], u8>(&bytes[%d..%d]))`, numBytes, byteOffset, byteOffset+numBytes)
	case "Gen4":
		return fmt.Sprintf(`Gen4String::from_bytes(to_sized_array::<[u8; %d], u8>(&bytes[%d..%d]))`, numBytes, byteOffset, byteOffset+numBytes)
	case "Gen3":
		return fmt.Sprintf(`Gen3String::from_bytes(to_sized_array::<[u8; %d], u8>(&bytes[%d..%d]))`, numBytes, byteOffset, byteOffset+numBytes)
	case "GameBoy":
		return fmt.Sprintf("GbString::from_bytes(to_sized_array::<[u8; %d], u8>(&bytes[%d..%d]))", numBytes, byteOffset, byteOffset+numBytes)
	default:
		return fmt.Sprintf("Array.from(buffer.slice(0x%x, %d)).map(b => String.fromCharCode(b)).join('')", byteOffset, byteOffset+numBytes)
	}
}

func stringToBytesFunction(field string, byteOffset int, byteCount int, encoding string) string {
	if encoding == "UTF-16" {
		return fmt.Sprintf("bytes[%d..%d].copy_from_slice(&strings::utf16::to_be_bytes(&self.%s))", byteOffset, byteOffset+(byteCount/2), field)
	} else {
		return fmt.Sprintf("bytes[%d..%d].copy_from_slice(self.%s.bytes().as_ref())", byteOffset, byteOffset+byteCount, field)
	}
}

func intResultFromBytesFunction(numBytes int, byteOffset int, endianness string) string {
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

func intToBytesFunction(numBytes int, byteOffset int, endianness string, variableName string) string {
	endianLetter := strings.ToLower(endianness[:1])
	switch numBytes {
	case 1:
		return fmt.Sprintf("bytes[%d] = self.%s", byteOffset, variableName)
	case 2:
		return fmt.Sprintf("bytes[%d..%d].copy_from_slice(&self.%s.to_%se_bytes())", byteOffset, byteOffset+2, variableName, endianLetter)
	case 3:
		return fmt.Sprintf("new Uint8Array(buffer).set(byteLogic.uint24ToBytes%sEndian(%s), 0x%x)", endianness, variableName, byteOffset)
	case 4:
		return fmt.Sprintf("bytes[%d..%d].copy_from_slice(&self.%s.to_%se_bytes())", byteOffset, byteOffset+4, variableName, endianLetter)
	}
	return ""
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
				calledFunction := fmt.Sprintf(`%s(bytes, %d, %d, %d).map_err(|e| format!("read field '%s[%d]': {e}"))?`, function, byteOffset, bitOffset, *field.NumBits, field.Name, i)
				elements = append(elements, calledFunction)
			} else {
				panicIfNilNumBytes(field, "tupleToBufferFunction")
				elements = append(elements, intResultFromBytesFunction(*field.NumBytes, byteOffset, endianness))
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
	case "PK8", "PB8", "PK9":
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

func fieldValueFromBytes(field RustField, sch schema.SchemaData) string {
	assignVal := ""
	if field.Field.NoWrite {
		assignVal = defaultValueByField(field)
	} else if field.Type == "tuple" {
		assignVal = tupleFromBufferFunction(field, sch.Endian)
		// } else if field.Conversion != nil {
		// 	output = fmt.Sprintf("this.%s = %s", field.Name, tsReadFromBufferWithConversionFunction(field, sch.Endian, sch.StringEncoding))
	} else {
		assignVal = assignScalarFieldToVarFromBytes(field, sch.Endian, sch.StringEncoding)
	}

	if field.Field.LengthCheck != 0 {
		return fmt.Sprintf("if bytes.len() > %d { %s } else { %s }", field.Field.LengthCheck, assignVal, defaultValueByField(field))
	} else {
		return assignVal
	}
}

func assignScalarFieldToVarFromBytes(field RustField, endianness string, encoding string) string {
	fnName := "assignScalarFieldToVarFromBytes"
	fmt.Printf("%s: %s\n", field.Name, field.Type)
	switch field.Type {
	case "string":
		panicIfNilNumBytes(field, fnName)
		return stringFromBytesFunction(*field.NumBytes, *field.ByteOffset, encoding)
	case "number", "number | undefined":
		var output string
		if field.Field.NumBits != nil {
			panicIfNilBitOffset(field, fnName)
			panicIfNilNumBytes(field, fnName)
			endianLetter := strings.ToLower(endianness[:1])
			numType := "u8"
			if *field.NumBytes == 2 {
				numType = "u16"
			} else if *field.NumBytes > 2 {
				numType = "u32"
			}

			function := fmt.Sprintf(`util::int_from_buffer_bits_%se::<%s>`, endianLetter, numType)
			output = fmt.Sprintf(`%s(bytes, %d, %d, %d).map_err(|e| format!("read field '%s': {e}"))?`, function, *field.ByteOffset, *field.BitOffset, *field.NumBits, field.Name)
		} else {

			panicIfNilNumBytes(field, fnName)
			output = intResultFromBytesFunction(*field.NumBytes, *field.ByteOffset, endianness)
		}
		if field.RustType == "Gender" {
			output += ".into()"
		}
		return output
	case "boolean":
		panicIfNilBitOffset(field, fnName)
		if field.RustType == "Gender" {
			return fmt.Sprintf(`util::get_flag(bytes, %d, %d).into()`, *field.ByteOffset, *field.BitOffset)
		}
		return fmt.Sprintf(`util::get_flag(bytes, %d, %d)`, *field.ByteOffset, *field.BitOffset)
	case "Uint8Array":
		panicIfNilNumBytes(field, fnName)
		return fmt.Sprintf(`to_sized_array(&bytes[%d..%d])`, *field.ByteOffset, *field.ByteOffset+*field.NumBytes)
	case "FlagSet":
		panicIfNilNumBytes(field, fnName)
		return fmt.Sprintf(`FlagSet::from_bytes(to_sized_array(&bytes[%d..%d]))`, *field.ByteOffset, *field.ByteOffset+*field.NumBytes)
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
		return fmt.Sprintf("ContestStats::from_bytes(to_sized_array(&bytes[%d..%d]))", *field.ByteOffset, *field.ByteOffset+6)
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
		return fmt.Sprintf("HyperTraining::from_byte(bytes[%d])", *field.ByteOffset)
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

func toBufferFunction(field RustField, endianness string, encoding string) string {
	// if field.Type == "ribbons" {
	// 	return ribbonsToBuffer(field)
	// }

	panicIfNilByteOffset(field, "toBufferFunction")
	switch field.Type {
	case "string":
		return stringToBytesFunction(field.Name, *field.ByteOffset, *field.NumBytes, encoding)
	case "number":
		// if field.Field.NumBits != nil {
		// 	return fmt.Sprintf("byteLogic.uIntToBufferBits(dataView, %s, %d, %d, %d, %t)", variableName, *field.ByteOffset, *field.BitOffset, *field.Field.NumBits, endianness == "Little")
		// }
		return intToBytesFunction(*field.NumBytes, *field.ByteOffset, endianness, field.Name)
	// case "number | undefined":
	// 	if field.Field.NumBits != nil {
	// 		return fmt.Sprintf("byteLogic.uIntToBufferBits(dataView, %s ?? 0, %d, %d, %d, %t)", variableName, *field.ByteOffset, *field.BitOffset, *field.Field.NumBits, endianness == "Little")
	// 	}
	// 	defaultVal := "0"
	// 	if field.Name == "affixed_ribbon" {
	// 		defaultVal = "0xff"
	// 	}
	// 	return intToBytesFunction(*field.NumBytes, *field.ByteOffset, endianness, fmt.Sprintf("%s === undefined ? %s : %s", variableName, defaultVal, field.Name))
	// case "float":
	// 	return fmt.Sprintf("dataView.setFloat32(0x%x, %s, true)", *field.ByteOffset, variableName)
	// case "boolean":
	// 	return fmt.Sprintf("byteLogic.setFlag(dataView, 0x%x, %d, %s)", *field.ByteOffset, *field.BitOffset, variableName)
	// case "Uint8Array":
	// 	panicIfNilNumBytes(field, "toBufferFunction")
	// 	return fmt.Sprintf("new Uint8Array(buffer).set(new Uint8Array(%s.slice(0, %d)), 0x%x)", variableName, *field.NumBytes, *field.ByteOffset)
	// case "pokedate", "pokedate | undefined":
	// 	return fmt.Sprintf("types.writePKMDateToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	// case "ivs30Bits":
	// 	return fmt.Sprintf("types.write30BitIVsToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	case "stats":
		if *field.NumBytes == 6 {
			return fmt.Sprintf("bytes[%d..%d].copy_from_slice(&self.%s.to_bytes())", *field.ByteOffset, *field.ByteOffset+6, field.Name)
			// } else if *field.NumBytes == 12 {
			// 	return fmt.Sprintf("types.writeStatsToBytesU16(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
		}
		// panic(fmt.Sprintf("stats field has invalid size: %d", *field.NumBytes))
	// case "statsPreSplit":
	// 	panicIfNilNumBytes(field, "toBufferFunction")
	// 	atkOffset := *field.ByteOffset + *field.NumBytes
	// 	defOffset := *field.ByteOffset + *field.NumBytes*2
	// 	speOffset := *field.ByteOffset + *field.NumBytes*3
	// 	spcOffset := *field.ByteOffset + *field.NumBytes*4
	// 	return fmt.Sprintf("%s\n%s\n%s\n%s\n%s\n",
	// 		intToBytesFunction(2, *field.ByteOffset, endianness, fmt.Sprintf("%s.hp", variableName)),
	// 		intToBytesFunction(2, atkOffset, endianness, fmt.Sprintf("%s.atk", variableName)),
	// 		intToBytesFunction(2, defOffset, endianness, fmt.Sprintf("%s.def", variableName)),
	// 		intToBytesFunction(2, speOffset, endianness, fmt.Sprintf("%s.spe", variableName)),
	// 		intToBytesFunction(2, spcOffset, endianness, fmt.Sprintf("%s.spc", variableName)))
	// case "dvs":
	// 	return fmt.Sprintf("types.writeDVsToBytes(%s, dataView, 0x%x)", variableName, *field.ByteOffset)
	case "contestStats":
		return fmt.Sprintf("bytes[%d..%d].copy_from_slice(&self.%s.to_bytes())", *field.ByteOffset, *field.ByteOffset+6, field.Name)
	case "hyperTrainStats":
		return fmt.Sprintf("bytes[%d] = self.%s.to_byte()", *field.ByteOffset, field.Name)
	// case "memory_3ds_trainer":
	// 	return fmt.Sprintf("types.write3DSTrainerMemoryToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	// case "memory_3ds_handler":
	// 	return fmt.Sprintf("types.write3DSHandlerMemoryToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	// case "memory_switch_trainer":
	// 	return fmt.Sprintf("types.writeSwitchTrainerMemoryToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	// case "memory_switch_handler":
	// 	return fmt.Sprintf("types.writeSwitchHandlerMemoryToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	// case "memory":
	// 	return fmt.Sprintf("types.writeMemoryToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	// case "MarkingsFourShapes":
	// 	return fmt.Sprintf("types.markingsFourShapesToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	// case "MarkingsSixShapesNoColor":
	// 	return fmt.Sprintf("types.markingsSixShapesNoColorToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	// case "MarkingsSixShapesWithColor":
	// 	return fmt.Sprintf("types.markingsSixShapesWithColorToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	default:
		return ""
		// return fmt.Sprintf("(TODO: toBufferFunction: %s)", field.Type)
	}
	return ""
}

func writeFieldToBytes(field RustField, sch schema.SchemaData, isParty bool) string {
	output := ""

	if field.Type == "tuple" {
		// output = tupleToBufferFunction(field, sch.Endian)
	} else if field.Conversion != nil {
		// output = tsWriteToBufferWithConversionFunction(field, sch.Endian, sch.StringEncoding)
	} else {
		output = toBufferFunction(field, sch.Endian, sch.StringEncoding)
	}

	if output != "" {
		if field.RustType == "Gender" {
			output += ".into()"
		}
		output += ";"
	}

	if isParty == (field.Field.LengthCheck != 0) {
		return output
	} else {
		return ""
	}
}

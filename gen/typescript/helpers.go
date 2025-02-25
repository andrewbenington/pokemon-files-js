package typescript

import (
	"fmt"
	"strings"

	"github.com/andrewbenington/go-pokemon-files/gen/schema"
	"github.com/samber/lo"
)

const (
	defaultStats = `{
		hp: 0,
		atk: 0,
		def: 0,
		spe: 0,
		spa: 0,
		spd: 0,
	}`
	defaultStatsPreSplit = `{
		hp: 0,
		atk: 0,
		def: 0,
		spe: 0,
		spc: 0,
	}`
	defaultContestStats = `{
		cool: 0,
		beauty: 0,
		cute: 0,
		smart: 0,
		tough: 0,
		sheen: 0,
	}`
	defaultPokeDate = `{
		month: new Date().getMonth(),
		day: new Date().getDate(),
		year: new Date().getFullYear(),
	}`
	defaultMemory = `{
		intensity: 0,
		memory: 0,
		feeling: 0,
		textVariables: 0,
	}`
	defaultGeolocation = `{
		region: 0,
		country: 0,
	}`
	defaultHyperTrain = `{
		hp: false,
		atk: false,
		def: false,
		spa: false,
		spd: false,
		spe: false,
	}`
)

var (
	moveFields = []string{"moves", "movePP", "movePPUps", "relearnMoves"}
)

func fieldToBufferFunction(field TypeScriptField, endianness string, encoding string) string {
	return toBufferFunction(field, endianness, encoding, fmt.Sprintf("this.%s", field.Name))
}

func panicIfNilNumBytes(field TypeScriptField, caller string) {
	if field.NumBytes == nil {
		panic(fmt.Sprintf("%s: NumBytes is nil for %s", caller, field.ToString()))
	}
}

func panicIfNilByteOffset(field TypeScriptField, caller string) {
	if field.ByteOffset == nil {
		panic(fmt.Sprintf("%s: ByteOffset is nil for %s", caller, field.ToString()))
	}
}

func panicIfNilBitOffset(field TypeScriptField, caller string) {
	if field.BitOffset == nil {
		panic(fmt.Sprintf("%s: BitOffset is nil for %s", caller, field.ToString()))
	}
}

func toBufferFunction(field TypeScriptField, endianness string, encoding string, variableName string) string {
	if field.Type == "ribbons" {
		return ribbonsToBuffer(field)
	}

	panicIfNilByteOffset(field, "toBufferFunction")
	switch field.Type {
	case "string":
		return stringToBufferFunction(field.Name, *field.ByteOffset, *field.NumBytes, encoding, field.TerminateString)
	case "number":
		if field.Field.NumBits != nil {
			return fmt.Sprintf("byteLogic.uIntToBufferBits(dataView, %s, %d, %d, %d, %t)", variableName, *field.ByteOffset, *field.BitOffset, *field.Field.NumBits, endianness == "Little")
		}
		return intToBufferFunction(*field.NumBytes, *field.ByteOffset, endianness, variableName)
	case "number | undefined":
		if field.Field.NumBits != nil {
			return fmt.Sprintf("byteLogic.uIntToBufferBits(dataView, %s ?? 0, %d, %d, %d, %t)", variableName, *field.ByteOffset, *field.BitOffset, *field.Field.NumBits, endianness == "Little")
		}
		defaultVal := "0"
		if field.Name == "affixedRibbon" {
			defaultVal = "0xff"
		}
		return intToBufferFunction(*field.NumBytes, *field.ByteOffset, endianness, fmt.Sprintf("%s === undefined ? %s : %s", variableName, defaultVal, variableName))
	case "float":
		return fmt.Sprintf("dataView.setFloat32(0x%x, %s, true)", *field.ByteOffset, variableName)
	case "boolean":
		return fmt.Sprintf("byteLogic.setFlag(dataView, 0x%x, %d, %s)", *field.ByteOffset, *field.BitOffset, variableName)
	case "Uint8Array", "FlagSet":
		panicIfNilNumBytes(field, "toBufferFunction")
		return fmt.Sprintf("new Uint8Array(buffer).set(new Uint8Array(%s.slice(0, %d)), 0x%x)", variableName, *field.NumBytes, *field.ByteOffset)
	case "pokedate", "pokedate | undefined":
		return fmt.Sprintf("types.writePKMDateToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	case "ivs30Bits":
		return fmt.Sprintf("types.write30BitIVsToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	case "stats":
		if *field.NumBytes == 6 {
			return fmt.Sprintf("types.writeStatsToBytesU8(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
		} else if *field.NumBytes == 12 {
			return fmt.Sprintf("types.writeStatsToBytesU16(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
		}
		panic(fmt.Sprintf("stats field has invalid size: %d", *field.NumBytes))
	case "statsPreSplit":
		panicIfNilNumBytes(field, "toBufferFunction")
		atkOffset := *field.ByteOffset + *field.NumBytes
		defOffset := *field.ByteOffset + *field.NumBytes*2
		speOffset := *field.ByteOffset + *field.NumBytes*3
		spcOffset := *field.ByteOffset + *field.NumBytes*4
		return fmt.Sprintf("%s\n%s\n%s\n%s\n%s\n",
			intToBufferFunction(2, *field.ByteOffset, endianness, fmt.Sprintf("%s.hp", variableName)),
			intToBufferFunction(2, atkOffset, endianness, fmt.Sprintf("%s.atk", variableName)),
			intToBufferFunction(2, defOffset, endianness, fmt.Sprintf("%s.def", variableName)),
			intToBufferFunction(2, speOffset, endianness, fmt.Sprintf("%s.spe", variableName)),
			intToBufferFunction(2, spcOffset, endianness, fmt.Sprintf("%s.spc", variableName)))
	case "dvs":
		return fmt.Sprintf("types.writeDVsToBytes(%s, dataView, 0x%x)", variableName, *field.ByteOffset)
	case "contestStats":
		return fmt.Sprintf("types.writeContestStatsToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	case "hyperTrainStats":
		return fmt.Sprintf("types.writeHyperTrainStatsToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	case "memory_3ds_trainer":
		return fmt.Sprintf("types.write3DSTrainerMemoryToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	case "memory_3ds_handler":
		return fmt.Sprintf("types.write3DSHandlerMemoryToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	case "memory_switch_trainer":
		return fmt.Sprintf("types.writeSwitchTrainerMemoryToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	case "memory_switch_handler":
		return fmt.Sprintf("types.writeSwitchHandlerMemoryToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	case "memory":
		return fmt.Sprintf("types.writeMemoryToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	case "MarkingsFourShapes":
		return fmt.Sprintf("types.markingsFourShapesToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	case "MarkingsSixShapesNoColor":
		return fmt.Sprintf("types.markingsSixShapesNoColorToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	case "MarkingsSixShapesWithColor":
		return fmt.Sprintf("types.markingsSixShapesWithColorToBytes(dataView, 0x%x, %s)", *field.ByteOffset, variableName)
	default:
		return fmt.Sprintf("(TODO: toBufferFunction: %s)", field.Type)
	}
}

func fieldFromBufferFunction(field TypeScriptField, endianness string, encoding string) string {
	isLittleEndian := endianness == "Little"
	switch field.Type {
	case "string":
		return stringFromBufferFunction(*field.NumBytes, *field.ByteOffset, encoding)
	case "float":
		return fmt.Sprintf("dataView.getFloat32(0x%x, true)", *field.ByteOffset)
	case "number":
		if field.Field.NumBits != nil {
			panicIfNilBitOffset(field, "fieldFromBufferFunction")
			return fmt.Sprintf("byteLogic.uIntFromBufferBits(dataView, 0x%x, %d, %d, %t)", *field.ByteOffset, *field.BitOffset, *field.NumBits, isLittleEndian)
		}
		return intFromBufferFunction(*field.NumBytes, *field.ByteOffset, endianness)
	case "number | undefined":
		if field.Field.NumBits != nil {
			return fmt.Sprintf("byteLogic.uIntFromBufferBits(dataView, 0x%x, %d, %d, %t) ?? 0", *field.ByteOffset, *field.Field.BitOffset, *field.Field.NumBits, isLittleEndian)
		}
		undefinedVal := "0"
		if field.Name == "affixedRibbon" {
			undefinedVal = "0xff"
		}
		fromBuf := intFromBufferFunction(*field.NumBytes, *field.ByteOffset, endianness)
		return fmt.Sprintf("%s === %s ? undefined : %s", fromBuf, undefinedVal, fromBuf)
	case "boolean":
		panicIfNilBitOffset(field, "fieldFromBufferFunction")
		return fmt.Sprintf("byteLogic.getFlag(dataView, 0x%x, %d)", *field.ByteOffset, *field.BitOffset)
	case "Uint8Array", "FlagSet":
		panicIfNilNumBytes(field, "fieldFromBufferFunction")
		return fmt.Sprintf("new Uint8Array(buffer).slice(0x%x, 0x%x)", *field.ByteOffset, *field.ByteOffset+*field.NumBytes)
	case "pokedate", "pokedate | undefined":
		return fmt.Sprintf("types.pkmDateFromBytes(dataView, 0x%x)", *field.ByteOffset)
	case "ivs30Bits":
		return fmt.Sprintf("types.read30BitIVsFromBytes(dataView, 0x%x)", *field.ByteOffset)
	case "stats":
		if *field.NumBytes == 6 {
			return fmt.Sprintf("types.readStatsFromBytesU8(dataView, 0x%x)", *field.ByteOffset)
		} else if *field.NumBytes == 12 {
			return fmt.Sprintf("types.readStatsFromBytesU16(dataView, 0x%x)", *field.ByteOffset)
		}
		panic(fmt.Sprintf("stats field has invalid size: %d", *field.NumBytes))
	case "statsPreSplit":
		panicIfNilNumBytes(field, "fieldFromBufferFunction")
		hpFunc := intFromBufferFunction(*field.NumBytes, *field.ByteOffset, endianness)
		atkFunc := intFromBufferFunction(*field.NumBytes, *field.ByteOffset+*field.NumBytes, endianness)
		defFunc := intFromBufferFunction(*field.NumBytes, *field.ByteOffset+(*field.NumBytes*2), endianness)
		speOffset := *field.ByteOffset + *field.NumBytes*3
		spcOffset := *field.ByteOffset + *field.NumBytes*4
		return fmt.Sprintf(`{
			hp: %s,
			atk: %s,
			def: %s,
			spe: dataView.getUint16(0x%x, %t),
			spc: dataView.getUint16(0x%x, %t),
		}`, hpFunc, atkFunc, defFunc, speOffset, isLittleEndian, spcOffset, isLittleEndian)
	case "dvs":
		return fmt.Sprintf("types.readDVsFromBytes(dataView, 0x%x)", *field.ByteOffset)
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
		return fmt.Sprintf("types.readHyperTrainStatsFromBytes(dataView, 0x%x)", *field.ByteOffset)
	case "MarkingsFourShapes":
		return fmt.Sprintf("types.markingsFourShapesFromBytes(dataView, 0x%x)", *field.ByteOffset)
	case "MarkingsSixShapesNoColor":
		return fmt.Sprintf("types.markingsSixShapesNoColorFromBytes(dataView, 0x%x)", *field.ByteOffset)
	case "MarkingsSixShapesWithColor":
		return fmt.Sprintf("types.markingsSixShapesWithColorFromBytes(dataView, 0x%x)", *field.ByteOffset)
	case "ribbons":
		return ribbonsFromBuffer(field)
	default:
		return fmt.Sprintf("(TODO: fromBufferFunction: %s)", field.Type)
	}
}

func defaultValueByField(field TypeScriptField) string {
	if field.Name == "nickname" {
		return "PokemonData[this.dexNum].formes[0].name"
	}
	if field.Name == "trainerName" {
		return `"TRAINER"`
	}
	switch field.Type {
	case "Uint8Array", "FlagSet":
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

func setFieldFromOtherNonNull(field TypeScriptField, sch schema.SchemaData) string {
	if field.Name == "trainerID" && sch.TrainerIDTracker {
		return `if (!isGameBoy(other.gameOfOrigin) && other.personalityValue !== undefined) {
        this.trainerID = other.personalityValue % 0x10000
      } else {
        this.trainerID = other.trainerID
      }`
	}

	if field.Name == "ball" {
		defaultBall := "Poke"
		if sch.DefaultBall != "" {
			defaultBall = sch.DefaultBall
		}
		if len(sch.AllowedBalls) > 0 {
			return fmt.Sprintf(`if (other.ball && %s.allowedBalls().includes(other.ball)) {
				this.ball = other.ball
				} else {
				this.ball = Ball.%s
				}`, sch.FileName, defaultBall)
		} else if sch.MaxBall > 0 {
			return fmt.Sprintf(`if (other.ball && (%s.maxValidBall() >= other.ball)) {
				this.ball = other.ball
				} else {
				this.ball = Ball.%s
				}`, sch.FileName, defaultBall)
		} else {
			return string(defaultBall)
		}
	} else if field.Name == "ribbons" {
		ribbonSets := lo.Uniq(lo.Map(field.RibbonSpans, func(span schema.RibbonSpan, _ int) string {
			return ribbonListFromName(span.RibbonSet)
		}))
		if len(ribbonSets) > 1 {
			return fmt.Sprintf("this.ribbons = filterRibbons(other.ribbons ?? [], [%s])", strings.Join(ribbonSets, ", "))
		}
		return fmt.Sprintf("this.ribbons = filterRibbons(other.ribbons ?? [], [%s], '%s')", ribbonSets[0], sch.MaxRibbon)
	} else if field.Name == "heldItemIndex" {
		if sch.IsGen3 {
			return "this.heldItemIndex = ItemGen3FromString(other.heldItemName)"
		} else {
			return "this.heldItemIndex = ItemFromString(other.heldItemName)"
		}
	}

	switch field.Type {
	case "MarkingsFourShapes":
		return fmt.Sprintf("this.%s = types.markingsFourShapesFromOther(other.%s)", field.Name, field.Name)
	case "MarkingsSixShapesNoColor":
		return fmt.Sprintf("this.%s = types.markingsSixShapesNoColorFromOther(other.%s)", field.Name, field.Name)
	case "MarkingsSixShapesWithColor":
		return fmt.Sprintf("this.%s = types.markingsSixShapesWithColorFromOther(other.%s)", field.Name, field.Name)
	default:
		return fmt.Sprintf("this.%s = other.%s", field.Name, field.Name)
	}
}

func setMovesFieldFromOther(field TypeScriptField, sch schema.SchemaData, nullable bool) string {
	otherField := fmt.Sprintf("other.%s", field.Name)

	if field.Name == "movePP" {
		otherField = "adjustMovePPBetweenFormats(this, other)"
	}
	if nullable {
		otherField += "?"
	}

	output := fmt.Sprintf("this.%s = %s.filter((_, i) => other.moves[i] <= %s.maxValidMove())",
		field.Name, otherField, sch.FileName,
	)

	if nullable {
		output += " ?? [0, 0, 0, 0]"
	}
	return output
}

func isMoveField(fieldName string) bool {
	return lo.IndexOf(moveFields, fieldName) != -1
}

func setFieldFromOther(field TypeScriptField, sch schema.SchemaData, nullable bool) string {
	if isMoveField(field.Name) {
		return setMovesFieldFromOther(field, sch, nullable)
	}
	if !nullable || field.Name == "ball" {
		return setFieldFromOtherNonNull(field, sch)
	}
	return fmt.Sprintf("%s ?? %s", setFieldFromOtherNonNull(field, sch), defaultValueByField(field))
}

func defaultValueByType(t string) string {
	switch t {
	case "string":
		return `''`
	case "number", "marking", "float":
		return "0"
	case "number | undefined":
		return "undefined"
	case "boolean":
		return "false"
	case "pokedate", "pokedate | undefined":
		return defaultPokeDate
	case "stats", "ivs30Bits":
		return defaultStats
	case "statsPreSplit", "dvs":
		return defaultStatsPreSplit
	case "contestStats":
		return defaultContestStats
	case "memory", "memory_3ds_handler", "memory_3ds_trainer", "memory_switch_handler", "memory_switch_trainer":
		return defaultMemory
	case "geolocation":
		return defaultGeolocation
	case "hyperTrainStats":
		return defaultHyperTrain
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

func tupleToBufferFunction(field TypeScriptField, endianness string) string {
	funcString := fmt.Sprintf("for (let i = 0; i < %d; i++) {\n", field.TupleLength)
	isLittleEndian := endianness == "Little"
	panicIfNilByteOffset(field, "tupleToBufferFunction")
	switch field.TupleType {
	case "number":
		if field.Field.NumBits != nil {
			panicIfNilBitOffset(field, "tupleToBufferFunction")
			if field.Field.SeperateBytes {
				funcString += fmt.Sprintf("byteLogic.uIntToBufferBits(dataView, this.%s[i], 0x%x + i, %d, %d, %t)", field.Name, *field.ByteOffset, *field.BitOffset, *field.NumBits, endianness == "Little")
			} else {
				funcString += fmt.Sprintf("byteLogic.uIntToBufferBits(dataView, this.%s[i], 0x%x, %d + i * %d, %d, %t)", field.Name, *field.ByteOffset, *field.BitOffset, *field.NumBits, *field.NumBits, endianness == "Little")
			}
		} else {
			panicIfNilNumBytes(field, "tupleToBufferFunction")
			if *field.NumBytes == 1 {
				funcString += fmt.Sprintf("dataView.setUint8(0x%x + i, this.%s[i])\n", *field.ByteOffset, field.Name)
			} else {
				funcString += fmt.Sprintf("dataView.setUint16(0x%x + i * 2, this.%s[i], %t)\n", *field.ByteOffset, field.Name, isLittleEndian)
			}
		}
	case "marking":
		funcString += fmt.Sprintf("dataView.setUint8(0x%x + i, this.%s[i])\n", *field.ByteOffset, field.Name)
	case "geolocation":
		funcString += fmt.Sprintf("types.writeGeolocationToBytes(dataView, 0x%x + 2 * i, this.%s[i])\n", *field.ByteOffset, field.Name)
	}

	return funcString + "\n}"
}

func intToBufferFunction(numBytes int, byteOffset int, endianness string, variableName string) string {
	isLittleEndian := endianness == "Little"
	switch numBytes {
	case 1:
		return fmt.Sprintf("dataView.setUint8(0x%x, %s)", byteOffset, variableName)
	case 2:
		return fmt.Sprintf("dataView.setUint16(0x%x, %s, %t)", byteOffset, variableName, isLittleEndian)
	case 3:
		return fmt.Sprintf("new Uint8Array(buffer).set(byteLogic.uint24ToBytes%sEndian(%s), 0x%x)", endianness, variableName, byteOffset)
	case 4:
		return fmt.Sprintf("dataView.setUint32(0x%x, %s, %t)", byteOffset, variableName, isLittleEndian)
	}
	return ""
}

func stringToBufferFunction(field string, byteOffset int, byteCount int, encoding string, terminate bool) string {
	if encoding == "UTF-16" {
		return fmt.Sprintf("stringLogic.writeUTF16StringToBytes(dataView, this.%s, 0x%x, %d)", field, byteOffset, byteCount/2)
	}
	if encoding == "Gen5" {
		return fmt.Sprintf("stringLogic.writeGen5StringToBytes(dataView, this.%s, 0x%x, %d)", field, byteOffset, byteCount/2)
	}
	if encoding == "Gen4" {
		return fmt.Sprintf("stringLogic.writeGen4StringToBytes(dataView, this.%s, 0x%x, %d)", field, byteOffset, byteCount)
	}
	if encoding == "Gen3" {
		return fmt.Sprintf("stringLogic.writeGen3StringToBytes(dataView, this.%s, 0x%x, %d, %t)", field, byteOffset, byteCount, terminate)
	}
	if encoding == "GameBoy" {
		return fmt.Sprintf("stringLogic.writeGameBoyStringToBytes(dataView, this.%s, 0x%x, %d, %t)", field, byteOffset, byteCount, terminate)
	}
	return fmt.Sprintf("new Uint8Array(buffer).set(new TextEncoder().encode(this.%s), 0x%x)", field, byteOffset)
}

func stringFromBufferFunction(numBytes int, byteOffset int, encoding string) string {
	if encoding == "UTF-16" {
		return fmt.Sprintf("stringLogic.utf16BytesToString(buffer, 0x%x, %d)", byteOffset, numBytes/2)
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

func intFromBufferFunction(numBytes int, byteOffset int, endianness string) string {
	isLittleEndian := endianness == "Little"
	switch numBytes {
	case 1:
		return fmt.Sprintf("dataView.getUint8(0x%x)", byteOffset)
	case 2:
		return fmt.Sprintf("dataView.getUint16(0x%x, %t)", byteOffset, isLittleEndian)
	case 3:
		if !isLittleEndian {
			return fmt.Sprintf("(dataView.getUint32(0x%x, false) >> 8) & 0xffffff", byteOffset)
		}
		return fmt.Sprintf("dataView.getUint32(0x%x, true) & 0xffffff", byteOffset)
	case 4:
		return fmt.Sprintf("dataView.getUint32(0x%x, %t)", byteOffset, isLittleEndian)
	}
	return ""
}

func tupleFromBufferFunction(field TypeScriptField, endianness string) string {
	funcString := "[\n"
	panicIfNilByteOffset(field, "tupleToBufferFunction")

	for i := 0; i < field.TupleLength; i++ {
		switch field.TupleType {
		case "number":
			byteOffset := *field.ByteOffset + i*(*field.NumBytes)
			if field.NumBits != nil {
				panicIfNilBitOffset(field, "tupleToBufferFunction")
				if field.SeperateBytes {
					funcString += fmt.Sprintf("byteLogic.uIntFromBufferBits(dataView, 0x%x, %d, %d, %t),", *field.ByteOffset+i, *field.BitOffset, *field.NumBits, endianness == "Little")
				} else {
					bitOffset := *field.BitOffset + i*(*field.NumBits)
					funcString += fmt.Sprintf("byteLogic.uIntFromBufferBits(dataView, 0x%x, %d, %d, %t),", *field.ByteOffset, bitOffset, *field.NumBits, endianness == "Little")
				}
			} else {
				panicIfNilNumBytes(field, "tupleToBufferFunction")
				funcString += intFromBufferFunction(*field.NumBytes, byteOffset, endianness) + ",\n"
			}
		case "marking":
			funcString += fmt.Sprintf("buffer[0x%x],\n", *field.ByteOffset+i)
		case "geolocation":
			funcString += fmt.Sprintf("types.readGeolocationFromBytes(dataView, 0x%x),\n", *field.ByteOffset+2*i)
		}
	}

	return funcString + "\n]"
}

func tsReadFromBufferWithConversionFunction(field TypeScriptField, endianness string, encoding string) string {
	readFunction := fieldFromBufferFunction(field, endianness, encoding)
	if field.Conversion.Type == "map" {
		return fmt.Sprintf("conversion.from%s(%s)", field.Conversion.Name, readFunction)
	}
	return readFunction
}

func tsWriteToBufferWithConversionFunction(field TypeScriptField, endianness string, encoding string) string {
	convFunction := fmt.Sprintf("conversion.to%s(%s)", field.Conversion.Name, fmt.Sprintf("this.%s", field.Name))
	if field.Conversion.Type == "map" {
		return toBufferFunction(field, endianness, encoding, convFunction)
	}
	return convFunction
}

func fieldExists(fields []TypeScriptField, name string) bool {
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

func ribbonsFromBuffer(field TypeScriptField) string {
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

func ribbonsToBuffer(field TypeScriptField) string {
	toBufferString := ""
	for _, span := range field.Field.RibbonSpans {
		var spanString string
		if span.ContestCounts {
			if span.NumBits == 40 {
				spanString = fmt.Sprintf("gen3ContestRibbonsToBytes(dataView, 0x%x, this.ribbons)", span.ByteOffset)
			} else {
				spanString = fmt.Sprintf("gen3ContestRibbonsToBuffer(dataView, 0x%x, %d, this.ribbons)", span.ByteOffset, span.BitOffset)
			}
		} else if span.NumBytes != 0 {
			// GCN games store each ribbon in its own byte, denoted by NumBytes != nil
			spanString = fmt.Sprintf(`byteLogic.setByteIndexes(dataView, 0x%x, this.ribbons.map(ribbon => %s.indexOf(ribbon) - %d).filter(index => index > -1 && index < %d))`, span.ByteOffset, ribbonListFromName(span.RibbonSet), span.RibbonOffset, span.NumBytes)
		} else if span.RibbonOffset > 0 {
			spanString = fmt.Sprintf(`byteLogic.setFlagIndexes(dataView, 0x%x, %d, this.ribbons.map(ribbon => %s.indexOf(ribbon) - %d).filter(index => index > -1 && index < %d))`, span.ByteOffset, span.BitOffset, ribbonListFromName(span.RibbonSet), span.RibbonOffset, span.NumBits)
		} else {
			spanString = fmt.Sprintf(`byteLogic.setFlagIndexes(dataView, 0x%x, %d, this.ribbons.map(ribbon => %s.indexOf(ribbon)).filter(index => index > -1 && index < %d))`, span.ByteOffset, span.BitOffset, ribbonListFromName(span.RibbonSet), span.NumBits)
		}
		if toBufferString == "" {
			toBufferString = spanString
		} else {
			toBufferString = fmt.Sprintf("%s\n%s", toBufferString, spanString)
		}
	}
	return toBufferString
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

func writeFieldToBytes(field TypeScriptField, sch schema.SchemaData) string {
	output := ""

	if field.Type == "tuple" {
		output = tupleToBufferFunction(field, sch.Endian)
	} else if field.Conversion != nil {
		output = tsWriteToBufferWithConversionFunction(field, sch.Endian, sch.StringEncoding)
	} else {
		output = fieldToBufferFunction(field, sch.Endian, sch.StringEncoding)
	}

	if field.Field.LengthCheck != 0 {
		return fmt.Sprintf(`if (options?.includeExtraFields) {
			%s
	}`,
			output)
	}
	return output
}

func setThisFieldFromBytes(field TypeScriptField, sch schema.SchemaData) string {
	output := ""

	if field.Field.NoWrite {
		output = fmt.Sprintf("this.%s = %s", field.Name, defaultValueByField(field))
	} else if field.Type == "tuple" {
		output = fmt.Sprintf("this.%s = %s", field.Name, tupleFromBufferFunction(field, sch.Endian))
	} else if field.Conversion != nil {
		output = fmt.Sprintf("this.%s = %s", field.Name, tsReadFromBufferWithConversionFunction(field, sch.Endian, sch.StringEncoding))
	} else {
		output = fmt.Sprintf("this.%s = %s", field.Name, fieldFromBufferFunction(field, sch.Endian, sch.StringEncoding))
	}

	if field.Field.LengthCheck != 0 {
		return fmt.Sprintf(`if (dataView.byteLength >= %d) {
			%s
	} else {
			this.%s = %s
	}`,
			field.Field.LengthCheck, output, field.Name, defaultValueByField(field))
	}
	return output
}

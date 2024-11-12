// This file was generated by make generate
import {
  AbilityToString,
  Ball,
  ItemFromString,
  ItemToString,
  Languages,
  ModernRibbons,
  NatureToString,
} from 'pokemon-resources'
import * as byteLogic from '../util/byteLogic'
import { AllPKMFields } from '../util/pkmInterface'
import { filterRibbons } from '../util/ribbonLogic'
import { getLevelGen3Onward, getStats } from '../util/statCalc'
import * as stringLogic from '../util/stringConversion'
import * as types from '../util/types'
import { adjustMovePPBetweenFormats } from '../util/util'

export class PB8 {
  format: 'PB8' = 'PB8'
  encryptionConstant: number
  sanity: number
  checksum: number
  dexNum: number
  heldItemIndex: number
  trainerID: number
  secretID: number
  exp: number
  abilityIndex: number
  abilityNum: number
  favorite: boolean
  canGigantamax: boolean
  markings: types.MarkingsSixShapesWithColor
  personalityValue: number
  nature: number
  statNature: number
  isFatefulEncounter: boolean
  gender: number
  formeNum: number
  evs: types.Stats
  contest: types.ContestStats
  pokerusByte: number
  ribbonBytes: Uint8Array
  contestMemoryCount: number
  battleMemoryCount: number
  sociability: number
  height: number
  weight: number
  nickname: string
  moves: number[]
  movePP: number[]
  movePPUps: number[]
  relearnMoves: number[]
  currentHP: number
  ivs: types.Stats
  isEgg: boolean
  isNicknamed: boolean
  dynamaxLevel: number
  statusCondition: number
  palma: number
  handlerName: string
  handlerGender: boolean
  handlerLanguage: number
  handlerID: number
  handlerFriendship: number
  fullness: number
  enjoyment: number
  gameOfOrigin: number
  gameOfOriginBattle: number
  region: number
  consoleRegion: number
  languageIndex: number
  formArgument: number
  affixedRibbon: number
  trainerName: string
  trainerFriendship: number
  eggDate: types.PKMDate | undefined
  metDate: types.PKMDate | undefined
  eggLocationIndex: number
  metLocationIndex: number
  ball: number
  metLevel: number
  tmFlagsBDSP: Uint8Array
  homeTracker: Uint8Array
  ribbons: string[]
  isCurrentHandler: boolean
  handlerMemory: types.Memory
  trainerMemory: types.Memory
  hyperTraining: types.HyperTrainStats
  trainerGender: boolean

  constructor(arg: ArrayBuffer | AllPKMFields, encrypted?: boolean) {
    if (arg instanceof ArrayBuffer) {
      const buffer = arg
      const dataView = new DataView(buffer)
      this.encryptionConstant = dataView.getUint32(0x0, true)
      this.sanity = dataView.getUint16(0x4, true)
      this.checksum = dataView.getUint16(0x6, true)
      this.dexNum = dataView.getUint16(0x8, true)
      this.heldItemIndex = dataView.getUint16(0xa, true)
      this.trainerID = dataView.getUint16(0xc, true)
      this.secretID = dataView.getUint16(0xe, true)
      this.exp = dataView.getUint32(0x10, true)
      this.abilityIndex = dataView.getUint16(0x14, true)
      this.abilityNum = dataView.getUint8(0x16)
      this.favorite = byteLogic.getFlag(dataView, 0x16, 3)
      this.canGigantamax = byteLogic.getFlag(dataView, 0x16, 4)
      this.markings = types.markingsSixShapesWithColorFromBytes(dataView, 0x18)
      this.personalityValue = dataView.getUint32(0x1c, true)
      this.nature = dataView.getUint8(0x20)
      this.statNature = dataView.getUint8(0x21)
      this.isFatefulEncounter = byteLogic.getFlag(dataView, 0x22, 0)
      this.gender = dataView.getUint8(0x22)
      this.formeNum = dataView.getUint16(0x24, true)
      this.evs = types.readStatsFromBytes(dataView, 0x26)
      this.contest = types.readContestStatsFromBytes(dataView, 0x2c)
      this.pokerusByte = dataView.getUint8(0x32)
      this.ribbonBytes = new Uint8Array(buffer).slice(0x34, 0x3c)
      this.contestMemoryCount = dataView.getUint8(0x3c)
      this.battleMemoryCount = dataView.getUint8(0x3d)
      this.sociability = dataView.getUint32(0x48, true)
      this.height = dataView.getUint8(0x50)
      this.weight = dataView.getUint8(0x51)
      this.nickname = stringLogic.utf16BytesToString(buffer, 0x58, 12)
      this.moves = [
        dataView.getUint16(0x72, true),
        dataView.getUint16(0x74, true),
        dataView.getUint16(0x76, true),
        dataView.getUint16(0x78, true),
      ]
      this.movePP = [
        dataView.getUint8(0x7a),
        dataView.getUint8(0x7b),
        dataView.getUint8(0x7c),
        dataView.getUint8(0x7d),
      ]
      this.movePPUps = [
        dataView.getUint8(0x7e),
        dataView.getUint8(0x7f),
        dataView.getUint8(0x80),
        dataView.getUint8(0x81),
      ]
      this.relearnMoves = [
        dataView.getUint16(0x82, true),
        dataView.getUint16(0x84, true),
        dataView.getUint16(0x86, true),
        dataView.getUint16(0x88, true),
      ]
      this.currentHP = dataView.getUint16(0x8a, true)
      this.ivs = types.read30BitIVsFromBytes(dataView, 0x8c)
      this.isEgg = byteLogic.getFlag(dataView, 0x8c, 30)
      this.isNicknamed = byteLogic.getFlag(dataView, 0x8c, 31)
      this.dynamaxLevel = dataView.getUint8(0x90)
      this.statusCondition = dataView.getUint32(0x94, true)
      this.palma = dataView.getUint32(0x98, true)
      this.handlerName = stringLogic.utf16BytesToString(buffer, 0xa8, 12)
      this.handlerGender = byteLogic.getFlag(dataView, 0xc2, 0)
      this.handlerLanguage = dataView.getUint8(0xc3)
      this.handlerID = dataView.getUint16(0xc6, true)
      this.handlerFriendship = dataView.getUint8(0xc8)
      this.fullness = dataView.getUint8(0xdc)
      this.enjoyment = dataView.getUint8(0xdd)
      this.gameOfOrigin = dataView.getUint8(0xde)
      this.gameOfOriginBattle = dataView.getUint8(0xdf)
      this.region = dataView.getUint8(0xe0)
      this.consoleRegion = dataView.getUint8(0xe0)
      this.languageIndex = dataView.getUint8(0xe2)
      this.formArgument = dataView.getUint32(0xe4, true)
      this.affixedRibbon = dataView.getUint8(0xe8)
      this.trainerName = stringLogic.utf16BytesToString(buffer, 0xf8, 12)
      this.trainerFriendship = dataView.getUint8(0x112)
      this.eggDate = types.pkmDateFromBytes(dataView, 0x119)
      this.metDate = types.pkmDateFromBytes(dataView, 0x11c)
      this.eggLocationIndex = dataView.getUint16(0x120, true)
      this.metLocationIndex = dataView.getUint16(0x122, true)
      this.ball = dataView.getUint8(0x124)
      this.metLevel = dataView.getUint8(0x125)
      this.tmFlagsBDSP = new Uint8Array(buffer).slice(0x127, 0x135)
      this.homeTracker = new Uint8Array(buffer).slice(0x135, 0x13d)
      this.ribbons = byteLogic
        .getFlagIndexes(dataView, 0x34, 0, 64)
        .map((index) => ModernRibbons[index])
        .concat(
          byteLogic.getFlagIndexes(dataView, 0x40, 0, 47).map((index) => ModernRibbons[index + 64])
        )
      this.isCurrentHandler = byteLogic.getFlag(dataView, 0xc4, 0)
      this.handlerMemory = types.readSwitchHandlerMemoryFromBytes(dataView, 0xc9)
      this.trainerMemory = types.readSwitchTrainerMemoryFromBytes(dataView, 0x113)
      this.hyperTraining = types.readHyperTrainStatsFromBytes(dataView, 0x126)
      this.trainerGender = byteLogic.getFlag(dataView, 0x125, 7)
    } else {
      const other = arg
      this.encryptionConstant = other.encryptionConstant ?? 0
      this.sanity = other.sanity ?? 0
      this.checksum = other.checksum ?? 0
      this.dexNum = other.dexNum
      this.heldItemIndex = ItemFromString(other.heldItemName)
      this.trainerID = other.trainerID
      this.secretID = other.secretID
      this.exp = other.exp
      this.abilityIndex = other.abilityIndex ?? 0
      this.abilityNum = other.abilityNum ?? 0
      this.favorite = other.favorite ?? false
      this.canGigantamax = other.canGigantamax ?? false
      this.markings = types.markingsSixShapesWithColorFromOther(other.markings) ?? {
        circle: false,
        triangle: false,
        square: false,
        heart: false,
        star: false,
        diamond: false,
      }
      this.personalityValue = other.personalityValue ?? 0
      this.nature = other.nature ?? 0
      this.statNature = other.statNature ?? 0
      this.isFatefulEncounter = other.isFatefulEncounter ?? false
      this.gender = other.gender ?? 0
      this.formeNum = other.formeNum
      this.evs = other.evs ?? {
        hp: 0,
        atk: 0,
        def: 0,
        spe: 0,
        spa: 0,
        spd: 0,
      }
      this.contest = other.contest ?? {
        cool: 0,
        beauty: 0,
        cute: 0,
        smart: 0,
        tough: 0,
        sheen: 0,
      }
      this.pokerusByte = other.pokerusByte ?? 0
      this.ribbonBytes = other.ribbonBytes ?? new Uint8Array(8)
      this.contestMemoryCount = other.contestMemoryCount ?? 0
      this.battleMemoryCount = other.battleMemoryCount ?? 0
      this.sociability = other.sociability ?? 0
      this.height = other.height ?? 0
      this.weight = other.weight ?? 0
      this.nickname = other.nickname
      this.moves = other.moves.filter((_, i) => other.moves[i] <= PB8.maxValidMove())
      this.movePP = adjustMovePPBetweenFormats(this, other).filter(
        (_, i) => other.moves[i] <= PB8.maxValidMove()
      )
      this.movePPUps = other.movePPUps.filter((_, i) => other.moves[i] <= PB8.maxValidMove())
      this.relearnMoves = other.relearnMoves?.filter(
        (_, i) => other.moves[i] <= PB8.maxValidMove()
      ) ?? [0, 0, 0, 0]
      this.currentHP = other.currentHP
      this.ivs = other.ivs ?? {
        hp: 0,
        atk: 0,
        def: 0,
        spe: 0,
        spa: 0,
        spd: 0,
      }
      this.isEgg = other.isEgg ?? false
      this.isNicknamed = other.isNicknamed ?? false
      this.dynamaxLevel = other.dynamaxLevel ?? 0
      this.statusCondition = other.statusCondition ?? 0
      this.palma = other.palma ?? 0
      this.handlerName = other.handlerName ?? ''
      this.handlerGender = other.handlerGender ?? false
      this.handlerLanguage = other.handlerLanguage ?? 0
      this.handlerID = other.handlerID ?? 0
      this.handlerFriendship = other.handlerFriendship ?? 0
      this.fullness = other.fullness ?? 0
      this.enjoyment = other.enjoyment ?? 0
      this.gameOfOrigin = other.gameOfOrigin
      this.gameOfOriginBattle = other.gameOfOriginBattle ?? 0
      this.region = other.region ?? 0
      this.consoleRegion = other.consoleRegion ?? 0
      this.languageIndex = other.languageIndex
      this.formArgument = other.formArgument ?? 0
      this.affixedRibbon = other.affixedRibbon ?? 0
      this.trainerName = other.trainerName
      this.trainerFriendship = other.trainerFriendship ?? 0
      this.eggDate = other.eggDate ?? {
        month: new Date().getMonth(),
        day: new Date().getDate(),
        year: new Date().getFullYear(),
      }
      this.metDate = other.metDate ?? {
        month: new Date().getMonth(),
        day: new Date().getDate(),
        year: new Date().getFullYear(),
      }
      this.eggLocationIndex = other.eggLocationIndex ?? 0
      this.metLocationIndex = other.metLocationIndex ?? 0
      if (other.ball && PB8.maxValidBall() >= other.ball) {
        this.ball = other.ball
      } else {
        this.ball = Ball.Strange
      }
      this.metLevel = other.metLevel ?? 0
      this.tmFlagsBDSP = other.tmFlagsBDSP ?? new Uint8Array(14)
      this.homeTracker = other.homeTracker ?? new Uint8Array(8)
      this.ribbons = filterRibbons(other.ribbons ?? [], [ModernRibbons], 'Twinkling Star') ?? []
      this.isCurrentHandler = other.isCurrentHandler ?? false
      this.handlerMemory = other.handlerMemory ?? {
        intensity: 0,
        memory: 0,
        feeling: 0,
        textVariables: 0,
      }
      this.trainerMemory = other.trainerMemory ?? {
        intensity: 0,
        memory: 0,
        feeling: 0,
        textVariables: 0,
      }
      this.hyperTraining = other.hyperTraining ?? {
        hp: false,
        atk: false,
        def: false,
        spa: false,
        spd: false,
        spe: false,
      }
      this.trainerGender = other.trainerGender
    }
  }

  static fromBytes(buffer: ArrayBufferLike): PB8 {
    return new PB8(buffer)
  }

  toBytes(options?: types.ToBytesOptions): ArrayBuffer {
    const buffer = new ArrayBuffer(344)
    const dataView = new DataView(buffer)

    dataView.setUint32(0x0, this.encryptionConstant, true)
    dataView.setUint16(0x4, this.sanity, true)
    dataView.setUint16(0x6, this.checksum, true)
    dataView.setUint16(0x8, this.dexNum, true)
    dataView.setUint16(0xa, this.heldItemIndex, true)
    dataView.setUint16(0xc, this.trainerID, true)
    dataView.setUint16(0xe, this.secretID, true)
    dataView.setUint32(0x10, this.exp, true)
    dataView.setUint16(0x14, this.abilityIndex, true)
    dataView.setUint8(0x16, this.abilityNum)
    byteLogic.setFlag(dataView, 0x16, 3, this.favorite)
    byteLogic.setFlag(dataView, 0x16, 4, this.canGigantamax)
    types.markingsSixShapesWithColorToBytes(dataView, 0x18, this.markings)
    dataView.setUint32(0x1c, this.personalityValue, true)
    dataView.setUint8(0x20, this.nature)
    dataView.setUint8(0x21, this.statNature)
    byteLogic.setFlag(dataView, 0x22, 0, this.isFatefulEncounter)
    dataView.setUint8(0x22, this.gender)
    dataView.setUint16(0x24, this.formeNum, true)
    types.writeStatsToBytes(dataView, 0x26, this.evs)
    types.writeContestStatsToBytes(dataView, 0x2c, this.contest)
    dataView.setUint8(0x32, this.pokerusByte)
    new Uint8Array(buffer).set(new Uint8Array(this.ribbonBytes.slice(0, 8)), 0x34)
    dataView.setUint8(0x3c, this.contestMemoryCount)
    dataView.setUint8(0x3d, this.battleMemoryCount)
    dataView.setUint32(0x48, this.sociability, true)
    dataView.setUint8(0x50, this.height)
    dataView.setUint8(0x51, this.weight)
    stringLogic.writeUTF16StringToBytes(dataView, this.nickname, 0x58, 12)
    for (let i = 0; i < 4; i++) {
      dataView.setUint16(0x72 + i * 2, this.moves[i], true)
    }
    for (let i = 0; i < 4; i++) {
      dataView.setUint8(0x7a + i, this.movePP[i])
    }
    for (let i = 0; i < 4; i++) {
      dataView.setUint8(0x7e + i, this.movePPUps[i])
    }
    for (let i = 0; i < 4; i++) {
      dataView.setUint16(0x82 + i * 2, this.relearnMoves[i], true)
    }
    dataView.setUint16(0x8a, this.currentHP, true)
    types.write30BitIVsToBytes(dataView, 0x8c, this.ivs)
    byteLogic.setFlag(dataView, 0x8c, 30, this.isEgg)
    byteLogic.setFlag(dataView, 0x8c, 31, this.isNicknamed)
    dataView.setUint8(0x90, this.dynamaxLevel)
    dataView.setUint32(0x94, this.statusCondition, true)
    dataView.setUint32(0x98, this.palma, true)
    stringLogic.writeUTF16StringToBytes(dataView, this.handlerName, 0xa8, 12)
    byteLogic.setFlag(dataView, 0xc2, 0, this.handlerGender)
    dataView.setUint8(0xc3, this.handlerLanguage)
    dataView.setUint16(0xc6, this.handlerID, true)
    dataView.setUint8(0xc8, this.handlerFriendship)
    dataView.setUint8(0xdc, this.fullness)
    dataView.setUint8(0xdd, this.enjoyment)
    dataView.setUint8(0xde, this.gameOfOrigin)
    dataView.setUint8(0xdf, this.gameOfOriginBattle)
    dataView.setUint8(0xe0, this.region)
    dataView.setUint8(0xe0, this.consoleRegion)
    dataView.setUint8(0xe2, this.languageIndex)
    dataView.setUint32(0xe4, this.formArgument, true)
    dataView.setUint8(0xe8, this.affixedRibbon)
    stringLogic.writeUTF16StringToBytes(dataView, this.trainerName, 0xf8, 12)
    dataView.setUint8(0x112, this.trainerFriendship)
    types.writePKMDateToBytes(dataView, 0x119, this.eggDate)
    types.writePKMDateToBytes(dataView, 0x11c, this.metDate)
    dataView.setUint16(0x120, this.eggLocationIndex, true)
    dataView.setUint16(0x122, this.metLocationIndex, true)
    dataView.setUint8(0x124, this.ball)
    dataView.setUint8(0x125, this.metLevel)
    new Uint8Array(buffer).set(new Uint8Array(this.tmFlagsBDSP.slice(0, 14)), 0x127)
    new Uint8Array(buffer).set(new Uint8Array(this.homeTracker.slice(0, 8)), 0x135)
    byteLogic.setFlagIndexes(
      dataView,
      0x34,
      0,
      this.ribbons
        .map((ribbon) => ModernRibbons.indexOf(ribbon))
        .filter((index) => index > -1 && index < 64)
    )
    byteLogic.setFlagIndexes(
      dataView,
      0x40,
      0,
      this.ribbons
        .map((ribbon) => ModernRibbons.indexOf(ribbon) - 64)
        .filter((index) => index > -1 && index < 47)
    )
    byteLogic.setFlag(dataView, 0xc4, 0, this.isCurrentHandler)
    types.writeSwitchHandlerMemoryToBytes(dataView, 0xc9, this.handlerMemory)
    types.writeSwitchTrainerMemoryToBytes(dataView, 0x113, this.trainerMemory)
    types.writeHyperTrainStatsToBytes(dataView, 0x126, this.hyperTraining)
    byteLogic.setFlag(dataView, 0x125, 7, this.trainerGender)
    return buffer
  }

  public getStats() {
    return getStats(this)
  }

  public get language() {
    return Languages[this.languageIndex]
  }

  public get abilityName() {
    return AbilityToString(this.abilityIndex)
  }
  public get heldItemName() {
    return ItemToString(this.heldItemIndex)
  }

  public get natureName() {
    return NatureToString(this.nature)
  }
  public getLevel() {
    return getLevelGen3Onward(this.dexNum, this.exp)
  }

  isShiny() {
    return (
      (this.trainerID ^
        this.secretID ^
        (this.personalityValue & 0xffff) ^
        ((this.personalityValue >> 16) & 0xffff)) <
      16
    )
  }

  isSquareShiny() {
    return !(
      this.trainerID ^
      this.secretID ^
      (this.personalityValue & 0xffff) ^
      ((this.personalityValue >> 16) & 0xffff)
    )
  }

  static maxValidMove() {
    return 826
  }

  static maxValidBall() {
    return 27
  }

  static allowedBalls() {
    return []
  }
}

export default PB8

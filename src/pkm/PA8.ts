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
import * as encryption from '../util/encryption'
import { AllPKMFields } from '../util/pkmInterface'
import { filterRibbons } from '../util/ribbonLogic'
import { getLevelGen3Onward, getStats } from '../util/statCalc'
import * as stringLogic from '../util/stringConversion'
import * as types from '../util/types'
import { adjustMovePPBetweenFormats } from '../util/util'

export class PA8 {
  static getName() {
    return 'PA8'
  }
  format: 'PA8' = 'PA8'
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
  markings: types.MarkingsSixShapesWithColor
  personalityValue: number
  nature: number
  statNature: number
  isFatefulEncounter: boolean
  flag2LA: boolean
  gender: number
  formeNum: number
  evs: types.Stats
  contest: types.ContestStats
  pokerusByte: number
  ribbonBytes: Uint8Array
  contestMemoryCount: number
  battleMemoryCount: number
  alphaMove: number
  sociability: number
  height: number
  weight: number
  scale: number
  moves: number[]
  movePP: number[]
  nickname: string
  movePPUps: number[]
  relearnMoves: number[]
  currentHP: number
  ivs: types.Stats
  isEgg: boolean
  isNicknamed: boolean
  dynamaxLevel: number
  statusCondition: number
  unknownA0: number
  gvs: types.Stats
  handlerName: string
  handlerGender: boolean
  handlerLanguage: number
  isCurrentHandler: boolean
  handlerID: number
  handlerFriendship: number
  fullness: number
  enjoyment: number
  gameOfOrigin: number
  gameOfOriginBattle: number
  region: number
  consoleRegion: number
  languageIndex: number
  unknownF3: number
  formArgument: number
  affixedRibbon: number
  trainerName: string
  trainerFriendship: number
  eggDate: types.PKMDate | undefined
  metDate: types.PKMDate | undefined
  ball: number
  eggLocationIndex: number
  metLocationIndex: number
  metLevel: number
  hyperTraining: types.HyperTrainStats
  moveFlagsLA: Uint8Array
  homeTracker: Uint8Array
  tutorFlagsLA: Uint8Array
  masterFlagsLA: Uint8Array
  favorite: boolean
  canGigantamax: boolean
  isAlpha: boolean
  isNoble: boolean
  ribbons: string[]
  trainerGender: boolean
  constructor(arg: ArrayBuffer | AllPKMFields, encrypted?: boolean) {
    if (arg instanceof ArrayBuffer) {
      let buffer = arg
      if (encrypted) {
        const unencryptedBytes = encryption.decryptByteArrayGen8(buffer)
        const unshuffledBytes = encryption.unshuffleBlocksGen678(unencryptedBytes)
        buffer = unshuffledBytes
      }
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
      this.markings = types.markingsSixShapesWithColorFromBytes(dataView, 0x18)
      this.personalityValue = dataView.getUint32(0x1c, true)
      this.nature = dataView.getUint8(0x20)
      this.statNature = dataView.getUint8(0x21)
      this.isFatefulEncounter = byteLogic.getFlag(dataView, 0x22, 0)
      this.flag2LA = byteLogic.getFlag(dataView, 0x22, 1)
      this.gender = dataView.getUint8(0x22)
      this.formeNum = dataView.getUint16(0x24, true)
      this.evs = types.readStatsFromBytes(dataView, 0x26)
      this.contest = types.readContestStatsFromBytes(dataView, 0x2c)
      this.pokerusByte = dataView.getUint8(0x32)
      this.ribbonBytes = new Uint8Array(buffer).slice(0x34, 0x3c)
      this.contestMemoryCount = dataView.getUint8(0x3c)
      this.battleMemoryCount = dataView.getUint8(0x3d)
      this.alphaMove = dataView.getUint16(0x3e, true)
      this.sociability = dataView.getUint32(0x48, true)
      this.height = dataView.getUint8(0x50)
      this.weight = dataView.getUint8(0x51)
      this.scale = dataView.getUint8(0x52)
      this.moves = [
        dataView.getUint16(0x54, true),
        dataView.getUint16(0x56, true),
        dataView.getUint16(0x58, true),
        dataView.getUint16(0x5a, true),
      ]
      this.movePP = [
        dataView.getUint8(0x5c),
        dataView.getUint8(0x5d),
        dataView.getUint8(0x5e),
        dataView.getUint8(0x5f),
      ]
      this.nickname = stringLogic.utf16BytesToString(buffer, 0x60, 12)
      this.movePPUps = [
        dataView.getUint8(0x86),
        dataView.getUint8(0x87),
        dataView.getUint8(0x88),
        dataView.getUint8(0x89),
      ]
      this.relearnMoves = [
        dataView.getUint16(0x8a, true),
        dataView.getUint16(0x8c, true),
        dataView.getUint16(0x8e, true),
        dataView.getUint16(0x90, true),
      ]
      this.currentHP = dataView.getUint16(0x92, true)
      this.ivs = types.readStatsFromBytes(dataView, 0x94)
      this.isEgg = byteLogic.getFlag(dataView, 0x94, 30)
      this.isNicknamed = byteLogic.getFlag(dataView, 0x94, 31)
      this.dynamaxLevel = dataView.getUint8(0x98)
      this.statusCondition = dataView.getUint32(0x9c, true)
      this.unknownA0 = dataView.getUint32(0xa0, true)
      this.gvs = types.readStatsFromBytes(dataView, 0xa4)
      this.handlerName = stringLogic.utf16BytesToString(buffer, 0xb8, 12)
      this.handlerGender = byteLogic.getFlag(dataView, 0xd2, 0)
      this.handlerLanguage = dataView.getUint8(0xd3)
      this.isCurrentHandler = byteLogic.getFlag(dataView, 0xd4, 0)
      this.handlerID = dataView.getUint16(0xd6, true)
      this.handlerFriendship = dataView.getUint8(0xd8)
      this.fullness = dataView.getUint8(0xec)
      this.enjoyment = dataView.getUint8(0xed)
      this.gameOfOrigin = dataView.getUint8(0xee)
      this.gameOfOriginBattle = dataView.getUint8(0xef)
      this.region = dataView.getUint8(0xf0)
      this.consoleRegion = dataView.getUint8(0xf0)
      this.languageIndex = dataView.getUint8(0xf2)
      this.unknownF3 = dataView.getUint8(0xf3)
      this.formArgument = dataView.getUint32(0xf4, true)
      this.affixedRibbon = dataView.getUint8(0xf8)
      this.trainerName = stringLogic.utf16BytesToString(buffer, 0x110, 12)
      this.trainerFriendship = dataView.getUint8(0x12a)
      this.eggDate = types.pkmDateFromBytes(dataView, 0x131)
      this.metDate = types.pkmDateFromBytes(dataView, 0x134)
      this.ball = dataView.getUint8(0x137)
      this.eggLocationIndex = dataView.getUint16(0x13a, true)
      this.metLocationIndex = dataView.getUint16(0x13a, true)
      this.metLevel = dataView.getUint8(0x13d)
      this.hyperTraining = types.readHyperTrainStatsFromBytes(dataView, 0x13e)
      this.moveFlagsLA = new Uint8Array(buffer).slice(0x13f, 0x14d)
      this.homeTracker = new Uint8Array(buffer).slice(0x14d, 0x155)
      this.tutorFlagsLA = new Uint8Array(buffer).slice(0x155, 0x15d)
      this.masterFlagsLA = new Uint8Array(buffer).slice(0x15d, 0x165)
      this.favorite = byteLogic.getFlag(dataView, 0x16, 4)
      this.canGigantamax = byteLogic.getFlag(dataView, 0x16, 5)
      this.isAlpha = byteLogic.getFlag(dataView, 0x16, 6)
      this.isNoble = byteLogic.getFlag(dataView, 0x16, 7)
      this.ribbons = byteLogic
        .getFlagIndexes(dataView, 0x34, 0, 64)
        .map((index) => ModernRibbons[index])
        .concat(
          byteLogic.getFlagIndexes(dataView, 0x40, 0, 47).map((index) => ModernRibbons[index + 64])
        )
      this.trainerGender = byteLogic.getFlag(dataView, 0x13d, 7)
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
      this.flag2LA = other.flag2LA ?? false
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
      this.alphaMove = other.alphaMove ?? 0
      this.sociability = other.sociability ?? 0
      this.height = other.height ?? 0
      this.weight = other.weight ?? 0
      this.scale = other.scale ?? 0
      this.moves = other.moves.filter((_, i) => other.moves[i] <= PA8.maxValidMove())
      this.movePP = adjustMovePPBetweenFormats(this, other).filter(
        (_, i) => other.moves[i] <= PA8.maxValidMove()
      )
      this.nickname = other.nickname
      this.movePPUps = other.movePPUps.filter((_, i) => other.moves[i] <= PA8.maxValidMove())
      this.relearnMoves = other.relearnMoves?.filter(
        (_, i) => other.moves[i] <= PA8.maxValidMove()
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
      this.unknownA0 = other.unknownA0 ?? 0
      this.gvs = other.gvs ?? {
        hp: 0,
        atk: 0,
        def: 0,
        spe: 0,
        spa: 0,
        spd: 0,
      }
      this.handlerName = other.handlerName ?? ''
      this.handlerGender = other.handlerGender ?? false
      this.handlerLanguage = other.handlerLanguage ?? 0
      this.isCurrentHandler = other.isCurrentHandler ?? false
      this.handlerID = other.handlerID ?? 0
      this.handlerFriendship = other.handlerFriendship ?? 0
      this.fullness = other.fullness ?? 0
      this.enjoyment = other.enjoyment ?? 0
      this.gameOfOrigin = other.gameOfOrigin
      this.gameOfOriginBattle = other.gameOfOriginBattle ?? 0
      this.region = other.region ?? 0
      this.consoleRegion = other.consoleRegion ?? 0
      this.languageIndex = other.languageIndex
      this.unknownF3 = other.unknownF3 ?? 0
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
      if (other.ball && PA8.allowedBalls().includes(other.ball)) {
        this.ball = other.ball
      } else {
        this.ball = Ball.Strange
      }
      this.eggLocationIndex = other.eggLocationIndex ?? 0
      this.metLocationIndex = other.metLocationIndex ?? 0
      this.metLevel = other.metLevel ?? 0
      this.hyperTraining = other.hyperTraining ?? {
        hp: false,
        atk: false,
        def: false,
        spa: false,
        spd: false,
        spe: false,
      }
      this.moveFlagsLA = other.moveFlagsLA ?? new Uint8Array(14)
      this.homeTracker = other.homeTracker ?? new Uint8Array(8)
      this.tutorFlagsLA = other.tutorFlagsLA ?? new Uint8Array(8)
      this.masterFlagsLA = other.masterFlagsLA ?? new Uint8Array(8)
      this.favorite = other.favorite ?? false
      this.canGigantamax = other.canGigantamax ?? false
      this.isAlpha = other.isAlpha ?? false
      this.isNoble = other.isNoble ?? false
      this.ribbons = filterRibbons(other.ribbons ?? [], [ModernRibbons], 'Hisui') ?? []
      this.trainerGender = other.trainerGender
    }
  }

  static fromBytes(buffer: ArrayBuffer): PA8 {
    return new PA8(buffer)
  }

  toBytes(): ArrayBuffer {
    const buffer = new ArrayBuffer(376)
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
    types.markingsSixShapesWithColorToBytes(dataView, 0x18, this.markings)
    dataView.setUint32(0x1c, this.personalityValue, true)
    dataView.setUint8(0x20, this.nature)
    dataView.setUint8(0x21, this.statNature)
    byteLogic.setFlag(dataView, 0x22, 0, this.isFatefulEncounter)
    byteLogic.setFlag(dataView, 0x22, 1, this.flag2LA)
    dataView.setUint8(0x22, this.gender)
    dataView.setUint16(0x24, this.formeNum, true)
    types.writeStatsToBytes(dataView, 0x26, this.evs)
    types.writeContestStatsToBytes(dataView, 0x2c, this.contest)
    dataView.setUint8(0x32, this.pokerusByte)
    new Uint8Array(buffer).set(new Uint8Array(this.ribbonBytes.slice(0, 8)), 0x34)
    dataView.setUint8(0x3c, this.contestMemoryCount)
    dataView.setUint8(0x3d, this.battleMemoryCount)
    dataView.setUint16(0x3e, this.alphaMove, true)
    dataView.setUint32(0x48, this.sociability, true)
    dataView.setUint8(0x50, this.height)
    dataView.setUint8(0x51, this.weight)
    dataView.setUint8(0x52, this.scale)
    for (let i = 0; i < 4; i++) {
      dataView.setUint16(0x54 + i * 2, this.moves[i], true)
    }
    for (let i = 0; i < 4; i++) {
      dataView.setUint8(0x5c + i, this.movePP[i])
    }
    stringLogic.writeUTF16StringToBytes(dataView, this.nickname, 0x60, 12)
    for (let i = 0; i < 4; i++) {
      dataView.setUint8(0x86 + i, this.movePPUps[i])
    }
    for (let i = 0; i < 4; i++) {
      dataView.setUint16(0x8a + i * 2, this.relearnMoves[i], true)
    }
    dataView.setUint16(0x92, this.currentHP, true)
    types.writeStatsToBytes(dataView, 0x94, this.ivs)
    byteLogic.setFlag(dataView, 0x94, 30, this.isEgg)
    byteLogic.setFlag(dataView, 0x94, 31, this.isNicknamed)
    dataView.setUint8(0x98, this.dynamaxLevel)
    dataView.setUint32(0x9c, this.statusCondition, true)
    dataView.setUint32(0xa0, this.unknownA0, true)
    types.writeStatsToBytes(dataView, 0xa4, this.gvs)
    stringLogic.writeUTF16StringToBytes(dataView, this.handlerName, 0xb8, 12)
    byteLogic.setFlag(dataView, 0xd2, 0, this.handlerGender)
    dataView.setUint8(0xd3, this.handlerLanguage)
    byteLogic.setFlag(dataView, 0xd4, 0, this.isCurrentHandler)
    dataView.setUint16(0xd6, this.handlerID, true)
    dataView.setUint8(0xd8, this.handlerFriendship)
    dataView.setUint8(0xec, this.fullness)
    dataView.setUint8(0xed, this.enjoyment)
    dataView.setUint8(0xee, this.gameOfOrigin)
    dataView.setUint8(0xef, this.gameOfOriginBattle)
    dataView.setUint8(0xf0, this.region)
    dataView.setUint8(0xf0, this.consoleRegion)
    dataView.setUint8(0xf2, this.languageIndex)
    dataView.setUint8(0xf3, this.unknownF3)
    dataView.setUint32(0xf4, this.formArgument, true)
    dataView.setUint8(0xf8, this.affixedRibbon)
    stringLogic.writeUTF16StringToBytes(dataView, this.trainerName, 0x110, 12)
    dataView.setUint8(0x12a, this.trainerFriendship)
    types.writePKMDateToBytes(dataView, 0x131, this.eggDate)
    types.writePKMDateToBytes(dataView, 0x134, this.metDate)
    dataView.setUint8(0x137, this.ball)
    dataView.setUint16(0x13a, this.eggLocationIndex, true)
    dataView.setUint16(0x13a, this.metLocationIndex, true)
    dataView.setUint8(0x13d, this.metLevel)
    types.writeHyperTrainStatsToBytes(dataView, 0x13e, this.hyperTraining)
    new Uint8Array(buffer).set(new Uint8Array(this.moveFlagsLA.slice(0, 14)), 0x13f)
    new Uint8Array(buffer).set(new Uint8Array(this.homeTracker.slice(0, 8)), 0x14d)
    new Uint8Array(buffer).set(new Uint8Array(this.tutorFlagsLA.slice(0, 8)), 0x155)
    new Uint8Array(buffer).set(new Uint8Array(this.masterFlagsLA.slice(0, 8)), 0x15d)
    byteLogic.setFlag(dataView, 0x16, 4, this.favorite)
    byteLogic.setFlag(dataView, 0x16, 5, this.canGigantamax)
    byteLogic.setFlag(dataView, 0x16, 6, this.isAlpha)
    byteLogic.setFlag(dataView, 0x16, 7, this.isNoble)
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
    byteLogic.setFlag(dataView, 0x13d, 7, this.trainerGender)
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
  public refreshChecksum() {
    this.checksum = encryption.get16BitChecksumLittleEndian(this.toBytes(), 0x00, 0x00)
  }

  public toPCBytes() {
    const shuffledBytes = encryption.shuffleBlocksGen678(this.toBytes())
    return encryption.decryptByteArrayGen8(shuffledBytes)
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
    return 850
  }

  static maxValidBall() {
    return 0
  }

  static allowedBalls() {
    return [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37]
  }
}

export default PA8

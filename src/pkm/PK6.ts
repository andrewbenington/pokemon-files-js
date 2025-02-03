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

export class PK6 {
  static getName() {
    return 'PK6'
  }
  format: 'PK6' = 'PK6'
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
  trainingBagHits: number
  trainingBag: number
  personalityValue: number
  nature: number
  formeNum: number
  gender: number
  evs: types.Stats
  contest: types.ContestStats
  markings: types.MarkingsSixShapesNoColor
  pokerusByte: number
  superTrainingFlags: number
  ribbonBytes: Uint8Array
  contestMemoryCount: number
  battleMemoryCount: number
  superTrainingDistFlags: number
  formArgument: number
  nickname: string
  moves: number[]
  movePP: number[]
  movePPUps: number[]
  relearnMoves: number[]
  secretSuperTrainingUnlocked: boolean
  secretSuperTrainingComplete: boolean
  ivs: types.Stats
  isEgg: boolean
  isNicknamed: boolean
  handlerName: string
  handlerGender: boolean
  isCurrentHandler: boolean
  geolocations: types.Geolocation[]
  handlerFriendship: number
  handlerAffection: number
  handlerMemory: types.Memory
  trainerMemory: types.Memory
  fullness: number
  enjoyment: number
  trainerName: string
  trainerFriendship: number
  trainerAffection: number
  eggDate: types.PKMDate | undefined
  metDate: types.PKMDate | undefined
  eggLocationIndex: number
  metLocationIndex: number
  ball: number
  metLevel: number
  encounterType: number
  gameOfOrigin: number
  country: number
  region: number
  consoleRegion: number
  languageIndex: number
  statusCondition: number
  currentHP: number
  isFatefulEncounter: boolean
  ribbons: string[]
  trainerGender: boolean
  constructor(arg: ArrayBuffer | AllPKMFields, encrypted?: boolean) {
    if (arg instanceof ArrayBuffer) {
      let buffer = arg
      if (encrypted) {
        const unencryptedBytes = encryption.decryptByteArrayGen67(buffer)
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
      this.abilityIndex = dataView.getUint8(0x14)
      this.abilityNum = dataView.getUint8(0x15)
      this.trainingBagHits = dataView.getUint8(0x16)
      this.trainingBag = dataView.getUint8(0x17)
      this.personalityValue = dataView.getUint32(0x18, true)
      this.nature = dataView.getUint8(0x1c)
      this.formeNum = byteLogic.uIntFromBufferBits(dataView, 0x1d, 3, 5, true)
      this.gender = byteLogic.uIntFromBufferBits(dataView, 0x1d, 1, 2, true)
      this.evs = types.readStatsFromBytes(dataView, 0x1e)
      this.contest = types.readContestStatsFromBytes(dataView, 0x24)
      this.markings = types.markingsSixShapesNoColorFromBytes(dataView, 0x2a)
      this.pokerusByte = dataView.getUint8(0x2b)
      this.superTrainingFlags = dataView.getUint32(0x2c, true)
      this.ribbonBytes = new Uint8Array(buffer).slice(0x30, 0x34)
      this.contestMemoryCount = dataView.getUint8(0x38)
      this.battleMemoryCount = dataView.getUint8(0x39)
      this.superTrainingDistFlags = dataView.getUint8(0x3a)
      this.formArgument = dataView.getUint32(0x3c, true)
      this.nickname = stringLogic.utf16BytesToString(buffer, 0x40, 12)
      this.moves = [
        dataView.getUint16(0x5a, true),
        dataView.getUint16(0x5c, true),
        dataView.getUint16(0x5e, true),
        dataView.getUint16(0x60, true),
      ]
      this.movePP = [
        dataView.getUint8(0x62),
        dataView.getUint8(0x63),
        dataView.getUint8(0x64),
        dataView.getUint8(0x65),
      ]
      this.movePPUps = [
        dataView.getUint8(0x66),
        dataView.getUint8(0x67),
        dataView.getUint8(0x68),
        dataView.getUint8(0x69),
      ]
      this.relearnMoves = [
        dataView.getUint16(0x6a, true),
        dataView.getUint16(0x6c, true),
        dataView.getUint16(0x6e, true),
        dataView.getUint16(0x70, true),
      ]
      this.secretSuperTrainingUnlocked = byteLogic.getFlag(dataView, 0x72, 1)
      this.secretSuperTrainingComplete = byteLogic.getFlag(dataView, 0x72, 2)
      this.ivs = types.read30BitIVsFromBytes(dataView, 0x74)
      this.isEgg = byteLogic.getFlag(dataView, 0x74, 30)
      this.isNicknamed = byteLogic.getFlag(dataView, 0x74, 31)
      this.handlerName = stringLogic.utf16BytesToString(buffer, 0x78, 12)
      this.handlerGender = byteLogic.getFlag(dataView, 0x92, 0)
      this.isCurrentHandler = byteLogic.getFlag(dataView, 0x93, 0)
      this.geolocations = [
        types.readGeolocationFromBytes(dataView, 0x94),
        types.readGeolocationFromBytes(dataView, 0x96),
        types.readGeolocationFromBytes(dataView, 0x98),
        types.readGeolocationFromBytes(dataView, 0x9a),
        types.readGeolocationFromBytes(dataView, 0x9c),
      ]
      this.handlerFriendship = dataView.getUint8(0xa2)
      this.handlerAffection = dataView.getUint8(0xa3)
      this.handlerMemory = types.read3DSHandlerMemoryFromBytes(dataView, 0xa4)
      this.trainerMemory = types.read3DSTrainerMemoryFromBytes(dataView, 0xcc)
      this.fullness = dataView.getUint8(0xae)
      this.enjoyment = dataView.getUint8(0xaf)
      this.trainerName = stringLogic.utf16BytesToString(buffer, 0xb0, 12)
      this.trainerFriendship = dataView.getUint8(0xca)
      this.trainerAffection = dataView.getUint8(0xcb)
      this.eggDate = types.pkmDateFromBytes(dataView, 0xd1)
      this.metDate = types.pkmDateFromBytes(dataView, 0xd4)
      this.eggLocationIndex = dataView.getUint16(0xd8, true)
      this.metLocationIndex = dataView.getUint16(0xda, true)
      this.ball = dataView.getUint8(0xdc)
      this.metLevel = dataView.getUint8(0xdd)
      this.encounterType = dataView.getUint8(0xde)
      this.gameOfOrigin = dataView.getUint8(0xdf)
      this.country = dataView.getUint8(0xe0)
      this.region = dataView.getUint8(0xe1)
      this.consoleRegion = dataView.getUint8(0xe2)
      this.languageIndex = dataView.getUint8(0xe3)
      if (dataView.byteLength >= 260) {
        this.statusCondition = dataView.getUint8(0xe8)
      } else {
        this.statusCondition = 0
      }
      if (dataView.byteLength >= 260) {
        this.currentHP = dataView.getUint8(0xf0)
      } else {
        this.currentHP = 0
      }
      this.isFatefulEncounter = byteLogic.getFlag(dataView, 0x1d, 0)
      this.ribbons = byteLogic
        .getFlagIndexes(dataView, 0x30, 0, 46)
        .map((index) => ModernRibbons[index])
      this.trainerGender = byteLogic.getFlag(dataView, 0xdd, 7)
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
      this.trainingBagHits = other.trainingBagHits ?? 0
      this.trainingBag = other.trainingBag ?? 0
      this.personalityValue = other.personalityValue ?? 0
      this.nature = other.nature ?? 0
      this.formeNum = other.formeNum
      this.gender = other.gender ?? 0
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
      this.markings = types.markingsSixShapesNoColorFromOther(other.markings) ?? {
        circle: false,
        triangle: false,
        square: false,
        heart: false,
        star: false,
        diamond: false,
      }
      this.pokerusByte = other.pokerusByte ?? 0
      this.superTrainingFlags = other.superTrainingFlags ?? 0
      this.ribbonBytes = other.ribbonBytes ?? new Uint8Array(4)
      this.contestMemoryCount = other.contestMemoryCount ?? 0
      this.battleMemoryCount = other.battleMemoryCount ?? 0
      this.superTrainingDistFlags = other.superTrainingDistFlags ?? 0
      this.formArgument = other.formArgument ?? 0
      this.nickname = other.nickname
      this.moves = other.moves.filter((_, i) => other.moves[i] <= PK6.maxValidMove())
      this.movePP = adjustMovePPBetweenFormats(this, other).filter(
        (_, i) => other.moves[i] <= PK6.maxValidMove()
      )
      this.movePPUps = other.movePPUps.filter((_, i) => other.moves[i] <= PK6.maxValidMove())
      this.relearnMoves = other.relearnMoves?.filter(
        (_, i) => other.moves[i] <= PK6.maxValidMove()
      ) ?? [0, 0, 0, 0]
      this.secretSuperTrainingUnlocked = other.secretSuperTrainingUnlocked ?? false
      this.secretSuperTrainingComplete = other.secretSuperTrainingComplete ?? false
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
      this.handlerName = other.handlerName ?? ''
      this.handlerGender = other.handlerGender ?? false
      this.isCurrentHandler = other.isCurrentHandler ?? false
      this.geolocations = other.geolocations ?? [
        {
          region: 0,
          country: 0,
        },
        {
          region: 0,
          country: 0,
        },
        {
          region: 0,
          country: 0,
        },
        {
          region: 0,
          country: 0,
        },
        {
          region: 0,
          country: 0,
        },
      ]
      this.handlerFriendship = other.handlerFriendship ?? 0
      this.handlerAffection = other.handlerAffection ?? 0
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
      this.fullness = other.fullness ?? 0
      this.enjoyment = other.enjoyment ?? 0
      this.trainerName = other.trainerName
      this.trainerFriendship = other.trainerFriendship ?? 0
      this.trainerAffection = other.trainerAffection ?? 0
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
      if (other.ball && PK6.maxValidBall() >= other.ball) {
        this.ball = other.ball
      } else {
        this.ball = Ball.Poke
      }
      this.metLevel = other.metLevel ?? 0
      this.encounterType = other.encounterType ?? 0
      this.gameOfOrigin = other.gameOfOrigin
      this.country = other.country ?? 0
      this.region = other.region ?? 0
      this.consoleRegion = other.consoleRegion ?? 0
      this.languageIndex = other.languageIndex
      this.statusCondition = other.statusCondition ?? 0
      this.currentHP = other.currentHP
      this.isFatefulEncounter = other.isFatefulEncounter ?? false
      this.ribbons = filterRibbons(other.ribbons ?? [], [ModernRibbons], 'Toughness Master') ?? []
      this.trainerGender = other.trainerGender
    }
  }

  static fromBytes(buffer: ArrayBuffer): PK6 {
    return new PK6(buffer)
  }

  toBytes(options?: types.ToBytesOptions): ArrayBuffer {
    const buffer = new ArrayBuffer(options?.includeExtraFields ? 260 : 232)
    const dataView = new DataView(buffer)

    dataView.setUint32(0x0, this.encryptionConstant, true)
    dataView.setUint16(0x4, this.sanity, true)
    dataView.setUint16(0x6, this.checksum, true)
    dataView.setUint16(0x8, this.dexNum, true)
    dataView.setUint16(0xa, this.heldItemIndex, true)
    dataView.setUint16(0xc, this.trainerID, true)
    dataView.setUint16(0xe, this.secretID, true)
    dataView.setUint32(0x10, this.exp, true)
    dataView.setUint8(0x14, this.abilityIndex)
    dataView.setUint8(0x15, this.abilityNum)
    dataView.setUint8(0x16, this.trainingBagHits)
    dataView.setUint8(0x17, this.trainingBag)
    dataView.setUint32(0x18, this.personalityValue, true)
    dataView.setUint8(0x1c, this.nature)
    byteLogic.uIntToBufferBits(dataView, this.formeNum, 29, 3, 5, true)
    byteLogic.uIntToBufferBits(dataView, this.gender, 29, 1, 2, true)
    types.writeStatsToBytes(dataView, 0x1e, this.evs)
    types.writeContestStatsToBytes(dataView, 0x24, this.contest)
    types.markingsSixShapesNoColorToBytes(dataView, 0x2a, this.markings)
    dataView.setUint8(0x2b, this.pokerusByte)
    dataView.setUint32(0x2c, this.superTrainingFlags, true)
    new Uint8Array(buffer).set(new Uint8Array(this.ribbonBytes.slice(0, 4)), 0x30)
    dataView.setUint8(0x38, this.contestMemoryCount)
    dataView.setUint8(0x39, this.battleMemoryCount)
    dataView.setUint8(0x3a, this.superTrainingDistFlags)
    dataView.setUint32(0x3c, this.formArgument, true)
    stringLogic.writeUTF16StringToBytes(dataView, this.nickname, 0x40, 12)
    for (let i = 0; i < 4; i++) {
      dataView.setUint16(0x5a + i * 2, this.moves[i], true)
    }
    for (let i = 0; i < 4; i++) {
      dataView.setUint8(0x62 + i, this.movePP[i])
    }
    for (let i = 0; i < 4; i++) {
      dataView.setUint8(0x66 + i, this.movePPUps[i])
    }
    for (let i = 0; i < 4; i++) {
      dataView.setUint16(0x6a + i * 2, this.relearnMoves[i], true)
    }
    byteLogic.setFlag(dataView, 0x72, 1, this.secretSuperTrainingUnlocked)
    byteLogic.setFlag(dataView, 0x72, 2, this.secretSuperTrainingComplete)
    types.write30BitIVsToBytes(dataView, 0x74, this.ivs)
    byteLogic.setFlag(dataView, 0x74, 30, this.isEgg)
    byteLogic.setFlag(dataView, 0x74, 31, this.isNicknamed)
    stringLogic.writeUTF16StringToBytes(dataView, this.handlerName, 0x78, 12)
    byteLogic.setFlag(dataView, 0x92, 0, this.handlerGender)
    byteLogic.setFlag(dataView, 0x93, 0, this.isCurrentHandler)
    for (let i = 0; i < 5; i++) {
      types.writeGeolocationToBytes(dataView, 0x94 + 2 * i, this.geolocations[i])
    }
    dataView.setUint8(0xa2, this.handlerFriendship)
    dataView.setUint8(0xa3, this.handlerAffection)
    types.write3DSHandlerMemoryToBytes(dataView, 0xa4, this.handlerMemory)
    types.write3DSTrainerMemoryToBytes(dataView, 0xcc, this.trainerMemory)
    dataView.setUint8(0xae, this.fullness)
    dataView.setUint8(0xaf, this.enjoyment)
    stringLogic.writeUTF16StringToBytes(dataView, this.trainerName, 0xb0, 12)
    dataView.setUint8(0xca, this.trainerFriendship)
    dataView.setUint8(0xcb, this.trainerAffection)
    types.writePKMDateToBytes(dataView, 0xd1, this.eggDate)
    types.writePKMDateToBytes(dataView, 0xd4, this.metDate)
    dataView.setUint16(0xd8, this.eggLocationIndex, true)
    dataView.setUint16(0xda, this.metLocationIndex, true)
    dataView.setUint8(0xdc, this.ball)
    dataView.setUint8(0xdd, this.metLevel)
    dataView.setUint8(0xde, this.encounterType)
    dataView.setUint8(0xdf, this.gameOfOrigin)
    dataView.setUint8(0xe0, this.country)
    dataView.setUint8(0xe1, this.region)
    dataView.setUint8(0xe2, this.consoleRegion)
    dataView.setUint8(0xe3, this.languageIndex)
    if (options?.includeExtraFields) {
      dataView.setUint8(0xe8, this.statusCondition)
    }
    if (options?.includeExtraFields) {
      dataView.setUint8(0xf0, this.currentHP)
    }
    byteLogic.setFlag(dataView, 0x1d, 0, this.isFatefulEncounter)
    byteLogic.setFlagIndexes(
      dataView,
      0x30,
      0,
      this.ribbons
        .map((ribbon) => ModernRibbons.indexOf(ribbon))
        .filter((index) => index > -1 && index < 46)
    )
    byteLogic.setFlag(dataView, 0xdd, 7, this.trainerGender)
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
    this.checksum = encryption.get16BitChecksumLittleEndian(this.toBytes(), 0x08, 0xe8)
  }

  public toPCBytes() {
    const shuffledBytes = encryption.shuffleBlocksGen678(this.toBytes())
    return encryption.decryptByteArrayGen67(shuffledBytes)
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
    return 621
  }

  static maxValidBall() {
    return 25
  }

  static allowedBalls() {
    return []
  }
}

export default PK6

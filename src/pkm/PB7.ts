// This file was generated by make generate
import {
  AbilityToString,
  Ball,
  ItemFromString,
  ItemToString,
  Languages,
  NatureToString,
} from 'pokemon-resources'
import * as byteLogic from '../util/byteLogic'
import { AllPKMFields } from '../util/pkmInterface'
import { getLevelGen3Onward, getStats } from '../util/statCalc'
import * as stringLogic from '../util/stringConversion'
import * as types from '../util/types'
import { adjustMovePPBetweenFormats } from '../util/util'

export class PB7 {
  format: 'PB7' = 'PB7'
  encryptionConstant: number
  dexNum: number
  heldItemIndex: number
  trainerID: number
  secretID: number
  exp: number
  abilityIndex: number
  abilityNum: number
  favorite: boolean
  markings: types.MarkingsSixShapesWithColor
  personalityValue: number
  nature: number
  isFatefulEncounter: boolean
  gender: number
  formeNum: number
  evs: types.Stats
  avs: types.Stats
  resortEventStatus: number
  pokerusByte: number
  height: number
  weight: number
  formArgument: number
  nickname: string
  moves: number[]
  movePP: number[]
  movePPUps: number[]
  relearnMoves: number[]
  ivs: types.Stats
  isEgg: boolean
  isNicknamed: boolean
  handlerName: string
  handlerGender: boolean
  isCurrentHandler: boolean
  handlerFriendship: number
  fieldEventFatigue1: number
  fieldEventFatigue2: number
  fullness: number
  enjoyment: number
  trainerName: string
  trainerFriendship: number
  eggDate: types.PKMDate | undefined
  metDate: types.PKMDate | undefined
  eggLocationIndex: number
  metLocationIndex: number
  ball: number
  metLevel: number
  hyperTraining: types.HyperTrainStats
  gameOfOrigin: number
  languageIndex: number
  statusCondition: number
  currentHP: number
  trainerGender: boolean

  constructor(arg: ArrayBuffer | AllPKMFields) {
    if (arg instanceof ArrayBuffer) {
      const buffer = arg
      const dataView = new DataView(buffer)
      this.encryptionConstant = dataView.getUint32(0x0, true)
      this.dexNum = dataView.getUint16(0x8, true)
      this.heldItemIndex = dataView.getUint16(0xa, true)
      this.trainerID = dataView.getUint16(0xc, true)
      this.secretID = dataView.getUint16(0xe, true)
      this.exp = dataView.getUint32(0x10, true)
      this.abilityIndex = dataView.getUint8(0x14)
      this.abilityNum = dataView.getUint8(0x15)
      this.favorite = byteLogic.getFlag(dataView, 0x15, 3)
      this.markings = types.markingsSixShapesWithColorFromBytes(dataView, 0x16)
      this.personalityValue = dataView.getUint32(0x18, true)
      this.nature = dataView.getUint8(0x1c)
      this.isFatefulEncounter = byteLogic.getFlag(dataView, 0x1d, 0)
      this.gender = byteLogic.uIntFromBufferBits(dataView, 0x1d, 1, 2, true)
      this.formeNum = byteLogic.uIntFromBufferBits(dataView, 0x1d, 3, 5, true)
      this.evs = types.readStatsFromBytes(dataView, 0x1e)
      this.avs = types.readStatsFromBytes(dataView, 0x24)
      this.resortEventStatus = dataView.getUint8(0x2a)
      this.pokerusByte = dataView.getUint8(0x2b)
      this.height = dataView.getUint8(0x3a)
      this.weight = dataView.getUint8(0x3b)
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
      this.ivs = types.readStatsFromBytes(dataView, 0x74)
      this.isEgg = byteLogic.getFlag(dataView, 0x74, 30)
      this.isNicknamed = byteLogic.getFlag(dataView, 0x74, 31)
      this.handlerName = stringLogic.utf16BytesToString(buffer, 0x78, 12)
      this.handlerGender = byteLogic.getFlag(dataView, 0x92, 0)
      this.isCurrentHandler = byteLogic.getFlag(dataView, 0x93, 0)
      this.handlerFriendship = dataView.getUint8(0xa2)
      this.fieldEventFatigue1 = dataView.getUint8(0xac)
      this.fieldEventFatigue2 = dataView.getUint8(0xad)
      this.fullness = dataView.getUint8(0xae)
      this.enjoyment = dataView.getUint8(0xaf)
      this.trainerName = stringLogic.utf16BytesToString(buffer, 0xb0, 12)
      this.trainerFriendship = dataView.getUint8(0xca)
      this.eggDate = types.pkmDateFromBytes(dataView, 0xd1)
      this.metDate = types.pkmDateFromBytes(dataView, 0xd4)
      this.eggLocationIndex = dataView.getUint16(0xd8, true)
      this.metLocationIndex = dataView.getUint16(0xda, true)
      this.ball = dataView.getUint8(0xdc)
      this.metLevel = dataView.getUint8(0xdd)
      this.hyperTraining = types.readHyperTrainStatsFromBytes(dataView, 0xde)
      this.gameOfOrigin = dataView.getUint8(0xdf)
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
      this.trainerGender = byteLogic.getFlag(dataView, 0xdd, 7)
    } else {
      const other = arg
      this.encryptionConstant = other.encryptionConstant ?? 0
      this.dexNum = other.dexNum
      this.heldItemIndex = ItemFromString(other.heldItemName)
      this.trainerID = other.trainerID
      this.secretID = other.secretID
      this.exp = other.exp
      this.abilityIndex = other.abilityIndex ?? 0
      this.abilityNum = other.abilityNum ?? 0
      this.favorite = other.favorite ?? false
      this.markings = types.markingsSixShapesWithColorFromOther(other.markings)
      this.personalityValue = other.personalityValue ?? 0
      this.nature = other.nature ?? 0
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
      this.avs = other.avs ?? {
        hp: 0,
        atk: 0,
        def: 0,
        spe: 0,
        spa: 0,
        spd: 0,
      }
      this.resortEventStatus = other.resortEventStatus ?? 0
      this.pokerusByte = other.pokerusByte ?? 0
      this.height = other.height ?? 0
      this.weight = other.weight ?? 0
      this.formArgument = other.formArgument ?? 0
      this.nickname = other.nickname
      this.moves = other.moves.filter((_, i) => other.moves[i] <= PB7.maxValidMove())
      this.movePP = adjustMovePPBetweenFormats(this, other).filter(
        (_, i) => other.moves[i] <= PB7.maxValidMove()
      )
      this.movePPUps = other.movePPUps.filter((_, i) => other.moves[i] <= PB7.maxValidMove())
      this.relearnMoves = other.relearnMoves?.filter(
        (_, i) => other.moves[i] <= PB7.maxValidMove()
      ) ?? [0, 0, 0, 0]
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
      this.handlerFriendship = other.handlerFriendship ?? 0
      this.fieldEventFatigue1 = other.fieldEventFatigue1 ?? 0
      this.fieldEventFatigue2 = other.fieldEventFatigue2 ?? 0
      this.fullness = other.fullness ?? 0
      this.enjoyment = other.enjoyment ?? 0
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
      if (other.ball && PB7.allowedBalls().includes(other.ball)) {
        this.ball = other.ball
      } else {
        this.ball = Ball.Poke
      }
      this.metLevel = other.metLevel ?? 0
      this.hyperTraining = other.hyperTraining ?? {
        hp: false,
        atk: false,
        def: false,
        spa: false,
        spd: false,
        spe: false,
      }
      this.gameOfOrigin = other.gameOfOrigin
      this.languageIndex = other.languageIndex
      this.statusCondition = other.statusCondition ?? 0
      this.currentHP = other.currentHP
      this.trainerGender = other.trainerGender
    }
  }

  static fromBytes(buffer: ArrayBufferLike): PB7 {
    return new PB7(buffer)
  }

  toBytes(options?: types.ToBytesOptions): ArrayBuffer {
    const buffer = new ArrayBuffer(options?.includeExtraFields ? 260 : 232)
    const dataView = new DataView(buffer)

    dataView.setUint32(0x0, this.encryptionConstant, true)
    dataView.setUint16(0x8, this.dexNum, true)
    dataView.setUint16(0xa, this.heldItemIndex, true)
    dataView.setUint16(0xc, this.trainerID, true)
    dataView.setUint16(0xe, this.secretID, true)
    dataView.setUint32(0x10, this.exp, true)
    dataView.setUint8(0x14, this.abilityIndex)
    dataView.setUint8(0x15, this.abilityNum)
    byteLogic.setFlag(dataView, 0x15, 3, this.favorite)
    types.markingsSixShapesWithColorToBytes(dataView, 0x16, this.markings)
    dataView.setUint32(0x18, this.personalityValue, true)
    dataView.setUint8(0x1c, this.nature)
    byteLogic.setFlag(dataView, 0x1d, 0, this.isFatefulEncounter)
    byteLogic.uIntToBufferBits(dataView, this.gender, 29, 1, 2, true)
    byteLogic.uIntToBufferBits(dataView, this.formeNum, 29, 3, 5, true)
    types.writeStatsToBytes(dataView, 0x1e, this.evs)
    types.writeStatsToBytes(dataView, 0x24, this.avs)
    dataView.setUint8(0x2a, this.resortEventStatus)
    dataView.setUint8(0x2b, this.pokerusByte)
    dataView.setUint8(0x3a, this.height)
    dataView.setUint8(0x3b, this.weight)
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
    types.writeStatsToBytes(dataView, 0x74, this.ivs)
    byteLogic.setFlag(dataView, 0x74, 30, this.isEgg)
    byteLogic.setFlag(dataView, 0x74, 31, this.isNicknamed)
    stringLogic.writeUTF16StringToBytes(dataView, this.handlerName, 0x78, 12)
    byteLogic.setFlag(dataView, 0x92, 0, this.handlerGender)
    byteLogic.setFlag(dataView, 0x93, 0, this.isCurrentHandler)
    dataView.setUint8(0xa2, this.handlerFriendship)
    dataView.setUint8(0xac, this.fieldEventFatigue1)
    dataView.setUint8(0xad, this.fieldEventFatigue2)
    dataView.setUint8(0xae, this.fullness)
    dataView.setUint8(0xaf, this.enjoyment)
    stringLogic.writeUTF16StringToBytes(dataView, this.trainerName, 0xb0, 12)
    dataView.setUint8(0xca, this.trainerFriendship)
    types.writePKMDateToBytes(dataView, 0xd1, this.eggDate)
    types.writePKMDateToBytes(dataView, 0xd4, this.metDate)
    dataView.setUint16(0xd8, this.eggLocationIndex, true)
    dataView.setUint16(0xda, this.metLocationIndex, true)
    dataView.setUint8(0xdc, this.ball)
    dataView.setUint8(0xdd, this.metLevel)
    types.writeHyperTrainStatsToBytes(dataView, 0xde, this.hyperTraining)
    dataView.setUint8(0xdf, this.gameOfOrigin)
    dataView.setUint8(0xe3, this.languageIndex)
    if (options?.includeExtraFields) {
      dataView.setUint8(0xe8, this.statusCondition)
    }
    if (options?.includeExtraFields) {
      dataView.setUint8(0xf0, this.currentHP)
    }
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
    return 742
  }

  static maxValidBall() {
    return 0
  }

  static allowedBalls() {
    return [1, 2, 3, 4, 12]
  }
}

export default PB7

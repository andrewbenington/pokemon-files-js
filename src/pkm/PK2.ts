// This file was generated by make generate
import { ItemFromString, ItemToString, Languages, isGameBoy } from 'pokemon-resources'
import { NationalDex, PokemonData } from 'pokemon-species-data'
import * as byteLogic from '../util/byteLogic'
import { genderFromDVs } from '../util/genderCalc'
import { AllPKMFields } from '../util/pkmInterface'
import { getLevelGen12, getStats } from '../util/statCalc'
import * as stringLogic from '../util/stringConversion'
import * as types from '../util/types'
import { adjustMovePPBetweenFormats } from '../util/util'

export class PK2 {
  format: 'PK2' = 'PK2'
  gameOfOrigin: number
  languageIndex: number
  dexNum: number
  heldItemIndex: number
  moves: number[]
  trainerID: number
  exp: number
  evsG12: types.StatsPreSplit
  dvs: types.StatsPreSplit
  movePP: number[]
  movePPUps: number[]
  trainerFriendship: number
  pokerusByte: number
  metTimeOfDay: number
  metLevel: number
  metLocationIndex: number
  level: number
  statusCondition: number
  currentHP: number
  trainerName: string
  nickname: string
  trainerGender: boolean

  constructor(arg: ArrayBuffer | AllPKMFields) {
    if (arg instanceof ArrayBuffer) {
      const buffer = new Uint8Array(arg)[2] === 0xff ? arg.slice(3) : arg
      const dataView = new DataView(buffer)
      this.gameOfOrigin = 0
      this.languageIndex = 0
      this.dexNum = dataView.getUint8(0x0)
      this.heldItemIndex = dataView.getUint8(0x1)
      this.moves = [
        dataView.getUint8(0x2),
        dataView.getUint8(0x3),
        dataView.getUint8(0x4),
        dataView.getUint8(0x5),
      ]
      this.trainerID = dataView.getUint16(0x6, false)
      this.exp = (dataView.getUint32(0x8, false) >> 8) & 0xffffff
      this.evsG12 = {
        hp: dataView.getUint16(0xb, false),
        atk: dataView.getUint16(0xd, false),
        def: dataView.getUint16(0xf, false),
        spe: dataView.getUint16(0x11, false),
        spc: dataView.getUint16(0x13, false),
      }
      this.dvs = types.readDVsFromBytes(dataView, 0x15)
      this.movePP = [
        byteLogic.uIntFromBufferBits(dataView, 0x17, 0, 6, false),
        byteLogic.uIntFromBufferBits(dataView, 0x18, 0, 6, false),
        byteLogic.uIntFromBufferBits(dataView, 0x19, 0, 6, false),
        byteLogic.uIntFromBufferBits(dataView, 0x1a, 0, 6, false),
      ]
      this.movePPUps = [
        byteLogic.uIntFromBufferBits(dataView, 0x17, 6, 2, false),
        byteLogic.uIntFromBufferBits(dataView, 0x18, 6, 2, false),
        byteLogic.uIntFromBufferBits(dataView, 0x19, 6, 2, false),
        byteLogic.uIntFromBufferBits(dataView, 0x1a, 6, 2, false),
      ]
      this.trainerFriendship = dataView.getUint8(0x1b)
      this.pokerusByte = dataView.getUint8(0x1c)
      this.metTimeOfDay = byteLogic.uIntFromBufferBits(dataView, 0x1d, 6, 2, false)
      this.metLevel = byteLogic.uIntFromBufferBits(dataView, 0x1d, 0, 6, false)
      this.metLocationIndex = byteLogic.uIntFromBufferBits(dataView, 0x1e, 0, 7, false)
      this.level = dataView.getUint8(0x1f)
      if (dataView.byteLength >= 70) {
        this.statusCondition = dataView.getUint8(0x20)
      } else {
        this.statusCondition = 0
      }
      if (dataView.byteLength >= 70) {
        this.currentHP = dataView.getUint8(0x22)
      } else {
        this.currentHP = 0
      }
      if (dataView.byteLength >= 70) {
        this.trainerName = stringLogic.readGameBoyStringFromBytes(dataView, 0x30, 8)
      } else {
        this.trainerName = 'TRAINER'
      }
      if (dataView.byteLength >= 70) {
        this.nickname = stringLogic.readGameBoyStringFromBytes(dataView, 0x3b, 11)
      } else {
        this.nickname = PokemonData[this.dexNum].formes[0].name
      }
      this.trainerGender = byteLogic.getFlag(dataView, 0x1e, 7)
    } else {
      const other = arg
      this.gameOfOrigin = other.gameOfOrigin
      this.languageIndex = other.languageIndex
      this.dexNum = other.dexNum
      this.heldItemIndex = ItemFromString(other.heldItemName)
      this.moves = other.moves.filter((_, i) => other.moves[i] <= PK2.maxValidMove())
      if (!isGameBoy(other.gameOfOrigin) && other.personalityValue !== undefined) {
        this.trainerID = other.personalityValue % 0x10000
      } else {
        this.trainerID = other.trainerID
      }
      this.exp = other.exp
      this.evsG12 = other.evsG12 ?? {
        hp: 0,
        atk: 0,
        def: 0,
        spe: 0,
        spc: 0,
      }
      this.dvs = other.dvs ?? {
        hp: 0,
        atk: 0,
        def: 0,
        spe: 0,
        spc: 0,
      }
      this.movePP = adjustMovePPBetweenFormats(this, other).filter(
        (_, i) => other.moves[i] <= PK2.maxValidMove()
      )
      this.movePPUps = other.movePPUps.filter((_, i) => other.moves[i] <= PK2.maxValidMove())
      this.trainerFriendship = other.trainerFriendship ?? 0
      this.pokerusByte = other.pokerusByte ?? 0
      this.metTimeOfDay = other.metTimeOfDay ?? 0
      this.metLevel = other.metLevel ?? 0
      this.metLocationIndex = other.metLocationIndex ?? 0
      this.level = other.level ?? 0
      this.statusCondition = other.statusCondition ?? 0
      this.currentHP = other.currentHP
      this.trainerName = other.trainerName
      this.nickname = other.nickname
      this.trainerGender = other.trainerGender
    }
  }

  static fromBytes(buffer: ArrayBufferLike): PK2 {
    return new PK2(buffer)
  }

  toBytes(options?: types.ToBytesOptions): ArrayBuffer {
    const buffer = new ArrayBuffer(options?.includeExtraFields ? 73 : 32)
    const dataView = new DataView(buffer)

    dataView.setUint8(0x0, this.dexNum)
    dataView.setUint8(0x1, this.heldItemIndex)
    for (let i = 0; i < 4; i++) {
      dataView.setUint8(0x2 + i, this.moves[i])
    }
    dataView.setUint16(0x6, this.trainerID, false)
    new Uint8Array(buffer).set(byteLogic.uint24ToBytesBigEndian(this.exp), 0x8)
    dataView.setUint16(0xb, this.evsG12.hp, false)
    dataView.setUint16(0xd, this.evsG12.atk, false)
    dataView.setUint16(0xf, this.evsG12.def, false)
    dataView.setUint16(0x11, this.evsG12.spe, false)
    dataView.setUint16(0x13, this.evsG12.spc, false)

    types.writeDVsToBytes(this.dvs, dataView, 0x15)
    for (let i = 0; i < 4; i++) {
      byteLogic.uIntToBufferBits(dataView, this.movePP[i], 0x17 + i, 0, 6, false)
    }
    for (let i = 0; i < 4; i++) {
      byteLogic.uIntToBufferBits(dataView, this.movePPUps[i], 0x17 + i, 6, 2, false)
    }
    dataView.setUint8(0x1b, this.trainerFriendship)
    dataView.setUint8(0x1c, this.pokerusByte)
    byteLogic.uIntToBufferBits(dataView, this.metTimeOfDay, 29, 6, 2, false)
    byteLogic.uIntToBufferBits(dataView, this.metLevel, 29, 0, 6, false)
    byteLogic.uIntToBufferBits(dataView, this.metLocationIndex, 30, 0, 7, false)
    dataView.setUint8(0x1f, this.level)
    if (options?.includeExtraFields) {
      dataView.setUint8(0x20, this.statusCondition)
    }
    if (options?.includeExtraFields) {
      dataView.setUint8(0x22, this.currentHP)
    }
    if (options?.includeExtraFields) {
      stringLogic.writeGameBoyStringToBytes(dataView, this.trainerName, 0x30, 8, true)
    }
    if (options?.includeExtraFields) {
      stringLogic.writeGameBoyStringToBytes(dataView, this.nickname, 0x3b, 11, true)
    }
    byteLogic.setFlag(dataView, 0x1e, 7, this.trainerGender)
    return buffer
  }

  public getStats() {
    return getStats(this)
  }

  public get gender() {
    return genderFromDVs(this.dvs, this.dexNum)
  }

  public get language() {
    return Languages[this.languageIndex]
  }
  public get heldItemName() {
    return ItemToString(this.heldItemIndex)
  }

  public get secretID() {
    return 0
  }

  public get formeNum() {
    if (this.dexNum === NationalDex.Unown) {
      let ivCombinationVal = ((this.dvs.atk >> 1) & 0b11) << 6
      ivCombinationVal += ((this.dvs.def >> 1) & 0b11) << 4
      ivCombinationVal += ((this.dvs.spe >> 1) & 0b11) << 2
      ivCombinationVal += (this.dvs.spc >> 1) & 0b11
      ivCombinationVal /= 10
      return Math.floor(ivCombinationVal)
    }
    return 0
  }
  public getLevel() {
    return getLevelGen12(this.dexNum, this.exp)
  }

  isShiny() {
    return (
      this.dvs.spe === 10 &&
      this.dvs.def === 10 &&
      this.dvs.spc === 10 &&
      [2, 3, 6, 7, 10, 11, 14, 15].includes(this.dvs.atk)
    )
  }

  isSquareShiny() {
    return false
  }

  static maxValidMove() {
    return 251
  }

  static maxValidBall() {
    return 0
  }

  static allowedBalls() {
    return []
  }
}

export default PK2

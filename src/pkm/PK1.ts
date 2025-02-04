// This file was generated by make generate

import { isGameBoy, ItemFromString, ItemToString, Languages } from 'pokemon-resources'
import { PokemonData } from 'pokemon-species-data'

import * as conversion from '../conversion'
import * as byteLogic from '../util/byteLogic'
import { genderFromDVs } from '../util/genderCalc'
import { AllPKMFields } from '../util/pkmInterface'
import { getLevelGen12, getStats } from '../util/statCalc'
import * as stringLogic from '../util/stringConversion'
import * as types from '../util/types'
import { adjustMovePPBetweenFormats } from '../util/util'

export class PK1 {
  static getName() {
    return 'PK1'
  }
  format: 'PK1' = 'PK1'
  static getBoxSize() {
    return 33
  }
  gameOfOrigin: number
  personalityValue: number
  languageIndex: number
  dexNum: number
  currentHP: number
  level: number
  statusCondition: number
  type1: number
  type2: number
  heldItemIndex: number
  moves: number[]
  trainerID: number
  exp: number
  evsG12: types.StatsPreSplit
  dvs: types.StatsPreSplit
  movePP: number[]
  movePPUps: number[]
  trainerName: string
  nickname: string
  constructor(arg: ArrayBuffer | AllPKMFields) {
    if (arg instanceof ArrayBuffer) {
      const buffer = new Uint8Array(arg)[2] === 0xff ? arg.slice(3) : arg
      const dataView = new DataView(buffer)
      this.gameOfOrigin = 0
      this.personalityValue = 0
      this.languageIndex = 0
      this.dexNum = conversion.fromGen1PokemonIndex(dataView.getUint8(0x0))
      this.currentHP = dataView.getUint16(0x1, false)
      this.level = dataView.getUint8(0x3)
      this.statusCondition = dataView.getUint8(0x4)
      this.type1 = dataView.getUint8(0x5)
      this.type2 = dataView.getUint8(0x6)
      this.heldItemIndex = dataView.getUint8(0x7)
      this.moves = [
        dataView.getUint8(0x8),
        dataView.getUint8(0x9),
        dataView.getUint8(0xa),
        dataView.getUint8(0xb),
      ]
      this.trainerID = dataView.getUint16(0xc, false)
      this.exp = (dataView.getUint32(0xe, false) >> 8) & 0xffffff
      this.evsG12 = {
        hp: dataView.getUint16(0x11, false),
        atk: dataView.getUint16(0x13, false),
        def: dataView.getUint16(0x15, false),
        spe: dataView.getUint16(0x17, false),
        spc: dataView.getUint16(0x19, false),
      }
      this.dvs = types.readDVsFromBytes(dataView, 0x1b)
      this.movePP = [
        byteLogic.uIntFromBufferBits(dataView, 0x1d, 0, 6, false),
        byteLogic.uIntFromBufferBits(dataView, 0x1e, 0, 6, false),
        byteLogic.uIntFromBufferBits(dataView, 0x1f, 0, 6, false),
        byteLogic.uIntFromBufferBits(dataView, 0x20, 0, 6, false),
      ]
      this.movePPUps = [
        byteLogic.uIntFromBufferBits(dataView, 0x1d, 6, 2, false),
        byteLogic.uIntFromBufferBits(dataView, 0x1e, 6, 2, false),
        byteLogic.uIntFromBufferBits(dataView, 0x1f, 6, 2, false),
        byteLogic.uIntFromBufferBits(dataView, 0x20, 6, 2, false),
      ]
      if (dataView.byteLength >= 66) {
        this.trainerName = stringLogic.readGameBoyStringFromBytes(dataView, 0x2c, 8)
      } else {
        this.trainerName = 'TRAINER'
      }
      if (dataView.byteLength >= 66) {
        this.nickname = stringLogic.readGameBoyStringFromBytes(dataView, 0x37, 11)
      } else {
        this.nickname = PokemonData[this.dexNum].formes[0].name
      }
    } else {
      const other = arg
      this.gameOfOrigin = other.gameOfOrigin
      this.personalityValue = other.personalityValue ?? 0
      this.languageIndex = other.languageIndex
      this.dexNum = other.dexNum
      this.currentHP = other.currentHP
      this.level = other.level ?? 0
      this.statusCondition = other.statusCondition ?? 0
      this.type1 = other.type1 ?? 0
      this.type2 = other.type2 ?? 0
      this.heldItemIndex = ItemFromString(other.heldItemName)
      this.moves = other.moves.filter((_, i) => other.moves[i] <= PK1.maxValidMove())
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
        (_, i) => other.moves[i] <= PK1.maxValidMove()
      )
      this.movePPUps = other.movePPUps.filter((_, i) => other.moves[i] <= PK1.maxValidMove())
      this.trainerName = other.trainerName
      this.nickname = other.nickname
    }
  }

  static fromBytes(buffer: ArrayBuffer): PK1 {
    return new PK1(buffer)
  }

  toBytes(options?: types.ToBytesOptions): ArrayBuffer {
    const buffer = new ArrayBuffer(options?.includeExtraFields ? 66 : 33)
    const dataView = new DataView(buffer)

    dataView.setUint8(0x0, conversion.toGen1PokemonIndex(this.dexNum))
    dataView.setUint16(0x1, this.currentHP, false)
    dataView.setUint8(0x3, this.level)
    dataView.setUint8(0x4, this.statusCondition)
    dataView.setUint8(0x5, this.type1)
    dataView.setUint8(0x6, this.type2)
    dataView.setUint8(0x7, this.heldItemIndex)
    for (let i = 0; i < 4; i++) {
      dataView.setUint8(0x8 + i, this.moves[i])
    }
    dataView.setUint16(0xc, this.trainerID, false)
    new Uint8Array(buffer).set(byteLogic.uint24ToBytesBigEndian(this.exp), 0xe)
    dataView.setUint16(0x11, this.evsG12.hp, false)
    dataView.setUint16(0x13, this.evsG12.atk, false)
    dataView.setUint16(0x15, this.evsG12.def, false)
    dataView.setUint16(0x17, this.evsG12.spe, false)
    dataView.setUint16(0x19, this.evsG12.spc, false)

    types.writeDVsToBytes(this.dvs, dataView, 0x1b)
    for (let i = 0; i < 4; i++) {
      byteLogic.uIntToBufferBits(dataView, this.movePP[i], 0x1d + i, 0, 6, false)
    }
    for (let i = 0; i < 4; i++) {
      byteLogic.uIntToBufferBits(dataView, this.movePPUps[i], 0x1d + i, 6, 2, false)
    }
    if (options?.includeExtraFields) {
      stringLogic.writeGameBoyStringToBytes(dataView, this.trainerName, 0x2c, 8, true)
    }
    if (options?.includeExtraFields) {
      stringLogic.writeGameBoyStringToBytes(dataView, this.nickname, 0x37, 11, true)
    }
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

  public get trainerGender() {
    return false
  }

  public get secretID() {
    return 0
  }

  public get formeNum() {
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
    return 165
  }

  static maxValidBall() {
    return 0
  }

  static allowedBalls() {
    return []
  }
}

export default PK1

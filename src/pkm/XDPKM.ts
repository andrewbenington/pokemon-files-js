// This file was generated by make generate

import {
  AbilityFromString,
  Ball,
  Gen3ContestRibbons,
  Gen3StandardRibbons,
  ItemGen3FromString,
  ItemGen3ToString,
  Languages,
  NatureToString,
} from 'pokemon-resources'
import { NationalDex, PokemonData } from 'pokemon-species-data'

import * as byteLogic from '../util/byteLogic'
import { genderFromPID } from '../util/genderCalc'
import { AllPKMFields } from '../util/pkmInterface'
import {
  filterRibbons,
  gen3ContestRibbonsFromBytes,
  gen3ContestRibbonsToBytes,
} from '../util/ribbonLogic'
import { getLevelGen3Onward, getStats } from '../util/statCalc'
import * as stringLogic from '../util/stringConversion'
import * as types from '../util/types'
import { adjustMovePPBetweenFormats } from '../util/util'

export class XDPKM {
  static getName() {
    return 'XDPKM'
  }
  format: 'XDPKM' = 'XDPKM'
  static getBoxSize() {
    return 196
  }
  dexNum: number
  heldItemIndex: number
  currentHP: number
  trainerFriendship: number
  metLocationIndex: number
  metLevel: number
  ball: number
  trainerGender: boolean
  statLevel: number
  pokerusByte: number
  markings: types.MarkingsFourShapes
  isEgg: boolean
  exp: number
  secretID: number
  trainerID: number
  personalityValue: number
  isFatefulEncounter: boolean
  gameOfOrigin: number
  languageIndex: number
  trainerName: string
  nickname: string
  moves: number[]
  movePP: number[]
  movePPUps: number[]
  evs: types.Stats
  ivs: types.Stats
  contest: types.ContestStats
  shadowID: number
  ribbons: string[]
  constructor(arg: ArrayBuffer | AllPKMFields) {
    if (arg instanceof ArrayBuffer) {
      const buffer = arg
      const dataView = new DataView(buffer)
      this.dexNum = dataView.getUint16(0x0, false)
      this.heldItemIndex = dataView.getUint16(0x2, false)
      this.currentHP = dataView.getUint16(0x4, false)
      this.trainerFriendship = dataView.getUint16(0x6, false)
      this.metLocationIndex = dataView.getUint16(0x8, false)
      this.metLevel = dataView.getUint8(0xe)
      this.ball = dataView.getUint8(0xf)
      this.trainerGender = byteLogic.getFlag(dataView, 0x10, 1)
      this.statLevel = dataView.getUint8(0x11)
      this.pokerusByte = dataView.getUint8(0x13)
      this.markings = types.markingsFourShapesFromBytes(dataView, 0x14)
      this.isEgg = byteLogic.getFlag(dataView, 0x1d, 7)
      this.exp = dataView.getUint32(0x20, false)
      this.secretID = dataView.getUint16(0x24, false)
      this.trainerID = dataView.getUint16(0x26, false)
      this.personalityValue = dataView.getUint32(0x28, false)
      this.isFatefulEncounter = byteLogic.getFlag(dataView, 0x33, 0)
      this.gameOfOrigin = dataView.getUint8(0x34)
      this.languageIndex = dataView.getUint8(0x37)
      this.trainerName = stringLogic.utf16BytesToString(buffer, 0x38, 11)
      this.nickname = stringLogic.utf16BytesToString(buffer, 0x4e, 11)
      this.moves = [
        dataView.getUint16(0x80, false),
        dataView.getUint16(0x82, false),
        dataView.getUint16(0x84, false),
        dataView.getUint16(0x86, false),
      ]
      this.movePP = [
        dataView.getUint8(0x82),
        dataView.getUint8(0x83),
        dataView.getUint8(0x84),
        dataView.getUint8(0x85),
      ]
      this.movePPUps = [
        dataView.getUint8(0x83),
        dataView.getUint8(0x84),
        dataView.getUint8(0x85),
        dataView.getUint8(0x86),
      ]
      this.evs = types.readStatsFromBytes(dataView, 0x9d)
      this.ivs = types.readStatsFromBytes(dataView, 0xa9)
      this.contest = types.readContestStatsFromBytes(dataView, 0xae)
      this.shadowID = dataView.getUint16(0xba, false)
      this.ribbons = gen3ContestRibbonsFromBytes(dataView, 0xb3).concat(
        byteLogic.getFlagIndexes(dataView, 0x7c, 15, 12).map((index) => Gen3StandardRibbons[index])
      )
    } else {
      const other = arg
      this.dexNum = other.dexNum
      this.heldItemIndex = ItemGen3FromString(other.heldItemName)
      this.currentHP = other.currentHP
      this.trainerFriendship = other.trainerFriendship ?? 0
      this.metLocationIndex = other.metLocationIndex ?? 0
      this.metLevel = other.metLevel ?? 0
      if (other.ball && XDPKM.maxValidBall() >= other.ball) {
        this.ball = other.ball
      } else {
        this.ball = Ball.Poke
      }
      this.trainerGender = other.trainerGender
      this.statLevel = other.statLevel ?? 0
      this.pokerusByte = other.pokerusByte ?? 0
      this.markings = types.markingsFourShapesFromOther(other.markings) ?? {
        circle: false,
        triangle: false,
        square: false,
        heart: false,
      }
      this.isEgg = other.isEgg ?? false
      this.exp = other.exp
      this.secretID = other.secretID
      this.trainerID = other.trainerID
      this.personalityValue = other.personalityValue ?? 0
      this.isFatefulEncounter = other.isFatefulEncounter ?? false
      this.gameOfOrigin = other.gameOfOrigin
      this.languageIndex = other.languageIndex
      this.trainerName = other.trainerName
      this.nickname = other.nickname
      this.moves = other.moves.filter((_, i) => other.moves[i] <= XDPKM.maxValidMove())
      this.movePP = adjustMovePPBetweenFormats(this, other).filter(
        (_, i) => other.moves[i] <= XDPKM.maxValidMove()
      )
      this.movePPUps = other.movePPUps.filter((_, i) => other.moves[i] <= XDPKM.maxValidMove())
      this.evs = other.evs ?? {
        hp: 0,
        atk: 0,
        def: 0,
        spe: 0,
        spa: 0,
        spd: 0,
      }
      this.ivs = other.ivs ?? {
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
      this.shadowID = other.shadowID ?? 0
      this.ribbons =
        filterRibbons(other.ribbons ?? [], [Gen3ContestRibbons, Gen3StandardRibbons]) ?? []
    }
  }

  static fromBytes(buffer: ArrayBuffer): XDPKM {
    return new XDPKM(buffer)
  }

  toBytes(): ArrayBuffer {
    const buffer = new ArrayBuffer(196)
    const dataView = new DataView(buffer)

    dataView.setUint16(0x0, this.dexNum, false)
    dataView.setUint16(0x2, this.heldItemIndex, false)
    dataView.setUint16(0x4, this.currentHP, false)
    dataView.setUint16(0x6, this.trainerFriendship, false)
    dataView.setUint16(0x8, this.metLocationIndex, false)
    dataView.setUint8(0xe, this.metLevel)
    dataView.setUint8(0xf, this.ball)
    byteLogic.setFlag(dataView, 0x10, 1, this.trainerGender)
    dataView.setUint8(0x11, this.statLevel)
    dataView.setUint8(0x13, this.pokerusByte)
    types.markingsFourShapesToBytes(dataView, 0x14, this.markings)
    byteLogic.setFlag(dataView, 0x1d, 7, this.isEgg)
    dataView.setUint32(0x20, this.exp, false)
    dataView.setUint16(0x24, this.secretID, false)
    dataView.setUint16(0x26, this.trainerID, false)
    dataView.setUint32(0x28, this.personalityValue, false)
    byteLogic.setFlag(dataView, 0x33, 0, this.isFatefulEncounter)
    dataView.setUint8(0x34, this.gameOfOrigin)
    dataView.setUint8(0x37, this.languageIndex)
    stringLogic.writeUTF16StringToBytes(dataView, this.trainerName, 0x38, 11)
    stringLogic.writeUTF16StringToBytes(dataView, this.nickname, 0x4e, 11)
    for (let i = 0; i < 4; i++) {
      dataView.setUint16(0x80 + i * 2, this.moves[i], false)
    }
    for (let i = 0; i < 4; i++) {
      dataView.setUint8(0x82 + i, this.movePP[i])
    }
    for (let i = 0; i < 4; i++) {
      dataView.setUint8(0x83 + i, this.movePPUps[i])
    }
    types.writeStatsToBytes(dataView, 0x9d, this.evs)
    types.writeStatsToBytes(dataView, 0xa9, this.ivs)
    types.writeContestStatsToBytes(dataView, 0xae, this.contest)
    dataView.setUint16(0xba, this.shadowID, false)
    gen3ContestRibbonsToBytes(dataView, 0xb3, this.ribbons)
    byteLogic.setFlagIndexes(
      dataView,
      0x7c,
      15,
      this.ribbons
        .map((ribbon) => Gen3StandardRibbons.indexOf(ribbon))
        .filter((index) => index > -1 && index < 12)
    )
    return buffer
  }

  public getStats() {
    return getStats(this)
  }

  public get gender() {
    return genderFromPID(this.personalityValue, this.dexNum)
  }

  public get language() {
    return Languages[this.languageIndex]
  }
  public get heldItemName() {
    return ItemGen3ToString(this.heldItemIndex)
  }

  public get nature() {
    return this.personalityValue % 25
  }

  public get abilityNum() {
    return ((this.personalityValue >> 0) & 1) + 1
  }

  public get abilityIndex() {
    return AbilityFromString(this.ability)
  }

  public get ability() {
    const ability1 = PokemonData[this.dexNum]?.formes[0].ability1
    const ability2 = PokemonData[this.dexNum]?.formes[0].ability2
    if (this.abilityNum === 2 && ability2 && AbilityFromString(ability2) <= 77) {
      return ability2
    }
    return ability1
  }

  public get natureName() {
    return NatureToString(this.nature)
  }

  public get formeNum() {
    if (this.dexNum === NationalDex.Unown) {
      let letterValue = (this.personalityValue >> 24) & 0x3
      letterValue = ((this.personalityValue >> 16) & 0x3) | (letterValue << 2)
      letterValue = ((this.personalityValue >> 8) & 0x3) | (letterValue << 2)
      letterValue = (this.personalityValue & 0x3) | (letterValue << 2)
      return letterValue % 28
    }
    return 0
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
      8
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
    return 354
  }

  static maxValidBall() {
    return 12
  }

  static allowedBalls() {
    return []
  }
}

export default XDPKM

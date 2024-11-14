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
import {
  adjustMovePPBetweenFormats,
  generatePersonalityValuePreservingAttributes,
} from '../util/util'

export class COLOPKM {
  format: 'COLOPKM' = 'COLOPKM'
  dexNum: number
  personalityValue: number
  gameOfOrigin: number
  languageIndex: number
  metLocationIndex: number
  metLevel: number
  ball: number
  trainerGender: boolean
  trainerID: number
  secretID: number
  trainerName: string
  nickname: string
  ribbonBytes: Uint8Array
  exp: number
  statLevel: number
  moves: number[]
  movePP: number[]
  movePPUps: number[]
  heldItemIndex: number
  currentHP: number
  evs: types.Stats
  ivs: types.Stats
  contest: types.ContestStats
  isFatefulEncounter: boolean
  pokerusByte: number
  markings: types.MarkingsFourShapes
  trainerFriendship: number
  shadowID: number
  shadowGauge: number
  ribbons: string[]

  constructor(arg: ArrayBuffer | AllPKMFields, encrypted?: boolean) {
    if (arg instanceof ArrayBuffer) {
      const buffer = arg
      const dataView = new DataView(buffer)
      this.dexNum = dataView.getUint16(0x0, false)
      this.personalityValue = dataView.getUint32(0x4, false)
      this.gameOfOrigin = dataView.getUint8(0x8)
      this.languageIndex = dataView.getUint8(0xb)
      this.metLocationIndex = dataView.getUint16(0xc, false)
      this.metLevel = dataView.getUint8(0xe)
      this.ball = dataView.getUint8(0xf)
      this.trainerGender = byteLogic.getFlag(dataView, 0x10, 1)
      this.trainerID = dataView.getUint16(0x14, false)
      this.secretID = dataView.getUint16(0x16, false)
      this.trainerName = stringLogic.utf16BytesToString(buffer, 0x18, 11)
      this.nickname = stringLogic.utf16BytesToString(buffer, 0x2e, 11)
      this.ribbonBytes = new Uint8Array(buffer).slice(0x4c, 0x50)
      this.exp = dataView.getUint32(0x5c, false)
      this.statLevel = dataView.getUint8(0x60)
      this.moves = [
        dataView.getUint16(0x78, false),
        dataView.getUint16(0x7a, false),
        dataView.getUint16(0x7c, false),
        dataView.getUint16(0x7e, false),
      ]
      this.movePP = [
        dataView.getUint8(0x7a),
        dataView.getUint8(0x7b),
        dataView.getUint8(0x7c),
        dataView.getUint8(0x7d),
      ]
      this.movePPUps = [
        dataView.getUint8(0x7b),
        dataView.getUint8(0x7c),
        dataView.getUint8(0x7d),
        dataView.getUint8(0x7e),
      ]
      this.heldItemIndex = dataView.getUint16(0x88, false)
      this.currentHP = dataView.getUint16(0x8a, false)
      this.evs = types.readStatsFromBytes(dataView, 0x99)
      this.ivs = types.readStatsFromBytes(dataView, 0xa5)
      this.contest = types.readContestStatsFromBytes(dataView, 0xb2)
      this.isFatefulEncounter = byteLogic.getFlag(dataView, 0xc9, 4)
      this.pokerusByte = dataView.getUint8(0xca)
      this.markings = types.markingsFourShapesFromBytes(dataView, 0xcf)
      this.trainerFriendship = dataView.getUint8(0xd0)
      this.shadowID = dataView.getUint16(0xd8, false)
      this.shadowGauge = dataView.getUint32(0xdc, false)
      this.ribbons = gen3ContestRibbonsFromBytes(dataView, 0xb7).concat(
        byteLogic.getByteIndexes(dataView, 0xbd, 11).map((index) => Gen3StandardRibbons[index])
      )
    } else {
      const other = arg
      this.dexNum = other.dexNum
      this.personalityValue = generatePersonalityValuePreservingAttributes(other) ?? 0
      this.gameOfOrigin = other.gameOfOrigin
      this.languageIndex = other.languageIndex
      this.metLocationIndex = other.metLocationIndex ?? 0
      this.metLevel = other.metLevel ?? 0
      if (other.ball && COLOPKM.maxValidBall() >= other.ball) {
        this.ball = other.ball
      } else {
        this.ball = Ball.Poke
      }
      this.trainerGender = other.trainerGender
      this.trainerID = other.trainerID
      this.secretID = other.secretID
      this.trainerName = other.trainerName
      this.nickname = other.nickname
      this.ribbonBytes = other.ribbonBytes ?? new Uint8Array(4)
      this.exp = other.exp
      this.statLevel = other.statLevel ?? 0
      this.moves = other.moves.filter((_, i) => other.moves[i] <= COLOPKM.maxValidMove())
      this.movePP = adjustMovePPBetweenFormats(this, other).filter(
        (_, i) => other.moves[i] <= COLOPKM.maxValidMove()
      )
      this.movePPUps = other.movePPUps.filter((_, i) => other.moves[i] <= COLOPKM.maxValidMove())
      this.heldItemIndex = ItemGen3FromString(other.heldItemName)
      this.currentHP = other.currentHP
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
      this.isFatefulEncounter = other.isFatefulEncounter ?? false
      this.pokerusByte = other.pokerusByte ?? 0
      this.markings = types.markingsFourShapesFromOther(other.markings) ?? {
        circle: false,
        triangle: false,
        square: false,
        heart: false,
      }
      this.trainerFriendship = other.trainerFriendship ?? 0
      this.shadowID = other.shadowID ?? 0
      this.shadowGauge = other.shadowGauge ?? 0
      this.ribbons =
        filterRibbons(other.ribbons ?? [], [Gen3ContestRibbons, Gen3StandardRibbons]) ?? []
    }
  }

  static fromBytes(buffer: ArrayBuffer): COLOPKM {
    return new COLOPKM(buffer)
  }

  toBytes(): ArrayBuffer {
    const buffer = new ArrayBuffer(312)
    const dataView = new DataView(buffer)

    dataView.setUint16(0x0, this.dexNum, false)
    dataView.setUint32(0x4, this.personalityValue, false)
    dataView.setUint8(0x8, this.gameOfOrigin)
    dataView.setUint8(0xb, this.languageIndex)
    dataView.setUint16(0xc, this.metLocationIndex, false)
    dataView.setUint8(0xe, this.metLevel)
    dataView.setUint8(0xf, this.ball)
    byteLogic.setFlag(dataView, 0x10, 1, this.trainerGender)
    dataView.setUint16(0x14, this.trainerID, false)
    dataView.setUint16(0x16, this.secretID, false)
    stringLogic.writeUTF16StringToBytes(dataView, this.trainerName, 0x18, 11)
    stringLogic.writeUTF16StringToBytes(dataView, this.nickname, 0x2e, 11)
    new Uint8Array(buffer).set(new Uint8Array(this.ribbonBytes.slice(0, 4)), 0x4c)
    dataView.setUint32(0x5c, this.exp, false)
    dataView.setUint8(0x60, this.statLevel)
    for (let i = 0; i < 4; i++) {
      dataView.setUint16(0x78 + i * 2, this.moves[i], false)
    }
    for (let i = 0; i < 4; i++) {
      dataView.setUint8(0x7a + i, this.movePP[i])
    }
    for (let i = 0; i < 4; i++) {
      dataView.setUint8(0x7b + i, this.movePPUps[i])
    }
    dataView.setUint16(0x88, this.heldItemIndex, false)
    dataView.setUint16(0x8a, this.currentHP, false)
    types.writeStatsToBytes(dataView, 0x99, this.evs)
    types.writeStatsToBytes(dataView, 0xa5, this.ivs)
    types.writeContestStatsToBytes(dataView, 0xb2, this.contest)
    byteLogic.setFlag(dataView, 0xc9, 4, this.isFatefulEncounter)
    dataView.setUint8(0xca, this.pokerusByte)
    types.markingsFourShapesToBytes(dataView, 0xcf, this.markings)
    dataView.setUint8(0xd0, this.trainerFriendship)
    dataView.setUint16(0xd8, this.shadowID, false)
    dataView.setUint32(0xdc, this.shadowGauge, false)
    gen3ContestRibbonsToBytes(dataView, 0xb7, this.ribbons)
    byteLogic.setByteIndexes(
      dataView,
      0xbd,
      this.ribbons
        .map((ribbon) => Gen3StandardRibbons.indexOf(ribbon) - 0)
        .filter((index) => index > -1 && index < 11)
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

export default COLOPKM

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

import * as conversion from '../conversion'
import * as byteLogic from '../util/byteLogic'
import * as encryption from '../util/encryption'
import { genderFromPID } from '../util/genderCalc'
import { AllPKMFields } from '../util/pkmInterface'
import {
  filterRibbons,
  gen3ContestRibbonsFromBuffer,
  gen3ContestRibbonsToBuffer,
} from '../util/ribbonLogic'
import { getLevelGen3Onward, getStats } from '../util/statCalc'
import * as stringLogic from '../util/stringConversion'
import * as types from '../util/types'
import {
  adjustMovePPBetweenFormats,
  generatePersonalityValuePreservingAttributes,
  getGen3MiscFlags,
} from '../util/util'

export class PK3 {
  static getName() {
    return 'PK3'
  }
  format: 'PK3' = 'PK3'
  personalityValue: number
  trainerID: number
  secretID: number
  languageIndex: number
  markings: types.MarkingsFourShapes
  dexNum: number
  heldItemIndex: number
  exp: number
  movePPUps: number[]
  trainerFriendship: number
  moves: number[]
  movePP: number[]
  evs: types.Stats
  contest: types.ContestStats
  pokerusByte: number
  metLocationIndex: number
  metLevel: number
  gameOfOrigin: number
  ball: number
  ivs: types.Stats
  isEgg: boolean
  isNicknamed: boolean
  ribbonBytes: Uint8Array
  isFatefulEncounter: boolean
  statusCondition: number
  currentHP: number
  nickname: string
  trainerName: string
  ribbons: string[]
  trainerGender: boolean
  checksum: number

  constructor(arg: ArrayBuffer | AllPKMFields, encrypted?: boolean) {
    if (arg instanceof ArrayBuffer) {
      let buffer = arg

      if (encrypted) {
        const unencryptedBytes = encryption.decryptByteArrayGen3(buffer)
        const unshuffledBytes = encryption.unshuffleBlocksGen3(unencryptedBytes)

        buffer = unshuffledBytes
      }

      const dataView = new DataView(buffer)

      this.personalityValue = dataView.getUint32(0x0, true)
      this.trainerID = dataView.getUint16(0x4, true)
      this.secretID = dataView.getUint16(0x6, true)
      this.languageIndex = dataView.getUint8(0x12)
      this.markings = types.markingsFourShapesFromBytes(dataView, 0x1b)
      this.dexNum = conversion.fromGen3PokemonIndex(dataView.getUint16(0x20, true))
      this.heldItemIndex = dataView.getUint16(0x22, true)
      this.exp = dataView.getUint32(0x24, true)
      this.movePPUps = [
        byteLogic.uIntFromBufferBits(dataView, 0x28, 0, 2, true),
        byteLogic.uIntFromBufferBits(dataView, 0x28, 2, 2, true),
        byteLogic.uIntFromBufferBits(dataView, 0x28, 4, 2, true),
        byteLogic.uIntFromBufferBits(dataView, 0x28, 6, 2, true),
      ]
      this.trainerFriendship = dataView.getUint8(0x29)
      this.moves = [
        dataView.getUint16(0x2c, true),
        dataView.getUint16(0x2e, true),
        dataView.getUint16(0x30, true),
        dataView.getUint16(0x32, true),
      ]
      this.movePP = [
        dataView.getUint8(0x34),
        dataView.getUint8(0x35),
        dataView.getUint8(0x36),
        dataView.getUint8(0x37),
      ]
      this.evs = types.readStatsFromBytesU8(dataView, 0x38)
      this.contest = types.readContestStatsFromBytes(dataView, 0x3e)
      this.pokerusByte = dataView.getUint8(0x44)
      this.metLocationIndex = dataView.getUint8(0x45)
      this.metLevel = byteLogic.uIntFromBufferBits(dataView, 0x46, 0, 7, true)
      this.gameOfOrigin = byteLogic.uIntFromBufferBits(dataView, 0x46, 7, 4, true)
      this.ball = byteLogic.uIntFromBufferBits(dataView, 0x46, 11, 4, true)
      this.ivs = types.read30BitIVsFromBytes(dataView, 0x48)
      this.isEgg = byteLogic.getFlag(dataView, 0x48, 30)
      this.isNicknamed = byteLogic.getFlag(dataView, 0x48, 31)
      this.ribbonBytes = new Uint8Array(buffer).slice(0x4c, 0x50)
      this.isFatefulEncounter = byteLogic.getFlag(dataView, 0x4c, 31)
      if (dataView.byteLength >= 100) {
        this.statusCondition = dataView.getUint8(0x50)
      } else {
        this.statusCondition = 0
      }

      if (dataView.byteLength >= 100) {
        this.currentHP = dataView.getUint8(0x56)
      } else {
        this.currentHP = 0
      }

      this.nickname = stringLogic.readGen3StringFromBytes(dataView, 0x8, 10)
      this.trainerName = stringLogic.readGen3StringFromBytes(dataView, 0x14, 7)
      this.ribbons = gen3ContestRibbonsFromBuffer(dataView, 0x4c, 0).concat(
        byteLogic.getFlagIndexes(dataView, 0x4c, 15, 12).map((index) => Gen3StandardRibbons[index])
      )
      this.trainerGender = byteLogic.getFlag(dataView, 0x46, 15)
      this.checksum = dataView.getUint16(0x1c, true)
    } else {
      const other = arg

      this.personalityValue = generatePersonalityValuePreservingAttributes(other) ?? 0
      this.trainerID = other.trainerID
      this.secretID = other.secretID
      this.languageIndex = other.languageIndex
      this.markings = types.markingsFourShapesFromOther(other.markings) ?? {
        circle: false,
        triangle: false,
        square: false,
        heart: false,
      }
      this.dexNum = other.dexNum
      this.heldItemIndex = ItemGen3FromString(other.heldItemName)
      this.exp = other.exp
      this.movePPUps = other.movePPUps.filter((_, i) => other.moves[i] <= PK3.maxValidMove())
      this.trainerFriendship = other.trainerFriendship ?? 0
      this.moves = other.moves.filter((_, i) => other.moves[i] <= PK3.maxValidMove())
      this.movePP = adjustMovePPBetweenFormats(this, other).filter(
        (_, i) => other.moves[i] <= PK3.maxValidMove()
      )
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
      this.metLocationIndex = other.metLocationIndex ?? 0
      this.metLevel = other.metLevel ?? 0
      this.gameOfOrigin = other.gameOfOrigin
      if (other.ball && PK3.maxValidBall() >= other.ball) {
        this.ball = other.ball
      } else {
        this.ball = Ball.Poke
      }

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
      this.ribbonBytes = other.ribbonBytes ?? new Uint8Array(4)
      this.isFatefulEncounter = other.isFatefulEncounter ?? false
      this.statusCondition = other.statusCondition ?? 0
      this.currentHP = other.currentHP
      this.nickname = other.nickname
      this.trainerName = other.trainerName
      this.ribbons =
        filterRibbons(other.ribbons ?? [], [Gen3ContestRibbons, Gen3StandardRibbons]) ?? []
      this.trainerGender = other.trainerGender
      this.checksum = other.checksum ?? 0
    }
  }

  static fromBytes(buffer: ArrayBuffer): PK3 {
    return new PK3(buffer)
  }

  toBytes(options?: types.ToBytesOptions): ArrayBuffer {
    const buffer = new ArrayBuffer(options?.includeExtraFields ? 100 : 80)
    const dataView = new DataView(buffer)

    dataView.setUint32(0x0, this.personalityValue, true)
    dataView.setUint16(0x4, this.trainerID, true)
    dataView.setUint16(0x6, this.secretID, true)
    dataView.setUint8(0x12, this.languageIndex)
    types.markingsFourShapesToBytes(dataView, 0x1b, this.markings)
    dataView.setUint16(0x20, conversion.toGen3PokemonIndex(this.dexNum), true)
    dataView.setUint16(0x22, this.heldItemIndex, true)
    dataView.setUint32(0x24, this.exp, true)
    for (let i = 0; i < 4; i++) {
      byteLogic.uIntToBufferBits(dataView, this.movePPUps[i], 0x28, 0 + i * 2, 2, true)
    }

    dataView.setUint8(0x29, this.trainerFriendship)
    for (let i = 0; i < 4; i++) {
      dataView.setUint16(0x2c + i * 2, this.moves[i], true)
    }

    for (let i = 0; i < 4; i++) {
      dataView.setUint8(0x34 + i, this.movePP[i])
    }

    types.writeStatsToBytesU8(dataView, 0x38, this.evs)
    types.writeContestStatsToBytes(dataView, 0x3e, this.contest)
    dataView.setUint8(0x44, this.pokerusByte)
    dataView.setUint8(0x45, this.metLocationIndex)
    byteLogic.uIntToBufferBits(dataView, this.metLevel, 70, 0, 7, true)
    byteLogic.uIntToBufferBits(dataView, this.gameOfOrigin, 70, 7, 4, true)
    byteLogic.uIntToBufferBits(dataView, this.ball, 70, 11, 4, true)
    types.write30BitIVsToBytes(dataView, 0x48, this.ivs)
    byteLogic.setFlag(dataView, 0x48, 30, this.isEgg)
    byteLogic.setFlag(dataView, 0x48, 31, this.isNicknamed)
    new Uint8Array(buffer).set(new Uint8Array(this.ribbonBytes.slice(0, 4)), 0x4c)
    byteLogic.setFlag(dataView, 0x4c, 31, this.isFatefulEncounter)
    if (options?.includeExtraFields) {
      dataView.setUint8(0x50, this.statusCondition)
    }

    if (options?.includeExtraFields) {
      dataView.setUint8(0x56, this.currentHP)
    }

    stringLogic.writeGen3StringToBytes(dataView, this.nickname, 0x8, 10, false)
    stringLogic.writeGen3StringToBytes(dataView, this.trainerName, 0x14, 7, true)
    gen3ContestRibbonsToBuffer(dataView, 0x4c, 0, this.ribbons)
    byteLogic.setFlagIndexes(
      dataView,
      0x4c,
      15,
      this.ribbons
        .map((ribbon) => Gen3StandardRibbons.indexOf(ribbon))
        .filter((index) => index > -1 && index < 12)
    )
    byteLogic.setFlag(dataView, 0x46, 15, this.trainerGender)
    dataView.setUint16(0x1c, this.checksum, true)
    dataView.setUint8(0x13, getGen3MiscFlags(this))
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

  calcChecksum(): number {
    return encryption.get16BitChecksumLittleEndian(this.toBytes(), 0x20, 0x50)
  }

  public refreshChecksum() {
    this.checksum = this.calcChecksum()
  }

  public toPCBytes() {
    const shuffledBytes = encryption.shuffleBlocksGen3(this.toBytes())

    return encryption.decryptByteArrayGen3(shuffledBytes)
  }

  public getLevel() {
    return getLevelGen3Onward(this.dexNum, this.exp)
  }

  // Checks to see if Pokemon is Valid and Real
  public isValid(): boolean {
    if (this.calcChecksum() !== this.checksum) {
      return false
    }

    return this.dexNum > 0 && this.dexNum <= NationalDex.Deoxys
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

export default PK3

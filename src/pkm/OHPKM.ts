import { Languages, ItemToString, AbilityToString, NatureToString } from 'pokemon-resources'
import * as byteLogic from '../util/byteLogic'
import * as stringLogic from '../util/stringConversion'
import * as types from '../util/types'
import { AllPKMFields } from '../util/pkmInterface'

export class OHPKM {
  format: 'OHPKM' = 'OHPKM'
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
  isAlpha: boolean
  isNoble: boolean
  isShadow: boolean
  markings: types.MarkingsSixShapesWithColor
  alphaMove: number
  personalityValue: number
  nature: number
  statNature: number
  flag2LA: boolean
  gender: number
  formeNum: number
  formNum: number
  evs: types.Stats
  contest: types.ContestStats
  pokerusByte: number
  contestMemoryCount: number
  battleMemoryCount: number
  sociability: number
  height: number
  weight: number
  scale: number
  moves: number[]
  movePP: number[]
  nickname: string
  movePPUps: number[]
  relearnMoves: number[]
  ivs: types.Stats
  isEgg: boolean
  isNicknamed: boolean
  dynamaxLevel: number
  teraTypeOriginal: number
  teraTypeOverride: number
  unknownA0: number
  gvs: types.Stats
  handlerName: string
  handlerLanguage: number
  resortEventStatus: number
  handlerID: number
  handlerFriendship: number
  handlerAffection: number
  superTrainingFlags: number
  superTrainingDistFlags: number
  secretSuperTrainingUnlocked: boolean
  secretSuperTrainingComplete: boolean
  trainingBagHits: number
  trainingBag: number
  palma: number
  pokeStarFame: number
  metTimeOfDay: number
  handlerGender: boolean
  isNsPokemon: boolean
  shinyLeaves: number
  fullness: number
  enjoyment: number
  gameOfOrigin: number
  gameOfOriginBattle: number
  country: number
  region: number
  consoleRegion: number
  languageIndex: number
  unknownF3: number
  formArgument: number
  affixedRibbon: number
  geolocations: types.Geolocation[]
  encounterType: number
  performance: number
  trainerName: string
  trainerFriendship: number
  trainerAffection: number
  eggDate: types.PKMDate | undefined
  metDate: types.PKMDate | undefined
  ball: number
  eggLocationIndex: number
  metLocationIndex: number
  metLevel: number
  obedienceLevel: number
  homeTracker: ArrayBuffer
  trFlagsSwSh: ArrayBuffer
  tmFlagsBDSP: ArrayBuffer
  moveFlagsLA: ArrayBuffer
  tutorFlagsLA: ArrayBuffer
  masterFlagsLA: ArrayBuffer
  tmFlagsSV: ArrayBuffer
  tmFlagsSVDLC: ArrayBuffer
  isFatefulEncounter: boolean

  constructor(arg: ArrayBuffer | AllPKMFields) {
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
      this.isAlpha = byteLogic.getFlag(dataView, 0x16, 5)
      this.isNoble = byteLogic.getFlag(dataView, 0x16, 6)
      this.isShadow = byteLogic.getFlag(dataView, 0x16, 7)
      this.markings = types.markingsSixShapesWithColorFromBytes(dataView, 0x18)
      this.alphaMove = dataView.getUint16(0x1a, true)
      this.personalityValue = dataView.getUint32(0x1c, true)
      this.nature = dataView.getUint8(0x20)
      this.statNature = dataView.getUint8(0x21)
      this.flag2LA = byteLogic.getFlag(dataView, 0x22, 1)
      this.gender = dataView.getUint8(0x22)
      this.formeNum = dataView.getUint16(0x24, true)
      this.formNum = dataView.getUint16(0x24, true)
      this.evs = types.readStatsFromBytes(dataView, 0x26)
      this.contest = types.readContestStatsFromBytes(dataView, 0x2c)
      this.pokerusByte = dataView.getUint8(0x32)
      this.contestMemoryCount = dataView.getUint8(0x34)
      this.battleMemoryCount = dataView.getUint8(0x35)
      this.sociability = dataView.getUint32(0x4c, true)
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
      this.ivs = types.readStatsFromBytes(dataView, 0x94)
      this.isEgg = byteLogic.getFlag(dataView, 0x94, 30)
      this.isNicknamed = byteLogic.getFlag(dataView, 0x94, 31)
      this.dynamaxLevel = dataView.getUint8(0x98)
      this.teraTypeOriginal = dataView.getUint8(0x99)
      this.teraTypeOverride = dataView.getUint8(0x9a)
      this.unknownA0 = dataView.getUint32(0xa0, true)
      this.gvs = types.readStatsFromBytes(dataView, 0xa4)
      this.handlerName = stringLogic.utf16BytesToString(buffer, 0xb8, 12)
      this.handlerLanguage = dataView.getUint8(0xd3)
      this.resortEventStatus = dataView.getUint8(0xd5)
      this.handlerID = dataView.getUint16(0xd6, true)
      this.handlerFriendship = dataView.getUint8(0xd8)
      this.handlerAffection = dataView.getUint8(0xde)
      this.superTrainingFlags = dataView.getUint32(0xdf, true)
      this.superTrainingDistFlags = dataView.getUint8(0xe3)
      this.secretSuperTrainingUnlocked = byteLogic.getFlag(dataView, 0xe4, 0)
      this.secretSuperTrainingComplete = byteLogic.getFlag(dataView, 0xe4, 1)
      this.trainingBagHits = dataView.getUint8(0xe5)
      this.trainingBag = dataView.getUint8(0xe6)
      this.palma = dataView.getUint32(0xe7, true)
      this.pokeStarFame = dataView.getUint8(0xe8)
      this.metTimeOfDay = dataView.getUint8(0xe9)
      this.handlerGender = byteLogic.getFlag(dataView, 0xea, 7)
      this.isNsPokemon = byteLogic.getFlag(dataView, 0xea, 6)
      this.shinyLeaves = dataView.getUint8(0xea)
      this.fullness = dataView.getUint8(0xeb)
      this.enjoyment = dataView.getUint8(0xec)
      this.gameOfOrigin = dataView.getUint8(0xed)
      this.gameOfOriginBattle = dataView.getUint8(0xee)
      this.country = dataView.getUint8(0xef)
      this.region = dataView.getUint8(0xf0)
      this.consoleRegion = dataView.getUint8(0xf0)
      this.languageIndex = dataView.getUint8(0xf2)
      this.unknownF3 = dataView.getUint8(0xf3)
      this.formArgument = dataView.getUint32(0xf4, true)
      this.affixedRibbon = dataView.getUint8(0xf8)
      this.geolocations = [
        types.readGeolocationFromBytes(dataView, 0xf9),
        types.readGeolocationFromBytes(dataView, 0xfb),
        types.readGeolocationFromBytes(dataView, 0xfd),
        types.readGeolocationFromBytes(dataView, 0xff),
        types.readGeolocationFromBytes(dataView, 0x101),
      ]
      this.encounterType = dataView.getUint8(0x10e)
      this.performance = dataView.getUint8(0x10f)
      this.trainerName = stringLogic.utf16BytesToString(buffer, 0x110, 12)
      this.trainerFriendship = dataView.getUint8(0x12a)
      this.trainerAffection = dataView.getUint8(0x130)
      this.eggDate = types.pkmDateFromBytes(dataView, 0x131)
      this.metDate = types.pkmDateFromBytes(dataView, 0x134)
      this.ball = dataView.getUint8(0x137)
      this.eggLocationIndex = dataView.getUint16(0x138, true)
      this.metLocationIndex = dataView.getUint16(0x13a, true)
      this.metLevel = dataView.getUint8(0x13c)
      this.obedienceLevel = dataView.getUint8(0x13e)
      this.homeTracker = new Uint8Array(buffer).slice(0x13f, 0x147)
      this.trFlagsSwSh = new Uint8Array(buffer).slice(0x146, 0x154)
      this.tmFlagsBDSP = new Uint8Array(buffer).slice(0x154, 0x162)
      this.moveFlagsLA = new Uint8Array(buffer).slice(0x162, 0x170)
      this.tutorFlagsLA = new Uint8Array(buffer).slice(0x170, 0x178)
      this.masterFlagsLA = new Uint8Array(buffer).slice(0x178, 0x180)
      this.tmFlagsSV = new Uint8Array(buffer).slice(0x180, 0x196)
      this.tmFlagsSVDLC = new Uint8Array(buffer).slice(0x1a4, 0x1b1)
      this.isFatefulEncounter = byteLogic.getFlag(dataView, 0x22, 0)
    } else {
      const other = arg
      this.encryptionConstant = other.encryptionConstant ?? 0
      this.sanity = other.sanity ?? 0
      this.checksum = other.checksum ?? 0
      this.dexNum = other.dexNum
      this.heldItemIndex = other.heldItemIndex
      this.trainerID = other.trainerID
      this.secretID = other.secretID
      this.exp = other.exp
      this.abilityIndex = other.abilityIndex ?? 0
      this.abilityNum = other.abilityNum ?? 0
      this.favorite = other.favorite ?? false
      this.canGigantamax = other.canGigantamax ?? false
      this.isAlpha = other.isAlpha ?? false
      this.isNoble = other.isNoble ?? false
      this.isShadow = other.isShadow ?? false
      this.markings = types.markingsSixShapesWithColorFromOther(other.markings)
      this.alphaMove = other.alphaMove ?? 0
      this.personalityValue = other.personalityValue ?? 0
      this.nature = other.nature ?? 0
      this.statNature = other.statNature ?? 0
      this.flag2LA = other.flag2LA ?? false
      this.gender = other.gender ?? 0
      this.formeNum = other.formeNum
      this.formNum = other.formNum ?? 0
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
      this.contestMemoryCount = other.contestMemoryCount ?? 0
      this.battleMemoryCount = other.battleMemoryCount ?? 0
      this.sociability = other.sociability ?? 0
      this.height = other.height ?? 0
      this.weight = other.weight ?? 0
      this.scale = other.scale ?? 0
      this.moves = other.moves
      this.movePP = other.movePP
      this.nickname = other.nickname
      this.movePPUps = other.movePPUps
      this.relearnMoves = other.relearnMoves ?? [0, 0, 0, 0]
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
      this.teraTypeOriginal = other.teraTypeOriginal ?? 0
      this.teraTypeOverride = other.teraTypeOverride ?? 0
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
      this.handlerLanguage = other.handlerLanguage ?? 0
      this.resortEventStatus = other.resortEventStatus ?? 0
      this.handlerID = other.handlerID ?? 0
      this.handlerFriendship = other.handlerFriendship ?? 0
      this.handlerAffection = other.handlerAffection ?? 0
      this.superTrainingFlags = other.superTrainingFlags ?? 0
      this.superTrainingDistFlags = other.superTrainingDistFlags ?? 0
      this.secretSuperTrainingUnlocked = other.secretSuperTrainingUnlocked ?? false
      this.secretSuperTrainingComplete = other.secretSuperTrainingComplete ?? false
      this.trainingBagHits = other.trainingBagHits ?? 0
      this.trainingBag = other.trainingBag ?? 0
      this.palma = other.palma ?? 0
      this.pokeStarFame = other.pokeStarFame ?? 0
      this.metTimeOfDay = other.metTimeOfDay ?? 0
      this.handlerGender = other.handlerGender ?? false
      this.isNsPokemon = other.isNsPokemon ?? false
      this.shinyLeaves = other.shinyLeaves ?? 0
      this.fullness = other.fullness ?? 0
      this.enjoyment = other.enjoyment ?? 0
      this.gameOfOrigin = other.gameOfOrigin ?? 0
      this.gameOfOriginBattle = other.gameOfOriginBattle ?? 0
      this.country = other.country ?? 0
      this.region = other.region ?? 0
      this.consoleRegion = other.consoleRegion ?? 0
      this.languageIndex = other.languageIndex ?? 0
      this.unknownF3 = other.unknownF3 ?? 0
      this.formArgument = other.formArgument ?? 0
      this.affixedRibbon = other.affixedRibbon ?? 0
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
      this.encounterType = other.encounterType ?? 0
      this.performance = other.performance ?? 0
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
      this.ball = other.ball ?? 0
      this.eggLocationIndex = other.eggLocationIndex ?? 0
      this.metLocationIndex = other.metLocationIndex ?? 0
      this.metLevel = other.metLevel ?? 0
      this.obedienceLevel = other.obedienceLevel ?? 0
      this.homeTracker = other.homeTracker ?? new ArrayBuffer(8)
      this.trFlagsSwSh = other.trFlagsSwSh ?? new ArrayBuffer(14)
      this.tmFlagsBDSP = other.tmFlagsBDSP ?? new ArrayBuffer(14)
      this.moveFlagsLA = other.moveFlagsLA ?? new ArrayBuffer(14)
      this.tutorFlagsLA = other.tutorFlagsLA ?? new ArrayBuffer(8)
      this.masterFlagsLA = other.masterFlagsLA ?? new ArrayBuffer(8)
      this.tmFlagsSV = other.tmFlagsSV ?? new ArrayBuffer(22)
      this.tmFlagsSVDLC = other.tmFlagsSVDLC ?? new ArrayBuffer(13)
      this.isFatefulEncounter = other.isFatefulEncounter ?? false
    }
  }

  static fromBytes(buffer: ArrayBufferLike): OHPKM {
    return new OHPKM(buffer)
  }

  toBytes(): ArrayBuffer {
    const buffer = new ArrayBuffer(433)
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
    byteLogic.setFlag(dataView, 0x16, 5, this.isAlpha)
    byteLogic.setFlag(dataView, 0x16, 6, this.isNoble)
    byteLogic.setFlag(dataView, 0x16, 7, this.isShadow)
    types.markingsSixShapesWithColorToBytes(dataView, 0x18, this.markings)
    dataView.setUint16(0x1a, this.alphaMove, true)
    dataView.setUint32(0x1c, this.personalityValue, true)
    dataView.setUint8(0x20, this.nature)
    dataView.setUint8(0x21, this.statNature)
    byteLogic.setFlag(dataView, 0x22, 1, this.flag2LA)
    dataView.setUint8(0x22, this.gender)
    dataView.setUint16(0x24, this.formeNum, true)
    dataView.setUint16(0x24, this.formNum, true)
    types.writeStatsToBytes(dataView, 0x26, this.evs)
    types.writeContestStatsToBytes(dataView, 0x2c, this.contest)
    dataView.setUint8(0x32, this.pokerusByte)
    dataView.setUint8(0x34, this.contestMemoryCount)
    dataView.setUint8(0x35, this.battleMemoryCount)
    dataView.setUint32(0x4c, this.sociability, true)
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
    types.writeStatsToBytes(dataView, 0x94, this.ivs)
    byteLogic.setFlag(dataView, 0x94, 30, this.isEgg)
    byteLogic.setFlag(dataView, 0x94, 31, this.isNicknamed)
    dataView.setUint8(0x98, this.dynamaxLevel)
    dataView.setUint8(0x99, this.teraTypeOriginal)
    dataView.setUint8(0x9a, this.teraTypeOverride)
    dataView.setUint32(0xa0, this.unknownA0, true)
    types.writeStatsToBytes(dataView, 0xa4, this.gvs)
    stringLogic.writeUTF16StringToBytes(dataView, this.handlerName, 0xb8, 12)
    dataView.setUint8(0xd3, this.handlerLanguage)
    dataView.setUint8(0xd5, this.resortEventStatus)
    dataView.setUint16(0xd6, this.handlerID, true)
    dataView.setUint8(0xd8, this.handlerFriendship)
    dataView.setUint8(0xde, this.handlerAffection)
    dataView.setUint32(0xdf, this.superTrainingFlags, true)
    dataView.setUint8(0xe3, this.superTrainingDistFlags)
    byteLogic.setFlag(dataView, 0xe4, 0, this.secretSuperTrainingUnlocked)
    byteLogic.setFlag(dataView, 0xe4, 1, this.secretSuperTrainingComplete)
    dataView.setUint8(0xe5, this.trainingBagHits)
    dataView.setUint8(0xe6, this.trainingBag)
    dataView.setUint32(0xe7, this.palma, true)
    dataView.setUint8(0xe8, this.pokeStarFame)
    dataView.setUint8(0xe9, this.metTimeOfDay)
    byteLogic.setFlag(dataView, 0xea, 7, this.handlerGender)
    byteLogic.setFlag(dataView, 0xea, 6, this.isNsPokemon)
    dataView.setUint8(0xea, this.shinyLeaves)
    dataView.setUint8(0xeb, this.fullness)
    dataView.setUint8(0xec, this.enjoyment)
    dataView.setUint8(0xed, this.gameOfOrigin)
    dataView.setUint8(0xee, this.gameOfOriginBattle)
    dataView.setUint8(0xef, this.country)
    dataView.setUint8(0xf0, this.region)
    dataView.setUint8(0xf0, this.consoleRegion)
    dataView.setUint8(0xf2, this.languageIndex)
    dataView.setUint8(0xf3, this.unknownF3)
    dataView.setUint32(0xf4, this.formArgument, true)
    dataView.setUint8(0xf8, this.affixedRibbon)
    for (let i = 0; i < 5; i++) {
      types.writeGeolocationToBytes(dataView, 0xf9 + 2 * i, this.geolocations[i])
    }
    dataView.setUint8(0x10e, this.encounterType)
    dataView.setUint8(0x10f, this.performance)
    stringLogic.writeUTF16StringToBytes(dataView, this.trainerName, 0x110, 12)
    dataView.setUint8(0x12a, this.trainerFriendship)
    dataView.setUint8(0x130, this.trainerAffection)
    types.writePKMDateToBytes(dataView, 0x131, this.eggDate)
    types.writePKMDateToBytes(dataView, 0x134, this.metDate)
    dataView.setUint8(0x137, this.ball)
    dataView.setUint16(0x138, this.eggLocationIndex, true)
    dataView.setUint16(0x13a, this.metLocationIndex, true)
    dataView.setUint8(0x13c, this.metLevel)
    dataView.setUint8(0x13e, this.obedienceLevel)
    new Uint8Array(buffer).set(new Uint8Array(this.homeTracker.slice(0, 8)), 0x13f)
    new Uint8Array(buffer).set(new Uint8Array(this.trFlagsSwSh.slice(0, 14)), 0x146)
    new Uint8Array(buffer).set(new Uint8Array(this.tmFlagsBDSP.slice(0, 14)), 0x154)
    new Uint8Array(buffer).set(new Uint8Array(this.moveFlagsLA.slice(0, 14)), 0x162)
    new Uint8Array(buffer).set(new Uint8Array(this.tutorFlagsLA.slice(0, 8)), 0x170)
    new Uint8Array(buffer).set(new Uint8Array(this.masterFlagsLA.slice(0, 8)), 0x178)
    new Uint8Array(buffer).set(new Uint8Array(this.tmFlagsSV.slice(0, 22)), 0x180)
    new Uint8Array(buffer).set(new Uint8Array(this.tmFlagsSVDLC.slice(0, 13)), 0x1a4)
    byteLogic.setFlag(dataView, 0x22, 0, this.isFatefulEncounter)
    return buffer
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

  public get trainerGender() {
    return false
  }

  public get natureName() {
    return NatureToString(this.nature)
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
    return 0
  }
}

export default OHPKM

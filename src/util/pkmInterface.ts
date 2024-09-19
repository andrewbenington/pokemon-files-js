// This file was generated by make generate
import * as types from './types'

export interface AllPKMFields {
  format: string
  trainerFriendship?: number
  sanity?: number
  geolocations?: types.Geolocation[]
  gvs?: types.Stats
  contest?: types.ContestStats
  secretSuperTrainingComplete?: boolean
  handlerGender?: boolean
  weight?: number
  dynamaxLevel?: number
  ivs?: types.Stats
  nature?: number
  trainerMemory?: types.Memory
  fieldEventFatigue1?: number
  obedienceLevel?: number
  shadowID?: number
  unknownF3?: number
  masterFlagsLA?: ArrayBuffer
  type2?: number
  trainerGender: boolean
  trainingBag?: number
  fullness?: number
  statNature?: number
  handlerName?: string
  sociability?: number
  evsG12?: types.StatsPreSplit
  trainerName: string
  nickname: string
  abilityIndex?: number
  superTrainingFlags?: number
  isNsPokemon?: boolean
  teraTypeOriginal?: number
  moves: number[]
  eggDate?: types.PKMDate | undefined
  hyperTraining?: types.HyperTrainStats
  handlerLanguage?: number
  consoleRegion?: number
  isAlpha?: boolean
  trainerID: number
  shinyLeaves?: number
  abilityNum?: number
  handlerAffection?: number
  country?: number
  region?: number
  canGigantamax?: boolean
  flag2LA?: boolean
  languageIndex: number
  currentHP: number
  avs?: types.Stats
  tmFlagsSV?: ArrayBuffer
  encryptionConstant?: number
  trFlagsSwSh?: ArrayBuffer
  isNoble?: boolean
  movePPUps: number[]
  metTimeOfDay?: number
  isEgg?: boolean
  superTrainingDistFlags?: number
  gameOfOriginBattle?: number
  dvs?: types.StatsPreSplit
  markings?:
    | types.MarkingsFourShapes
    | types.MarkingsSixShapesNoColor
    | types.MarkingsSixShapesWithColor
  encounterType?: number
  handlerFriendship?: number
  isFatefulEncounter?: boolean
  ribbons?: string[]
  unknownA0?: number
  secretID: number
  evs?: types.Stats
  relearnMoves?: number[]
  statusCondition?: number
  secretSuperTrainingUnlocked?: boolean
  favorite?: boolean
  handlerID?: number
  ball?: number
  isNicknamed?: boolean
  formeNum: number
  battleMemoryCount?: number
  palma?: number
  pokerusByte?: number
  trainerAffection?: number
  alphaMove?: number
  tmFlagsBDSP?: ArrayBuffer
  statLevel?: number
  trainingBagHits?: number
  isCurrentHandler?: boolean
  affixedRibbon?: number
  heldItemIndex: number
  moveFlagsLA?: ArrayBuffer
  metDate?: types.PKMDate | undefined
  eggLocationIndex?: number
  contestMemoryCount?: number
  handlerMemory?: types.Memory
  height?: number
  personalityValue?: number
  level?: number
  enjoyment?: number
  movePP: number[]
  metLocationIndex?: number
  formArgument?: number
  resortEventStatus?: number
  tmFlagsSVDLC?: ArrayBuffer
  ribbonBytes?: ArrayBuffer
  performance?: number
  teraTypeOverride?: number
  gender?: number
  pokeStarFame?: number
  fieldEventFatigue2?: number
  scale?: number
  gameOfOrigin: number
  exp: number
  metLocationIndexPtHGSS?: number
  tutorFlagsLA?: ArrayBuffer
  homeTracker?: ArrayBuffer
  dexNum: number
  type1?: number
  metLevel?: number
  checksum?: number
  shadowGauge?: number
  heldItemName: string
  language: string
  getLevel: () => number
  isShiny: () => boolean
  isSquareShiny: () => boolean
  toBytes: () => ArrayBuffer
}

// This file was generated by make generate
import * as types from './types'

export interface AllPKMFields {
  format: string
  abilityIndex?: number
  abilityNum?: number
  affixedRibbon?: number
  alphaMove?: number
  avs?: types.Stats
  ball?: number
  ballDPPt?: number
  ballHGSS?: number
  battleMemoryCount?: number
  canGigantamax?: boolean
  checksum?: number
  consoleRegion?: number
  contest?: types.ContestStats
  contestMemoryCount?: number
  country?: number
  currentHP: number
  dexNum: number
  dvs?: types.StatsPreSplit
  dynamaxLevel?: number
  eggDate?: types.PKMDate | undefined
  eggLocationIndex?: number
  eggLocationIndexDP?: number
  eggLocationIndexPtHGSS?: number
  encounterType?: number
  encryptionConstant?: number
  enjoyment?: number
  evs?: types.Stats
  evsG12?: types.StatsPreSplit
  exp: number
  favorite?: boolean
  fieldEventFatigue1?: number
  fieldEventFatigue2?: number
  flag2LA?: boolean
  formArgument?: number
  formeNum: number
  fullness?: number
  gameOfOrigin: number
  gameOfOriginBattle?: number
  gender?: number
  geolocations?: types.Geolocation[]
  gvs?: types.Stats
  handlerAffection?: number
  handlerFriendship?: number
  handlerGender?: boolean
  handlerID?: number
  handlerLanguage?: number
  handlerMemory?: types.Memory
  handlerName?: string
  height?: number
  heldItemIndex: number
  homeTracker?: ArrayBuffer
  hyperTraining?: types.HyperTrainStats
  isAlpha?: boolean
  isCurrentHandler?: boolean
  isEgg?: boolean
  isFatefulEncounter?: boolean
  isNicknamed?: boolean
  isNoble?: boolean
  isNsPokemon?: boolean
  ivs?: types.Stats
  languageIndex: number
  level?: number
  markings?:
    | types.MarkingsFourShapes
    | types.MarkingsSixShapesNoColor
    | types.MarkingsSixShapesWithColor
  masterFlagsLA?: ArrayBuffer
  metDate?: types.PKMDate | undefined
  metLevel?: number
  metLocationIndex?: number
  metLocationIndexDP?: number
  metLocationIndexPtHGSS?: number
  metTimeOfDay?: number
  moveFlagsLA?: ArrayBuffer
  movePP: number[]
  movePPUps: number[]
  moves: number[]
  nature?: number
  nickname: string
  obedienceLevel?: number
  palma?: number
  performance?: number
  personalityValue?: number
  pokeStarFame?: number
  pokerusByte?: number
  region?: number
  relearnMoves?: number[]
  resortEventStatus?: number
  ribbonBytes?: ArrayBuffer
  ribbons?: string[]
  sanity?: number
  scale?: number
  secretID: number
  secretSuperTrainingComplete?: boolean
  secretSuperTrainingUnlocked?: boolean
  shadowGauge?: number
  shadowID?: number
  shinyLeaves?: number
  sociability?: number
  statLevel?: number
  statNature?: number
  statusCondition?: number
  superTrainingDistFlags?: number
  superTrainingFlags?: number
  teraTypeOriginal?: number
  teraTypeOverride?: number
  tmFlagsBDSP?: ArrayBuffer
  tmFlagsSV?: ArrayBuffer
  tmFlagsSVDLC?: ArrayBuffer
  trFlagsSwSh?: ArrayBuffer
  trainerAffection?: number
  trainerFriendship?: number
  trainerGender: boolean
  trainerID: number
  trainerMemory?: types.Memory
  trainerName: string
  trainingBag?: number
  trainingBagHits?: number
  tutorFlagsLA?: ArrayBuffer
  type1?: number
  type2?: number
  unknownA0?: number
  unknownF3?: number
  weight?: number
  heldItemName: string
  language: string
  getLevel: () => number
  isShiny: () => boolean
  isSquareShiny: () => boolean
  toBytes: () => ArrayBuffer
  isShadow?: boolean
  formNum?: number
}

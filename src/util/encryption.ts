const GEN3_BLOCKS_OFFSET = 0x20
const GEN3_BLOCK_SIZE = 12
const GEN456_BLOCKS_OFFSET = 0x08
const GEN45_BLOCK_SIZE = 0x20
const GEN67_BLOCK_SIZE = 0x38
const GEN8_BLOCK_SIZE = 0x50
const GEN8_ENCRYPTED_SIZE = 8 + 4 * GEN8_BLOCK_SIZE
const GEN8A_BLOCK_SIZE = 0x58
const GEN8A_ENCRYPTED_SIZE = 8 + 4 * GEN8A_BLOCK_SIZE

const shuffleBlockOrders = [
  [0, 1, 2, 3],
  [0, 1, 3, 2],
  [0, 2, 1, 3],
  [0, 2, 3, 1],
  [0, 3, 1, 2],
  [0, 3, 2, 1],

  [1, 0, 2, 3],
  [1, 0, 3, 2],
  [1, 2, 0, 3],
  [1, 2, 3, 0],
  [1, 3, 0, 2],
  [1, 3, 2, 0],

  [2, 0, 1, 3],
  [2, 0, 3, 1],
  [2, 1, 0, 3],
  [2, 1, 3, 0],
  [2, 3, 0, 1],
  [2, 3, 1, 0],

  [3, 0, 1, 2],
  [3, 0, 2, 1],
  [3, 1, 0, 2],
  [3, 1, 2, 0],
  [3, 2, 0, 1],
  [3, 2, 1, 0],
]

const unshuffleBlockOrders = [
  [0, 1, 2, 3],
  [0, 1, 3, 2],
  [0, 2, 1, 3],
  [0, 3, 1, 2],
  [0, 2, 3, 1],
  [0, 3, 2, 1],

  [1, 0, 2, 3],
  [1, 0, 3, 2],
  [2, 0, 1, 3],
  [3, 0, 1, 2],
  [2, 0, 3, 1],
  [3, 0, 2, 1],

  [1, 2, 0, 3],
  [1, 3, 0, 2],
  [2, 1, 0, 3],
  [3, 1, 0, 2],
  [2, 3, 0, 1],
  [3, 2, 0, 1],

  [1, 2, 3, 0],
  [1, 3, 2, 0],
  [2, 1, 3, 0],
  [3, 1, 2, 0],
  [2, 3, 1, 0],
  [3, 2, 1, 0],
]

export const unshuffleBlocks = (
  bytes: ArrayBuffer,
  shiftValue: number,
  blockSize: number,
  startIndex: number
) => {
  const unshuffledBytes = new Uint8Array(bytes)
  const blockOrder = unshuffleBlockOrders[shiftValue]
  const growthBlock = unshuffledBytes.slice(
    startIndex + blockOrder[0] * blockSize,
    startIndex + (blockOrder[0] + 1) * blockSize
  )
  const attackBlock = unshuffledBytes.slice(
    startIndex + blockOrder[1] * blockSize,
    startIndex + (blockOrder[1] + 1) * blockSize
  )
  const statsBlock = unshuffledBytes.slice(
    startIndex + blockOrder[2] * blockSize,
    startIndex + (blockOrder[2] + 1) * blockSize
  )
  const miscBlock = unshuffledBytes.slice(
    startIndex + blockOrder[3] * blockSize,
    startIndex + (blockOrder[3] + 1) * blockSize
  )

  unshuffledBytes.set(growthBlock, startIndex)
  unshuffledBytes.set(attackBlock, startIndex + blockSize)
  unshuffledBytes.set(statsBlock, startIndex + 2 * blockSize)
  unshuffledBytes.set(miscBlock, startIndex + 3 * blockSize)
  return unshuffledBytes.buffer
}

export const shuffleBlocks = (
  bytes: ArrayBuffer,
  shiftValue: number,
  blockSize: number,
  startIndex: number
) => {
  const unshuffledBytes = new Uint8Array(bytes)
  const blockOrder = shuffleBlockOrders[shiftValue]
  const firstBlock = unshuffledBytes.slice(
    startIndex + blockOrder[0] * blockSize,
    startIndex + (blockOrder[0] + 1) * blockSize
  )
  const secondBlock = unshuffledBytes.slice(
    startIndex + blockOrder[1] * blockSize,
    startIndex + (blockOrder[1] + 1) * blockSize
  )
  const thirdBlock = unshuffledBytes.slice(
    startIndex + blockOrder[2] * blockSize,
    startIndex + (blockOrder[2] + 1) * blockSize
  )
  const fourthBlock = unshuffledBytes.slice(
    startIndex + blockOrder[3] * blockSize,
    startIndex + (blockOrder[3] + 1) * blockSize
  )

  unshuffledBytes.set(firstBlock, startIndex)
  unshuffledBytes.set(secondBlock, startIndex + blockSize)
  unshuffledBytes.set(thirdBlock, startIndex + 2 * blockSize)
  unshuffledBytes.set(fourthBlock, startIndex + 3 * blockSize)
  return unshuffledBytes.buffer
}

export const shuffleBlocksGen3 = (bytes: ArrayBuffer) => {
  const personalityValue = new DataView(bytes).getUint32(0x00, true)
  const shiftValue = personalityValue % 24

  return shuffleBlocks(bytes, shiftValue, GEN3_BLOCK_SIZE, GEN3_BLOCKS_OFFSET)
}

export const unshuffleBlocksGen3 = (bytes: ArrayBuffer) => {
  const personalityValue = new DataView(bytes).getUint32(0, true)
  const shiftValue = personalityValue % 24

  return unshuffleBlocks(bytes, shiftValue, GEN3_BLOCK_SIZE, GEN3_BLOCKS_OFFSET)
}

export const decryptByteArrayGen3 = (bytes: ArrayBuffer) => {
  const encryptedDV = new DataView(bytes)
  const unencryptedDV = new DataView(bytes)
  const encryptionKey = encryptedDV.getUint32(0x00, true) ^ encryptedDV.getUint32(0x04, true)

  for (let i = GEN3_BLOCKS_OFFSET; i < GEN3_BLOCKS_OFFSET + 4 * GEN3_BLOCK_SIZE; i += 4) {
    const value = encryptedDV.getUint32(i, true) ^ encryptionKey

    unencryptedDV.setUint32(i, value, true)
  }

  return unencryptedDV.buffer
}

export const shuffleBlocksGen45 = (bytes: ArrayBuffer) => {
  const personalityValue = new DataView(bytes).getUint32(0x00, true)
  const shiftValue = ((personalityValue & 0x3e000) >> 0xd) % 24

  return shuffleBlocks(bytes, shiftValue, GEN45_BLOCK_SIZE, GEN456_BLOCKS_OFFSET)
}

export const unshuffleBlocksGen45 = (bytes: ArrayBuffer) => {
  const personalityValue = new DataView(bytes).getUint32(0x00, true)
  const shiftValue = ((personalityValue & 0x3e000) >> 0xd) % 24

  return unshuffleBlocks(bytes, shiftValue, GEN45_BLOCK_SIZE, GEN456_BLOCKS_OFFSET)
}

const ENCRYPTION_OFFSET = 8
const decryptByteArray = (bytes: ArrayBuffer, seed: number, blockSize: number) => {
  return decryptArray(bytes, seed, ENCRYPTION_OFFSET, ENCRYPTION_OFFSET + 4 * blockSize)
}

const decryptArray = (bytes: ArrayBuffer, seed: number, start: number, end: number) => {
  const unencryptedBytes = new Uint8Array(bytes)
  const dataView = new DataView(bytes)
  const newDataView = new DataView(bytes)

  for (let i = start; i < end; i += 2) {
    const bigIntSeed = BigInt(0x41c64e6d) * BigInt(seed) + BigInt(0x6073)

    seed = Number(bigIntSeed & BigInt(0xffffffff))
    const xorValue = (seed >> 16) & 0xffff
    const unencryptedWord = dataView.getUint16(i, true) ^ xorValue

    newDataView.setUint16(i, unencryptedWord, true)
  }

  return unencryptedBytes.buffer
}

export const decryptByteArrayGen45 = (bytes: ArrayBuffer) => {
  const checksum = new DataView(bytes).getUint16(0x06, true)

  return decryptByteArray(bytes, checksum, GEN45_BLOCK_SIZE)
}

export const shuffleBlocksGen67 = (bytes: ArrayBuffer) => {
  const encryptionConstant = new DataView(bytes).getUint32(0x00, true)
  const shiftValue = ((encryptionConstant & 0x3e000) >> 0xd) % 24

  return shuffleBlocks(bytes, shiftValue, GEN67_BLOCK_SIZE, GEN456_BLOCKS_OFFSET)
}

export const unshuffleBlocksGen67 = (bytes: ArrayBuffer) => {
  const encryptionConstant = new DataView(bytes).getUint32(0x00, true)
  const shiftValue = ((encryptionConstant & 0x3e000) >> 0xd) % 24

  return unshuffleBlocks(bytes, shiftValue, GEN67_BLOCK_SIZE, GEN456_BLOCKS_OFFSET)
}

export const shuffleBlocksGen89 = (bytes: ArrayBuffer) => {
  const encryptionConstant = new DataView(bytes).getUint32(0x00, true)
  const shiftValue = ((encryptionConstant & 0x3e000) >> 0xd) % 24

  return shuffleBlocks(bytes, shiftValue, GEN8_BLOCK_SIZE, GEN456_BLOCKS_OFFSET)
}

export const unshuffleBlocksGen89 = (bytes: ArrayBuffer) => {
  const encryptionConstant = new DataView(bytes).getUint32(0x00, true)
  const shiftValue = ((encryptionConstant & 0x3e000) >> 0xd) % 24

  return unshuffleBlocks(bytes, shiftValue, GEN8_BLOCK_SIZE, GEN456_BLOCKS_OFFSET)
}

export const shuffleBlocksGen8A = (bytes: ArrayBuffer) => {
  const encryptionConstant = new DataView(bytes).getUint32(0x00, true)
  const shiftValue = ((encryptionConstant & 0x3e000) >> 0xd) % 24

  return shuffleBlocks(bytes, shiftValue, GEN8A_BLOCK_SIZE, GEN456_BLOCKS_OFFSET)
}

export const unshuffleBlocksGen8A = (bytes: ArrayBuffer) => {
  const encryptionConstant = new DataView(bytes).getUint32(0x00, true)
  const shiftValue = ((encryptionConstant & 0x3e000) >> 0xd) % 24

  return unshuffleBlocks(bytes, shiftValue, GEN8A_BLOCK_SIZE, GEN456_BLOCKS_OFFSET)
}

export const decryptByteArrayGen67 = (bytes: ArrayBuffer) => {
  const encryptionConstant = new DataView(bytes).getUint32(0x00, true)

  return decryptByteArray(bytes, encryptionConstant, GEN67_BLOCK_SIZE)
}

export function cryptPKM(bytes: ArrayBuffer, boxSize: number) {
  const encryptionConstant = new DataView(bytes).getUint32(0x00, true)
  const boxData = bytes.slice(ENCRYPTION_OFFSET, boxSize)
  const partyData = bytes.slice(boxSize)

  return joinBuffers([
    bytes.slice(0, ENCRYPTION_OFFSET),
    decryptArray(boxData, encryptionConstant, 0, boxData.byteLength),
    decryptArray(partyData, encryptionConstant, 0, partyData.byteLength),
  ])
}

function joinBuffers(buffers: ArrayBuffer[]): ArrayBuffer {
  const size = buffers.reduce((p, n) => (p += n.byteLength), 0)
  const array = new Uint8Array(size)
  let offset = 0

  buffers.forEach((buffer) => {
    array.set(new Uint8Array(buffer), offset)
    offset += buffer.byteLength
  })

  return array.buffer
}

export const decryptByteArrayGen89 = (bytes: ArrayBuffer) => {
  return cryptPKM(bytes, GEN8_ENCRYPTED_SIZE)
  // const encryptionConstant = new DataView(bytes).getUint32(0x00, true)
  // const partyDataBefore = bytes.slice(GEN8_ENCRYPTED_SIZE)
  // const partyDataAfter = decryptArray(
  //   partyDataBefore,
  //   encryptionConstant,
  //   0,
  //   bytes.byteLength - GEN8_ENCRYPTED_SIZE
  // )
  // const decrypted = decryptByteArray(bytes, encryptionConstant, GEN8_BLOCK_SIZE)
  // const decryptedWithParty = new Uint8Array(bytes.byteLength)
  // decryptedWithParty.set(new Uint8Array(decrypted), 0)
  // decryptedWithParty.set(new Uint8Array(partyDataAfter), GEN8_ENCRYPTED_SIZE)
  // return decryptedWithParty.buffer
}

export const decryptByteArrayGen8A = (bytes: ArrayBuffer) => {
  return cryptPKM(bytes, GEN8A_ENCRYPTED_SIZE)
}

export const get16BitChecksumLittleEndian = (bytes: ArrayBuffer, start: number, end: number) => {
  let checksum = 0
  const dataView = new DataView(bytes)

  for (let i = start; i < end; i += 2) {
    checksum = (checksum + dataView.getUint16(i, true)) & 0xffff
  }

  return checksum
}

const SeedTable: number[] = [
  0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7, 0x8108, 0x9129, 0xa14a, 0xb16b,
  0xc18c, 0xd1ad, 0xe1ce, 0xf1ef, 0x1231, 0x0210, 0x3273, 0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6,
  0x9339, 0x8318, 0xb37b, 0xa35a, 0xd3bd, 0xc39c, 0xf3ff, 0xe3de, 0x2462, 0x3443, 0x0420, 0x1401,
  0x64e6, 0x74c7, 0x44a4, 0x5485, 0xa56a, 0xb54b, 0x8528, 0x9509, 0xe5ee, 0xf5cf, 0xc5ac, 0xd58d,
  0x3653, 0x2672, 0x1611, 0x0630, 0x76d7, 0x66f6, 0x5695, 0x46b4, 0xb75b, 0xa77a, 0x9719, 0x8738,
  0xf7df, 0xe7fe, 0xd79d, 0xc7bc, 0x48c4, 0x58e5, 0x6886, 0x78a7, 0x0840, 0x1861, 0x2802, 0x3823,
  0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969, 0xa90a, 0xb92b, 0x5af5, 0x4ad4, 0x7ab7, 0x6a96,
  0x1a71, 0x0a50, 0x3a33, 0x2a12, 0xdbfd, 0xcbdc, 0xfbbf, 0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a,
  0x6ca6, 0x7c87, 0x4ce4, 0x5cc5, 0x2c22, 0x3c03, 0x0c60, 0x1c41, 0xedae, 0xfd8f, 0xcdec, 0xddcd,
  0xad2a, 0xbd0b, 0x8d68, 0x9d49, 0x7e97, 0x6eb6, 0x5ed5, 0x4ef4, 0x3e13, 0x2e32, 0x1e51, 0x0e70,
  0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a, 0x9f59, 0x8f78, 0x9188, 0x81a9, 0xb1ca, 0xa1eb,
  0xd10c, 0xc12d, 0xf14e, 0xe16f, 0x1080, 0x00a1, 0x30c2, 0x20e3, 0x5004, 0x4025, 0x7046, 0x6067,
  0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c, 0xe37f, 0xf35e, 0x02b1, 0x1290, 0x22f3, 0x32d2,
  0x4235, 0x5214, 0x6277, 0x7256, 0xb5ea, 0xa5cb, 0x95a8, 0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d,
  0x34e2, 0x24c3, 0x14a0, 0x0481, 0x7466, 0x6447, 0x5424, 0x4405, 0xa7db, 0xb7fa, 0x8799, 0x97b8,
  0xe75f, 0xf77e, 0xc71d, 0xd73c, 0x26d3, 0x36f2, 0x0691, 0x16b0, 0x6657, 0x7676, 0x4615, 0x5634,
  0xd94c, 0xc96d, 0xf90e, 0xe92f, 0x99c8, 0x89e9, 0xb98a, 0xa9ab, 0x5844, 0x4865, 0x7806, 0x6827,
  0x18c0, 0x08e1, 0x3882, 0x28a3, 0xcb7d, 0xdb5c, 0xeb3f, 0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a,
  0x4a75, 0x5a54, 0x6a37, 0x7a16, 0x0af1, 0x1ad0, 0x2ab3, 0x3a92, 0xfd2e, 0xed0f, 0xdd6c, 0xcd4d,
  0xbdaa, 0xad8b, 0x9de8, 0x8dc9, 0x7c26, 0x6c07, 0x5c64, 0x4c45, 0x3ca2, 0x2c83, 0x1ce0, 0x0cc1,
  0xef1f, 0xff3e, 0xcf5d, 0xdf7c, 0xaf9b, 0xbfba, 0x8fd9, 0x9ff8, 0x6e17, 0x7e36, 0x4e55, 0x5e74,
  0x2e93, 0x3eb2, 0x0ed1, 0x1ef0,
]

export const CRC16_CCITT = (bytes: Uint8Array, start: number, size: number) => {
  let sum = 0xffff

  for (let i = start; i < start + size; i++) {
    sum = ((sum << 8) & 0xffff) ^ SeedTable[bytes[i] ^ ((sum >> 8) & 0xffff)]
  }

  return sum
}

// function toHexString(byteArray: Uint8Array | ArrayBuffer) {
//   if (!(byteArray instanceof Uint8Array)) {
//     byteArray = new Uint8Array(byteArray)
//   }
//   return Array.from(byteArray as Uint8Array, function (byte) {
//     return ('0' + (byte & 0xff).toString(16)).slice(-2)
//   })
//     .join('')
//     .toUpperCase()
// }

import fs from 'fs'
import path from 'path'

import { PB8, PK2, PK4, PK5, PK6, PK7, PK8 } from '../pkm'
// ;(global as any).TextDecoder = TextDecoder

// test('gen 3 stat calculations', () => {
//   const file = path.join(__dirname, './PKMFiles/PK3', 'blaziken.pkm');
//   const fileBytes = fs.readFileSync(file);
//   const bytes = new Uint8Array(fileBytes);
//   const mon = bytesToPKM(bytes, 'pkm');
//   expect(mon.stats).toStrictEqual({
//     hp: 282,
//     atk: 359,
//     def: 165,
//     spe: 208,
//     spa: 243,
//     spd: 154,
//   });
// });

// test('gen 3 EVs are updated', () => {
//   const emeraldPKM = new PK3(blazikenOH);
//   // mimicking ev reduction berries and ev gain
//   emeraldPKM.evs = {
//     atk: 252,
//     hp: 6,
//     spa: 0,
//     spe: 252,
//     def: 0,
//     spd: 0,
//   };
//   blazikenOH.updateData(emeraldPKM);
//   expect(blazikenOH.evs).toStrictEqual({
//     atk: 252,
//     hp: 6,
//     spa: 0,
//     spe: 252,
//     def: 0,
//     spd: 0,
//   });
// });

// test('gen 3 ribbons are updated', () => {
//   const emeraldPKM = new PK3(blazikenOH);
//   // gaining Gen 3 ribbons
//   emeraldPKM.ribbons = [
//     ...emeraldPKM.ribbons,
//     'Cool (Hoenn)',
//     'Cool Super',
//     'Cool Hyper',
//     'Cool Master (Hoenn)',
//     'Winning',
//   ];
//   blazikenOH.updateData(emeraldPKM);
//   expect(blazikenOH.ribbons).toContain('Cool Master (Hoenn)');
//   expect(blazikenOH.ribbons).toContain('Winning');
//   expect(blazikenOH.ribbons).toContain('Effort');
//   expect(blazikenOH.ribbons).toContain('Footprint');
// });

// test('gen 3 contest stats are updated', () => {
//   const emeraldPKM = new PK3(blazikenOH);
//   // gaining cool contest points
//   emeraldPKM.contest = {
//     cool: 30,
//     beauty: 255,
//     smart: 255,
//     tough: 255,
//     cute: 255,
//     sheen: 1,
//   };
//   blazikenOH.updateData(emeraldPKM);
//   expect(blazikenOH.contest).toStrictEqual({
//     cool: 30,
//     beauty: 255,
//     smart: 255,
//     tough: 255,
//     cute: 255,
//     sheen: 1,
//   });
// });

// test('gen 3 conversion to OHPKM and back is lossless', () => {
//   const ohPKM = new OHPKM(blazikenPK3);
//   // gaining cool contest points
//   const PK3PKM = new PK3(ohPKM)
//   expect(blazikenPK3.bytes).toEqual(PK3PKM.bytes)
// });

// describe('pk1 bytes unchanged after read/write', () => {
//   const files = fs
//     .readdirSync('src/__test__/PKMFiles/PK1')
//     .map((filename) => path.join('src/__test__/PKMFiles/PK1', filename))
//   for (const file of files) {
//     test(`file: ${file}`, () => {
//       const fileBytes = new Uint8Array(fs.readFileSync(file))
//       const convertedBytes = new Uint8Array(
//         new PK1(fileBytes.buffer).toBytes({ includeExtraFields: true })
//       )
//       expect(Array.from(convertedBytes)).toEqual(Array.from(fileBytes.slice(3)))
//     })
//   }
// })

describe('pk2 bytes unchanged after read/write', () => {
  const files = fs
    .readdirSync('src/__test__/PKMFiles/PK2')
    .map((filename) => path.join('src/__test__/PKMFiles/PK2', filename))
  for (const file of files) {
    test(`file: ${file}`, () => {
      const bytes = fs.readFileSync(file)
      const pk2 = new PK2(new Uint8Array(bytes).buffer)
      const newPK2 = new PK2(pk2.toBytes({ includeExtraFields: true }))
      expect(newPK2).toEqual(pk2)
    })
  }
})

// describe('pk3 bytes unchanged after read/write', () => {
//   const files = fs
//     .readdirSync('src/__test__/PKMFiles/PK3')
//     .map((filename) => path.join('src/__test__/PKMFiles/PK3', filename))
//   for (const file of files) {
//     test(`file: ${file}`, () => {
//       const fileBytes = new Uint8Array(fs.readFileSync(file))
//       const convertedBytes = new Uint8Array(
//         new PK3(fileBytes.buffer).toBytes({ includeExtraFields: true })
//       )
//       Array.from(convertedBytes).forEach((cByte, i) => {
//         if (fileBytes.byteLength > i && cByte !== Array.from(fileBytes)[i]) {
//           throw new Error(
//             `Byte 0x${i.toString(16)}: ${cByte} should be ${Array.from(fileBytes)[i]}`
//           )
//         }
//       })
//     })
//   }
// })

describe('pk4 bytes unchanged after read/write', () => {
  const files = fs
    .readdirSync('src/__test__/PKMFiles/PK4')
    .map((filename) => path.join('src/__test__/PKMFiles/PK4', filename))
  for (const file of files) {
    test(`file: ${file}`, () => {
      const bytes = fs.readFileSync(file)
      const pk4 = new PK4(new Uint8Array(bytes).buffer)
      const newPK4 = new PK4(pk4.toBytes({ includeExtraFields: true }))
      expect(newPK4).toEqual(pk4)
    })
  }
})

describe('pk5 bytes unchanged after read/write', () => {
  const files = fs
    .readdirSync('src/__test__/PKMFiles/PK5')
    .map((filename) => path.join('src/__test__/PKMFiles/PK5', filename))
  for (const file of files) {
    test(`file: ${file}`, () => {
      const bytes = fs.readFileSync(file)
      const pk5 = new PK5(new Uint8Array(bytes).buffer)
      const newPK5 = new PK5(pk5.toBytes({ includeExtraFields: true }))
      expect(newPK5).toEqual(pk5)
    })
  }
})

describe('pk6 bytes unchanged after read/write', () => {
  const files = fs
    .readdirSync('src/__test__/PKMFiles/PK6')
    .map((filename) => path.join('src/__test__/PKMFiles/PK6', filename))
  for (const file of files) {
    test(`file: ${file}`, () => {
      const bytes = fs.readFileSync(file)
      const pk6 = new PK6(new Uint8Array(bytes).buffer)
      const newPK6 = new PK6(pk6.toBytes())
      expect(newPK6).toEqual(pk6)
    })
  }
})

describe('pk7 bytes unchanged after read/write', () => {
  const files = fs
    .readdirSync('src/__test__/PKMFiles/PK7')
    .map((filename) => path.join('src/__test__/PKMFiles/PK7', filename))
  for (const file of files) {
    test(`file: ${file}`, () => {
      const bytes = fs.readFileSync(file)
      const pk7 = new PK7(new Uint8Array(bytes).buffer)
      const newPK7 = new PK7(pk7.toBytes())
      expect(newPK7).toEqual(pk7)
    })
  }
})

describe('pk8 bytes unchanged after read/write', () => {
  const files = fs
    .readdirSync('src/__test__/PKMFiles/PK8')
    .map((filename) => path.join('src/__test__/PKMFiles/PK8', filename))
  for (const file of files) {
    test(`file: ${file}`, () => {
      const bytes = fs.readFileSync(file)
      const pk8 = new PK8(new Uint8Array(bytes).buffer)
      const newPK8 = new PK8(pk8.toBytes())
      expect(newPK8).toEqual(pk8)
    })
  }
})

describe('pb8 bytes unchanged after read/write', () => {
  const files = fs
    .readdirSync('src/__test__/PKMFiles/PB8')
    .map((filename) => path.join('src/__test__/PKMFiles/PB8', filename))
  for (const file of files) {
    test(`file: ${file}`, () => {
      const bytes = fs.readFileSync(file)
      const pb8 = new PB8(new Uint8Array(bytes).buffer)
      const newPB8 = new PB8(pb8.toBytes())
      expect(newPB8).toEqual(pb8)
    })
  }
})

// test('gen 6+ nickname accuracy', () => {
//   const converted = new PK3(slowpokePK7);
//   expect(converted.nickname).toBe(slowpokePK7.nickname);
// });

// test('gen 6+ shiny accuracy', () => {
//   const converted = new PK3(slowpokePK7);
//   if (!slowpokePK7.personalityValue) {
//     fail('mon has no personality value');
//   }
//   expect(converted.isShiny).toBe(slowpokePK7.isShiny);
// });

// test('gen 6+ nature accuracy', () => {
//   const converted = new PK3(slowpokePK7);
//   expect(converted.nature).toBe(slowpokePK7.nature);
// });

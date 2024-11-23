import fs from 'fs'
import path from 'path'

import { COLOPKM, PA8, PB8, PK1, PK2, PK3, PK4, PK5, PK6, PK7, PK8, PK9, XDPKM } from '../pkm'
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

describe('pk1 fields persist after read/write', () => {
  const files = fs
    .readdirSync('src/__test__/PKMFiles/PK1')
    .map((filename) => path.join('src/__test__/PKMFiles/PK1', filename))
  for (const file of files) {
    test(`file: ${file}`, () => {
      const bytes = fs.readFileSync(file)
      const pk1 = new PK1(new Uint8Array(bytes).buffer)
      const newPK1 = new PK1(pk1.toBytes({ includeExtraFields: true }))
      expect(newPK1).toEqual(pk1)
    })
  }
})

describe('pk2 fields persist after read/write', () => {
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

describe('pk3 fields persist after read/write', () => {
  const files = fs
    .readdirSync('src/__test__/PKMFiles/PK3')
    .map((filename) => path.join('src/__test__/PKMFiles/PK3', filename))
  for (const file of files) {
    test(`file: ${file}`, () => {
      const bytes = fs.readFileSync(file)
      const pk3 = new PK3(new Uint8Array(bytes).buffer)
      const newPK3 = new PK3(pk3.toBytes())
      expect(newPK3).toEqual(pk3)
    })
  }
})

describe('colopkm fields persist after read/write', () => {
  const files = fs
    .readdirSync('src/__test__/PKMFiles/COLOPKM')
    .map((filename) => path.join('src/__test__/PKMFiles/COLOPKM', filename))
  for (const file of files) {
    test(`file: ${file}`, () => {
      const bytes = fs.readFileSync(file)
      const colopkm = new COLOPKM(new Uint8Array(bytes).buffer)
      const newCOLOPKM = new COLOPKM(colopkm.toBytes())
      expect(newCOLOPKM).toEqual(colopkm)
    })
  }
})

describe('xdpkm fields persist after read/write', () => {
  const files = fs
    .readdirSync('src/__test__/PKMFiles/XDPKM')
    .map((filename) => path.join('src/__test__/PKMFiles/XDPKM', filename))
  for (const file of files) {
    test(`file: ${file}`, () => {
      const bytes = fs.readFileSync(file)
      const xdpkm = new XDPKM(new Uint8Array(bytes).buffer)
      const newXDPKM = new XDPKM(xdpkm.toBytes())
      expect(newXDPKM).toEqual(xdpkm)
    })
  }
})

describe('pk4 fields persist after read/write', () => {
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

describe('pk5 fields persist after read/write', () => {
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

describe('pk6 fields persist after read/write', () => {
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

describe('pk7 fields persist after read/write', () => {
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

describe('pk8 fields persist after read/write', () => {
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

describe('pb8 fields persist after read/write', () => {
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

describe('pa8 fields persist after read/write', () => {
  const files = fs
    .readdirSync('src/__test__/PKMFiles/PA8')
    .map((filename) => path.join('src/__test__/PKMFiles/PA8', filename))
  for (const file of files) {
    test(`file: ${file}`, () => {
      const bytes = fs.readFileSync(file)
      const pa8 = new PA8(new Uint8Array(bytes).buffer)
      const newPA8 = new PA8(pa8.toBytes())
      expect(newPA8).toEqual(pa8)
    })
  }
})

describe('pk9 fields persist after read/write', () => {
  const files = fs
    .readdirSync('src/__test__/PKMFiles/PK9')
    .map((filename) => path.join('src/__test__/PKMFiles/PK9', filename))
  for (const file of files) {
    test(`file: ${file}`, () => {
      const bytes = fs.readFileSync(file)
      const pk9 = new PK9(new Uint8Array(bytes).buffer)
      const newPK9 = new PK9(pk9.toBytes())
      expect(newPK9).toEqual(pk9)
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

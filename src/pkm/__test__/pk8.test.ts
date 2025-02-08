import fs from 'fs'

import PK8 from '../PK8'

const files = fs.readdirSync('src/pkm/__test__/PKMFiles/PA8')


test('stat calculation', () => {
  const bytes = fs.readFileSync('src/pkm/__test__/PKMFiles/PK8/mienshao.pk8')
  const mon = new PK8(new Uint8Array(bytes).buffer)
  expect(mon.stats).toEqual({
    hp: 272,
    atk: 349,
    def: 156,
    spe: 339,
    spd: 156,
    spa: 203
  })
  expect(mon.level).toBe(100)

  const encrypted = mon.toPCBytes()
  const decrypedMon = new PK8(encrypted, true)
  expect(decrypedMon.stats).toEqual({
    hp: 272,
    atk: 349,
    def: 156,
    spe: 339,
    spd: 156,
    spa: 203
  })
  expect(decrypedMon.level).toBe(100)
})

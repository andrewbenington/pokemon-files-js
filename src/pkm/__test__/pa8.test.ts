import fs from 'fs'

import PA8 from '../PA8'
// ;(global as any).TextDecoder = TextDecoder


const files = fs.readdirSync('src/pkm/__test__/PKMFiles/PA8')


for (const filename of files) {
  test('pa8 checksum calculation: ' + filename, () => {
    const bytes = fs.readFileSync('src/pkm/__test__/PKMFiles/PA8/' + filename)
    const mon = new PA8(new Uint8Array(bytes).buffer)
    fs.writeFileSync("test", new Uint8Array(mon.toBytes()))
    expect(mon.checksum).toBe(mon.calcChecksum())
  })
  break
}
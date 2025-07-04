import fs from 'node:fs';
import init, { WasmPK6 } from "pokemon-files-rs/pokemon_files_rs.js";

const run = async () => {
  await init();

  const bytes = fs.readFileSync('../swellow.pk6')
  const mon = WasmPK6.fromBytes(bytes)
  console.log(mon.nickname)
  mon.nickname = "Andrew"
  console.log(mon.nickname)

};

run();
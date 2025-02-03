// This file was generated by make generate
use crate::pkm::{util, strings};
use crate::pkm::types::Stats;
use crate::pkm::util::to_sized_array;
use serde::Serialize;

#[derive(Debug, Default, Serialize)]
pub struct PK6 {
  encryption_constant: u32,
  sanity: u16,
  checksum: u16,
  dex_num: u16,
  held_item_index: u16,
  trainer_id: u16,
  secret_id: u16,
  exp: u32,
  ability_index: u8,
  ability_num: u8,
  training_bag_hits: u8,
  training_bag: u8,
  personality_value: u32,
  nature: u8,
  forme_num: u8,
  gender: u8,
  evs: Stats,
  pokerus_byte: u8,
  super_training_flags: u32,
  ribbon_bytes: [u8; 4],
  contest_memory_count: u8,
  battle_memory_count: u8,
  super_training_dist_flags: u8,
  form_argument: u32,
  nickname: String,
  moves: [u16; 4],
  move_pp: [u8; 4],
  move_pp_ups: [u8; 4],
  relearn_moves: [u16; 4],
  secret_super_training_unlocked: bool,
  secret_super_training_complete: bool,
  ivs: Stats,
  is_egg: bool,
  is_nicknamed: bool,
  handler_name: String,
  handler_gender: bool,
  is_current_handler: bool,
  handler_friendship: u8,
  handler_affection: u8,
  fullness: u8,
  enjoyment: u8,
  trainer_name: String,
  trainer_friendship: u8,
  trainer_affection: u8,
  egg_location_index: u16,
  met_location_index: u16,
  ball: u8,
  met_level: u8,
  encounter_type: u8,
  game_of_origin: u8,
  country: u8,
  region: u8,
  console_region: u8,
  language_index: u8,
  status_condition: u8,
  current_hp: u8,
  is_fateful_encounter: bool,
  trainer_gender: bool,
}

impl PK6 {
  pub fn from_bytes(bytes: Vec<u8>) -> Result<Self, Box<dyn std::error::Error>> {
	let encryption_constant = u32::from_le_bytes(to_sized_array(&bytes[0..4]));
	let sanity = u16::from_le_bytes(to_sized_array(&bytes[4..6]));
	let checksum = u16::from_le_bytes(to_sized_array(&bytes[6..8]));
	let dex_num = u16::from_le_bytes(to_sized_array(&bytes[8..10]));
	let held_item_index = u16::from_le_bytes(to_sized_array(&bytes[10..12]));
	let trainer_id = u16::from_le_bytes(to_sized_array(&bytes[12..14]));
	let secret_id = u16::from_le_bytes(to_sized_array(&bytes[14..16]));
	let exp = u32::from_le_bytes(to_sized_array(&bytes[16..20]));
	let ability_index = bytes[20];
	let ability_num = bytes[21];
	let training_bag_hits = bytes[22];
	let training_bag = bytes[23];
	let personality_value = u32::from_le_bytes(to_sized_array(&bytes[24..28]));
	let nature = bytes[28];
	let forme_num = byteLogic.uIntFromBufferBits(dataView, 0x1d, 3, 5, true);
	let gender = byteLogic.uIntFromBufferBits(dataView, 0x1d, 1, 2, true);
	let evs = Stats::from_bytes(to_sized_array(&bytes[30..36]));
	let pokerus_byte = bytes[43];
	let super_training_flags = u32::from_le_bytes(to_sized_array(&bytes[44..48]));
	let ribbon_bytes = to_sized_array(&bytes[48..52]);
	let contest_memory_count = bytes[56];
	let battle_memory_count = bytes[57];
	let super_training_dist_flags = bytes[58];
	let form_argument = u32::from_le_bytes(to_sized_array(&bytes[60..64]));
	let nickname = strings::utf16_be_from_bytes(bytes[64..88].to_vec()).map_err(|e| format!("read field 'nickname': {}", e))?;
	let moves = [u16::from_le_bytes(to_sized_array(&bytes[90..92])), u16::from_le_bytes(to_sized_array(&bytes[92..94])), u16::from_le_bytes(to_sized_array(&bytes[94..96])), u16::from_le_bytes(to_sized_array(&bytes[96..98]))];
	let move_pp = [bytes[98], bytes[99], bytes[100], bytes[101]];
	let move_pp_ups = [bytes[102], bytes[103], bytes[104], bytes[105]];
	let relearn_moves = [u16::from_le_bytes(to_sized_array(&bytes[106..108])), u16::from_le_bytes(to_sized_array(&bytes[108..110])), u16::from_le_bytes(to_sized_array(&bytes[110..112])), u16::from_le_bytes(to_sized_array(&bytes[112..114]))];
	let secret_super_training_unlocked = util::get_flag(&bytes, 114, 1).map_err(|e| format!("read field 'secret_super_training_unlocked': {}", e))?;
	let secret_super_training_complete = util::get_flag(&bytes, 114, 2).map_err(|e| format!("read field 'secret_super_training_complete': {}", e))?;
	let ivs = Stats::from_30_bits(to_sized_array(&bytes[116..120]));
	let is_egg = util::get_flag(&bytes, 116, 30).map_err(|e| format!("read field 'is_egg': {}", e))?;
	let is_nicknamed = util::get_flag(&bytes, 116, 31).map_err(|e| format!("read field 'is_nicknamed': {}", e))?;
	let handler_name = strings::utf16_be_from_bytes(bytes[120..144].to_vec()).map_err(|e| format!("read field 'handler_name': {}", e))?;
	let handler_gender = util::get_flag(&bytes, 146, 0).map_err(|e| format!("read field 'handler_gender': {}", e))?;
	let is_current_handler = util::get_flag(&bytes, 147, 0).map_err(|e| format!("read field 'is_current_handler': {}", e))?;
	let handler_friendship = bytes[162];
	let handler_affection = bytes[163];
	let fullness = bytes[174];
	let enjoyment = bytes[175];
	let trainer_name = strings::utf16_be_from_bytes(bytes[176..200].to_vec()).map_err(|e| format!("read field 'trainer_name': {}", e))?;
	let trainer_friendship = bytes[202];
	let trainer_affection = bytes[203];
	let egg_location_index = u16::from_le_bytes(to_sized_array(&bytes[216..218]));
	let met_location_index = u16::from_le_bytes(to_sized_array(&bytes[218..220]));
	let ball = bytes[220];
	let met_level = bytes[221];
	let encounter_type = bytes[222];
	let game_of_origin = bytes[223];
	let country = bytes[224];
	let region = bytes[225];
	let console_region = bytes[226];
	let language_index = bytes[227];
	let status_condition = bytes[232];
	let current_hp = bytes[240];
	let is_fateful_encounter = util::get_flag(&bytes, 29, 0).map_err(|e| format!("read field 'is_fateful_encounter': {}", e))?;
	let trainer_gender = util::get_flag(&bytes, 221, 7).map_err(|e| format!("read field 'trainer_gender': {}", e))?;
    let mon = PK6 {
        encryption_constant,
        sanity,
        checksum,
        dex_num,
        held_item_index,
        trainer_id,
        secret_id,
        exp,
        ability_index,
        ability_num,
        training_bag_hits,
        training_bag,
        personality_value,
        nature,
        forme_num,
        gender,
        evs,
        pokerus_byte,
        super_training_flags,
        ribbon_bytes,
        contest_memory_count,
        battle_memory_count,
        super_training_dist_flags,
        form_argument,
        nickname,
        moves,
        move_pp,
        move_pp_ups,
        relearn_moves,
        secret_super_training_unlocked,
        secret_super_training_complete,
        ivs,
        is_egg,
        is_nicknamed,
        handler_name,
        handler_gender,
        is_current_handler,
        handler_friendship,
        handler_affection,
        fullness,
        enjoyment,
        trainer_name,
        trainer_friendship,
        trainer_affection,
        egg_location_index,
        met_location_index,
        ball,
        met_level,
        encounter_type,
        game_of_origin,
        country,
        region,
        console_region,
        language_index,
        status_condition,
        current_hp,
        is_fateful_encounter,
        trainer_gender,
    };
	return Ok(mon);
  }
}

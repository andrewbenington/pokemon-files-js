// This file was generated by make generate
use crate::pkm::{util, strings};
use crate::pkm::types::Stats;
use crate::pkm::util::to_sized_array;
use serde::Serialize;

#[derive(Debug, Default, Serialize)]
pub struct COLOPKM {
  dex_num: u16,
  personality_value: u32,
  game_of_origin: u8,
  language_index: u8,
  met_location_index: u16,
  met_level: u8,
  ball: u8,
  trainer_gender: bool,
  trainer_id: u16,
  secret_id: u16,
  trainer_name: String,
  nickname: String,
  ribbon_bytes: [u8; 4],
  exp: u32,
  stat_level: u8,
  moves: [u16; 4],
  move_pp: [u8; 4],
  move_pp_ups: [u8; 4],
  held_item_index: u16,
  current_hp: u16,
  evs: Stats,
  ivs: Stats,
  is_fateful_encounter: bool,
  pokerus_byte: u8,
  trainer_friendship: u8,
  shadow_id: u16,
  shadow_gauge: u32,
}

impl COLOPKM {
  pub fn from_bytes(bytes: Vec<u8>) -> Result<Self, Box<dyn std::error::Error>> {
	let dex_num = u16::from_be_bytes(to_sized_array(&bytes[0..2]));
	let personality_value = u32::from_be_bytes(to_sized_array(&bytes[4..8]));
	let game_of_origin = bytes[8];
	let language_index = bytes[11];
	let met_location_index = u16::from_be_bytes(to_sized_array(&bytes[12..14]));
	let met_level = bytes[14];
	let ball = bytes[15];
	let trainer_gender = util::get_flag(&bytes, 16, 1).map_err(|e| format!("read field 'trainer_gender': {}", e))?;
	let trainer_id = u16::from_be_bytes(to_sized_array(&bytes[20..22]));
	let secret_id = u16::from_be_bytes(to_sized_array(&bytes[22..24]));
	let trainer_name = strings::utf16_be_from_bytes(bytes[24..46].to_vec()).map_err(|e| format!("read field 'trainer_name': {}", e))?;
	let nickname = strings::utf16_be_from_bytes(bytes[46..68].to_vec()).map_err(|e| format!("read field 'nickname': {}", e))?;
	let ribbon_bytes = to_sized_array(&bytes[76..80]);
	let exp = u32::from_be_bytes(to_sized_array(&bytes[92..96]));
	let stat_level = bytes[96];
	let moves = [u16::from_be_bytes(to_sized_array(&bytes[120..122])), u16::from_be_bytes(to_sized_array(&bytes[122..124])), u16::from_be_bytes(to_sized_array(&bytes[124..126])), u16::from_be_bytes(to_sized_array(&bytes[126..128]))];
	let move_pp = [bytes[122], bytes[123], bytes[124], bytes[125]];
	let move_pp_ups = [bytes[123], bytes[124], bytes[125], bytes[126]];
	let held_item_index = u16::from_be_bytes(to_sized_array(&bytes[136..138]));
	let current_hp = u16::from_be_bytes(to_sized_array(&bytes[138..140]));
	let evs = Stats::from_bytes(to_sized_array(&bytes[153..159]));
	let ivs = Stats::from_bytes(to_sized_array(&bytes[165..171]));
	let is_fateful_encounter = util::get_flag(&bytes, 201, 4).map_err(|e| format!("read field 'is_fateful_encounter': {}", e))?;
	let pokerus_byte = bytes[202];
	let trainer_friendship = bytes[208];
	let shadow_id = u16::from_be_bytes(to_sized_array(&bytes[216..218]));
	let shadow_gauge = u32::from_be_bytes(to_sized_array(&bytes[220..224]));
    let mon = COLOPKM {
        dex_num,
        personality_value,
        game_of_origin,
        language_index,
        met_location_index,
        met_level,
        ball,
        trainer_gender,
        trainer_id,
        secret_id,
        trainer_name,
        nickname,
        ribbon_bytes,
        exp,
        stat_level,
        moves,
        move_pp,
        move_pp_ups,
        held_item_index,
        current_hp,
        evs,
        ivs,
        is_fateful_encounter,
        pokerus_byte,
        trainer_friendship,
        shadow_id,
        shadow_gauge,
    };
	return Ok(mon);
  }
}

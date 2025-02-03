// This file was generated by make generate
use crate::pkm::{util, strings};
use crate::pkm::types::Stats;
use crate::pkm::util::to_sized_array;
use serde::Serialize;

#[derive(Debug, Default, Serialize)]
pub struct PB8 {
  encryption_constant: u32,
  sanity: u16,
  checksum: u16,
  dex_num: u16,
  held_item_index: u16,
  trainer_id: u16,
  secret_id: u16,
  exp: u32,
  ability_index: u16,
  ability_num: u8,
  favorite: bool,
  can_gigantamax: bool,
  personality_value: u32,
  nature: u8,
  stat_nature: u8,
  is_fateful_encounter: bool,
  gender: u8,
  forme_num: u16,
  evs: Stats,
  pokerus_byte: u8,
  ribbon_bytes: [u8; 8],
  contest_memory_count: u8,
  battle_memory_count: u8,
  sociability: u32,
  height: u8,
  weight: u8,
  nickname: String,
  moves: [u16; 4],
  move_pp: [u8; 4],
  move_pp_ups: [u8; 4],
  relearn_moves: [u16; 4],
  current_hp: u16,
  ivs: Stats,
  is_egg: bool,
  is_nicknamed: bool,
  dynamax_level: u8,
  status_condition: u32,
  palma: u32,
  handler_name: String,
  handler_gender: bool,
  handler_language: u8,
  handler_id: u16,
  handler_friendship: u8,
  fullness: u8,
  enjoyment: u8,
  game_of_origin: u8,
  game_of_origin_battle: u8,
  region: u8,
  console_region: u8,
  language_index: u8,
  form_argument: u32,
  affixed_ribbon: u8,
  trainer_name: String,
  trainer_friendship: u8,
  egg_location_index: u16,
  met_location_index: u16,
  ball: u8,
  met_level: u8,
  tm_flags_bdsp: [u8; 14],
  home_tracker: [u8; 8],
  is_current_handler: bool,
  hyper_training: Stats,
  trainer_gender: bool,
}

impl PB8 {
  pub fn from_bytes(bytes: Vec<u8>) -> Result<Self, Box<dyn std::error::Error>> {
	let encryption_constant = u32::from_le_bytes(to_sized_array(&bytes[0..4]));
	let sanity = u16::from_le_bytes(to_sized_array(&bytes[4..6]));
	let checksum = u16::from_le_bytes(to_sized_array(&bytes[6..8]));
	let dex_num = u16::from_le_bytes(to_sized_array(&bytes[8..10]));
	let held_item_index = u16::from_le_bytes(to_sized_array(&bytes[10..12]));
	let trainer_id = u16::from_le_bytes(to_sized_array(&bytes[12..14]));
	let secret_id = u16::from_le_bytes(to_sized_array(&bytes[14..16]));
	let exp = u32::from_le_bytes(to_sized_array(&bytes[16..20]));
	let ability_index = u16::from_le_bytes(to_sized_array(&bytes[20..22]));
	let ability_num = bytes[22];
	let favorite = util::get_flag(&bytes, 22, 3).map_err(|e| format!("read field 'favorite': {}", e))?;
	let can_gigantamax = util::get_flag(&bytes, 22, 4).map_err(|e| format!("read field 'can_gigantamax': {}", e))?;
	let personality_value = u32::from_le_bytes(to_sized_array(&bytes[28..32]));
	let nature = bytes[32];
	let stat_nature = bytes[33];
	let is_fateful_encounter = util::get_flag(&bytes, 34, 0).map_err(|e| format!("read field 'is_fateful_encounter': {}", e))?;
	let gender = bytes[34];
	let forme_num = u16::from_le_bytes(to_sized_array(&bytes[36..38]));
	let evs = Stats::from_bytes(to_sized_array(&bytes[38..44]));
	let pokerus_byte = bytes[50];
	let ribbon_bytes = to_sized_array(&bytes[52..60]);
	let contest_memory_count = bytes[60];
	let battle_memory_count = bytes[61];
	let sociability = u32::from_le_bytes(to_sized_array(&bytes[72..76]));
	let height = bytes[80];
	let weight = bytes[81];
	let nickname = strings::utf16_be_from_bytes(bytes[88..112].to_vec()).map_err(|e| format!("read field 'nickname': {}", e))?;
	let moves = [u16::from_le_bytes(to_sized_array(&bytes[114..116])), u16::from_le_bytes(to_sized_array(&bytes[116..118])), u16::from_le_bytes(to_sized_array(&bytes[118..120])), u16::from_le_bytes(to_sized_array(&bytes[120..122]))];
	let move_pp = [bytes[122], bytes[123], bytes[124], bytes[125]];
	let move_pp_ups = [bytes[126], bytes[127], bytes[128], bytes[129]];
	let relearn_moves = [u16::from_le_bytes(to_sized_array(&bytes[130..132])), u16::from_le_bytes(to_sized_array(&bytes[132..134])), u16::from_le_bytes(to_sized_array(&bytes[134..136])), u16::from_le_bytes(to_sized_array(&bytes[136..138]))];
	let current_hp = u16::from_le_bytes(to_sized_array(&bytes[138..140]));
	let ivs = Stats::from_30_bits(to_sized_array(&bytes[140..144]));
	let is_egg = util::get_flag(&bytes, 140, 30).map_err(|e| format!("read field 'is_egg': {}", e))?;
	let is_nicknamed = util::get_flag(&bytes, 140, 31).map_err(|e| format!("read field 'is_nicknamed': {}", e))?;
	let dynamax_level = bytes[144];
	let status_condition = u32::from_le_bytes(to_sized_array(&bytes[148..152]));
	let palma = u32::from_le_bytes(to_sized_array(&bytes[152..156]));
	let handler_name = strings::utf16_be_from_bytes(bytes[168..192].to_vec()).map_err(|e| format!("read field 'handler_name': {}", e))?;
	let handler_gender = util::get_flag(&bytes, 194, 0).map_err(|e| format!("read field 'handler_gender': {}", e))?;
	let handler_language = bytes[195];
	let handler_id = u16::from_le_bytes(to_sized_array(&bytes[198..200]));
	let handler_friendship = bytes[200];
	let fullness = bytes[220];
	let enjoyment = bytes[221];
	let game_of_origin = bytes[222];
	let game_of_origin_battle = bytes[223];
	let region = bytes[224];
	let console_region = bytes[224];
	let language_index = bytes[226];
	let form_argument = u32::from_le_bytes(to_sized_array(&bytes[228..232]));
	let affixed_ribbon = bytes[232];
	let trainer_name = strings::utf16_be_from_bytes(bytes[248..272].to_vec()).map_err(|e| format!("read field 'trainer_name': {}", e))?;
	let trainer_friendship = bytes[274];
	let egg_location_index = u16::from_le_bytes(to_sized_array(&bytes[288..290]));
	let met_location_index = u16::from_le_bytes(to_sized_array(&bytes[290..292]));
	let ball = bytes[292];
	let met_level = bytes[293];
	let tm_flags_bdsp = to_sized_array(&bytes[295..309]);
	let home_tracker = to_sized_array(&bytes[309..317]);
	let is_current_handler = util::get_flag(&bytes, 196, 0).map_err(|e| format!("read field 'is_current_handler': {}", e))?;
	let hyper_training = Stats::from_hyper_train_bytes(to_sized_array(&bytes[294..300]));
	let trainer_gender = util::get_flag(&bytes, 293, 7).map_err(|e| format!("read field 'trainer_gender': {}", e))?;
    let mon = PB8 {
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
        favorite,
        can_gigantamax,
        personality_value,
        nature,
        stat_nature,
        is_fateful_encounter,
        gender,
        forme_num,
        evs,
        pokerus_byte,
        ribbon_bytes,
        contest_memory_count,
        battle_memory_count,
        sociability,
        height,
        weight,
        nickname,
        moves,
        move_pp,
        move_pp_ups,
        relearn_moves,
        current_hp,
        ivs,
        is_egg,
        is_nicknamed,
        dynamax_level,
        status_condition,
        palma,
        handler_name,
        handler_gender,
        handler_language,
        handler_id,
        handler_friendship,
        fullness,
        enjoyment,
        game_of_origin,
        game_of_origin_battle,
        region,
        console_region,
        language_index,
        form_argument,
        affixed_ribbon,
        trainer_name,
        trainer_friendship,
        egg_location_index,
        met_location_index,
        ball,
        met_level,
        tm_flags_bdsp,
        home_tracker,
        is_current_handler,
        hyper_training,
        trainer_gender,
    };
	return Ok(mon);
  }
}

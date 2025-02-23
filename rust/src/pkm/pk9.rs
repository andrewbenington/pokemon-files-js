// This file was generated by make generate
use super::pkm::Pkm;
use crate::pkm::types::{Gender, Stats};
use crate::pkm::util::to_sized_array;
use crate::pkm::{strings, util};
use serde::Serialize;

#[derive(Debug, Default, Serialize)]
pub struct PK9 {
    pub encryption_constant: u32,
    pub checksum: u16,
    pub dex_num: u16,
    pub held_item_index: u16,
    pub trainer_id: u16,
    pub secret_id: u16,
    pub exp: u32,
    pub ability_index: u16,
    pub ability_num: u8,
    pub favorite: bool,
    pub can_gigantamax: bool,
    pub personality_value: u32,
    pub nature: u8,
    pub stat_nature: u8,
    pub is_fateful_encounter: bool,
    pub gender: Gender,
    pub forme_num: u16,
    pub evs: Stats,
    pub pokerus_byte: u8,
    pub ribbon_bytes: [u8; 8],
    pub contest_memory_count: u8,
    pub battle_memory_count: u8,
    pub height: u8,
    pub weight: u8,
    pub scale: u8,
    pub tm_flags_svdlc: [u8; 13],
    pub nickname: String,
    pub moves: [u16; 4],
    pub move_pp: [u8; 4],
    pub move_pp_ups: [u8; 4],
    pub relearn_moves: [u16; 4],
    pub current_hp: u16,
    pub ivs: Stats,
    pub is_egg: bool,
    pub is_nicknamed: bool,
    pub status_condition: u32,
    pub tera_type_original: u8,
    pub tera_type_override: u8,
    pub handler_name: String,
    pub handler_gender: bool,
    pub handler_language: u8,
    pub is_current_handler: bool,
    pub handler_id: u16,
    pub handler_friendship: u8,
    pub game_of_origin: u8,
    pub game_of_origin_battle: u8,
    pub form_argument: u32,
    pub affixed_ribbon: u8,
    pub language_index: u8,
    pub trainer_name: String,
    pub trainer_friendship: u8,
    pub obedience_level: u8,
    pub egg_location_index: u16,
    pub met_location_index: u16,
    pub ball: u8,
    pub met_level: u8,
    pub hyper_training: Stats,
    pub home_tracker: [u8; 8],
    pub tm_flags_sv: [u8; 22],
    pub trainer_gender: Gender,
}

impl Pkm<344, 344> for PK9 {
    const BOX_SIZE: usize = 344;
    const PARTY_SIZE: usize = 344;

    fn from_bytes(bytes: &[u8]) -> Result<Self, String> {
        let size = bytes.len();
        if size < 344 {
            return Err(format!(
                "byte array is too short for PK9 format (received {size}, expected >= 344)"
            ));
        }
        let mon = PK9 {
            encryption_constant: u32::from_le_bytes(to_sized_array(&bytes[0..4])),
            checksum: u16::from_le_bytes(to_sized_array(&bytes[6..8])),
            dex_num: u16::from_le_bytes(to_sized_array(&bytes[8..10])),
            held_item_index: u16::from_le_bytes(to_sized_array(&bytes[10..12])),
            trainer_id: u16::from_le_bytes(to_sized_array(&bytes[12..14])),
            secret_id: u16::from_le_bytes(to_sized_array(&bytes[14..16])),
            exp: u32::from_le_bytes(to_sized_array(&bytes[16..20])),
            ability_index: u16::from_le_bytes(to_sized_array(&bytes[20..22])),
            ability_num: bytes[22],
            favorite: util::get_flag(bytes, 22, 3),
            can_gigantamax: util::get_flag(bytes, 22, 4),
            personality_value: u32::from_le_bytes(to_sized_array(&bytes[28..32])),
            nature: bytes[32],
            stat_nature: bytes[33],
            is_fateful_encounter: util::get_flag(bytes, 34, 0),
            gender: bytes[34].into(),
            forme_num: u16::from_le_bytes(to_sized_array(&bytes[36..38])),
            evs: Stats::from_bytes(to_sized_array(&bytes[38..44])),
            pokerus_byte: bytes[50],
            ribbon_bytes: to_sized_array(&bytes[52..60]),
            contest_memory_count: bytes[60],
            battle_memory_count: bytes[61],
            height: bytes[72],
            weight: bytes[73],
            scale: bytes[74],
            tm_flags_svdlc: to_sized_array(&bytes[75..88]),
            nickname: strings::utf16::from_be_bytes(bytes[88..112].to_vec()),
            moves: [
                u16::from_le_bytes(to_sized_array(&bytes[114..116])),
                u16::from_le_bytes(to_sized_array(&bytes[116..118])),
                u16::from_le_bytes(to_sized_array(&bytes[118..120])),
                u16::from_le_bytes(to_sized_array(&bytes[120..122])),
            ],
            move_pp: [bytes[122], bytes[123], bytes[124], bytes[125]],
            move_pp_ups: [bytes[126], bytes[127], bytes[128], bytes[129]],
            relearn_moves: [
                u16::from_le_bytes(to_sized_array(&bytes[130..132])),
                u16::from_le_bytes(to_sized_array(&bytes[132..134])),
                u16::from_le_bytes(to_sized_array(&bytes[134..136])),
                u16::from_le_bytes(to_sized_array(&bytes[136..138])),
            ],
            current_hp: u16::from_le_bytes(to_sized_array(&bytes[138..140])),
            ivs: Stats::from_30_bits(to_sized_array(&bytes[140..144])),
            is_egg: util::get_flag(bytes, 140, 30),
            is_nicknamed: util::get_flag(bytes, 140, 31),
            status_condition: u32::from_le_bytes(to_sized_array(&bytes[144..148])),
            tera_type_original: bytes[148],
            tera_type_override: bytes[149],
            handler_name: strings::utf16::from_be_bytes(bytes[168..192].to_vec()),
            handler_gender: util::get_flag(bytes, 194, 0),
            handler_language: bytes[195],
            is_current_handler: util::get_flag(bytes, 196, 0),
            handler_id: u16::from_le_bytes(to_sized_array(&bytes[198..200])),
            handler_friendship: bytes[200],
            game_of_origin: bytes[206],
            game_of_origin_battle: bytes[207],
            form_argument: u32::from_le_bytes(to_sized_array(&bytes[208..212])),
            affixed_ribbon: bytes[212],
            language_index: bytes[213],
            trainer_name: strings::utf16::from_be_bytes(bytes[248..272].to_vec()),
            trainer_friendship: bytes[274],
            obedience_level: bytes[287],
            egg_location_index: u16::from_le_bytes(to_sized_array(&bytes[288..290])),
            met_location_index: u16::from_le_bytes(to_sized_array(&bytes[290..292])),
            ball: bytes[292],
            met_level: bytes[293],
            hyper_training: Stats::from_hyper_train_bytes(to_sized_array(&bytes[294..300])),
            home_tracker: to_sized_array(&bytes[295..303]),
            tm_flags_sv: to_sized_array(&bytes[303..325]),
            trainer_gender: util::get_flag(bytes, 293, 7).into(),
        };
        Ok(mon)
    }

    fn write_bytes(&self, bytes: &mut [u8; 344]) {
        bytes[0..4].copy_from_slice(&self.encryption_constant.to_le_bytes());
        bytes[6..8].copy_from_slice(&self.checksum.to_le_bytes());

        bytes[10..12].copy_from_slice(&self.held_item_index.to_le_bytes());
        bytes[12..14].copy_from_slice(&self.trainer_id.to_le_bytes());
        bytes[14..16].copy_from_slice(&self.secret_id.to_le_bytes());
        bytes[16..20].copy_from_slice(&self.exp.to_le_bytes());
        bytes[20..22].copy_from_slice(&self.ability_index.to_le_bytes());
        bytes[22] = self.ability_num;

        bytes[28..32].copy_from_slice(&self.personality_value.to_le_bytes());
        bytes[32] = self.nature;
        bytes[33] = self.stat_nature;

        bytes[34] = self.gender.into();
        bytes[36..38].copy_from_slice(&self.forme_num.to_le_bytes());

        bytes[50] = self.pokerus_byte;

        bytes[60] = self.contest_memory_count;
        bytes[61] = self.battle_memory_count;
        bytes[72] = self.height;
        bytes[73] = self.weight;
        bytes[74] = self.scale;

        bytes[88..100].copy_from_slice(&strings::utf16::to_be_bytes(&self.nickname));

        bytes[138..140].copy_from_slice(&self.current_hp.to_le_bytes());

        bytes[144..148].copy_from_slice(&self.status_condition.to_le_bytes());
        bytes[148] = self.tera_type_original;
        bytes[149] = self.tera_type_override;
        bytes[168..180].copy_from_slice(&strings::utf16::to_be_bytes(&self.handler_name));

        bytes[195] = self.handler_language;

        bytes[198..200].copy_from_slice(&self.handler_id.to_le_bytes());
        bytes[200] = self.handler_friendship;
        bytes[206] = self.game_of_origin;
        bytes[207] = self.game_of_origin_battle;
        bytes[208..212].copy_from_slice(&self.form_argument.to_le_bytes());

        bytes[213] = self.language_index;
        bytes[248..260].copy_from_slice(&strings::utf16::to_be_bytes(&self.trainer_name));
        bytes[274] = self.trainer_friendship;
        bytes[287] = self.obedience_level;
        bytes[288..290].copy_from_slice(&self.egg_location_index.to_le_bytes());
        bytes[290..292].copy_from_slice(&self.met_location_index.to_le_bytes());
        bytes[292] = self.ball;
        bytes[293] = self.met_level;
    }

    fn to_box_bytes(&self) -> [u8; 344] {
        let mut bytes = [0; 344];
        self.write_bytes(&mut bytes);

        bytes
    }

    fn to_party_bytes(&self) -> [u8; 344] {
        let mut bytes = [0; 344];
        let box_slice: &mut [u8; 344] = bytes[0..344].as_mut().try_into().unwrap();
        self.write_bytes(box_slice);

        bytes
    }
}

use crate::pkm::util::to_sized_array;
use serde::Serialize;

#[derive(Debug, Default, Serialize)]
pub struct Stats {
    hp: u8,
    atk: u8,
    def: u8,
    spa: u8,
    spd: u8,
    spe: u8,
}

impl Stats {
    pub const fn from_bytes(bytes: [u8; 6]) -> Self {
        Stats {
            hp: bytes[0],
            atk: bytes[1],
            def: bytes[2],
            spe: bytes[3],
            spa: bytes[4],
            spd: bytes[5],
        }
    }

    pub fn from_30_bits(bytes: [u8; 4]) -> Self {
        let iv_bytes = u32::from_le_bytes(bytes);
        Stats {
            hp: (iv_bytes & 0x1f).try_into().unwrap(),
            atk: ((iv_bytes >> 5) & 0x1f).try_into().unwrap(),
            def: ((iv_bytes >> 10) & 0x1f).try_into().unwrap(),
            spe: ((iv_bytes >> 15) & 0x1f).try_into().unwrap(),
            spa: ((iv_bytes >> 20) & 0x1f).try_into().unwrap(),
            spd: ((iv_bytes >> 25) & 0x1f).try_into().unwrap(),
        }
    }

    pub fn from_hyper_train_bytes(bytes: [u8; 6]) -> Self {
        Stats {
            hp: bytes[0],
            atk: bytes[1],
            def: bytes[2],
            spa: bytes[3],
            spd: bytes[4],
            spe: bytes[5],
        }
    }
}

#[derive(Debug, Default, Serialize)]
pub struct StatsPreSplit {
    hp: u16,
    atk: u16,
    def: u16,
    spc: u16,
    spe: u16,
}

impl StatsPreSplit {
    pub fn from_bytes_be(bytes: [u8; 10]) -> Self {
        StatsPreSplit {
            hp: u16::from_be_bytes(to_sized_array(&bytes[0..2])),
            atk: u16::from_be_bytes(to_sized_array(&bytes[2..4])),
            def: u16::from_be_bytes(to_sized_array(&bytes[4..6])),
            spe: u16::from_be_bytes(to_sized_array(&bytes[6..8])),
            spc: u16::from_be_bytes(to_sized_array(&bytes[8..10])),
        }
    }

    pub fn from_dv_bytes(bytes: [u8; 2]) -> Self {
        let dv_bytes = u16::from_be_bytes(bytes);
        StatsPreSplit {
            spc: dv_bytes & 0x0f,
            spe: (dv_bytes >> 4) & 0x0f,
            def: (dv_bytes >> 8) & 0x0f,
            atk: (dv_bytes >> 12) & 0x0f,
            hp: (((dv_bytes >> 12) & 1) << 3)
                | (((dv_bytes >> 8) & 1) << 2)
                | (((dv_bytes >> 4) & 1) << 1)
                | (dv_bytes & 1),
        }
    }
}

#[derive(Debug, Default, Serialize, Clone, Copy)]
pub enum Gender {
    #[default]
    Male,
    Female,
    Genderless,
    Error,
}

impl From<bool> for Gender {
    fn from(value: bool) -> Self {
        match value {
            true => Self::Female,
            false => Self::Male,
        }
    }
}

impl From<u8> for Gender {
    fn from(value: u8) -> Self {
        match value {
            0 => Self::Male,
            1 => Self::Female,
            2 => Self::Genderless,
            _ => Self::Error,
        }
    }
}

impl From<Gender> for u8 {
    fn from(val: Gender) -> Self {
        match val {
            Gender::Male => 0,
            Gender::Female => 1,
            Gender::Genderless => 2,
            Gender::Error => 255,
        }
    }
}

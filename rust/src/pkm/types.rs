use super::util::bit_is_set;
use crate::pkm::util::to_sized_array;
use serde::{Serialize, Serializer};

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

    pub fn to_bytes(&self) -> [u8; 6] {
        [self.hp, self.atk, self.def, self.spe, self.spa, self.spd]
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
}

#[derive(Debug, Default, Serialize)]
pub struct HyperTraining {
    hp: bool,
    atk: bool,
    def: bool,
    spa: bool,
    spd: bool,
    spe: bool,
}

impl HyperTraining {
    pub fn from_byte(byte: u8) -> Self {
        HyperTraining {
            hp: bit_is_set(byte, 0),
            atk: bit_is_set(byte, 1),
            def: bit_is_set(byte, 2),
            spa: bit_is_set(byte, 3),
            spd: bit_is_set(byte, 4),
            spe: bit_is_set(byte, 5),
        }
    }

    pub fn to_byte(&self) -> u8 {
        (self.hp as u8)
            | ((self.atk as u8) << 1)
            | ((self.def as u8) << 2)
            | ((self.spa as u8) << 3)
            | ((self.spd as u8) << 4)
            | ((self.spe as u8) << 5)
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

#[derive(Debug, Default, Serialize)]
pub struct ContestStats {
    cool: u8,
    beauty: u8,
    cute: u8,
    smart: u8,
    tough: u8,
    sheen: u8,
}

impl ContestStats {
    pub fn from_bytes(bytes: [u8; 6]) -> Self {
        ContestStats {
            cool: bytes[0],
            beauty: bytes[1],
            cute: bytes[2],
            smart: bytes[3],
            tough: bytes[4],
            sheen: bytes[5],
        }
    }

    pub fn to_bytes(&self) -> [u8; 6] {
        [
            self.cool,
            self.beauty,
            self.cute,
            self.smart,
            self.tough,
            self.sheen,
        ]
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

#[derive(Debug, Clone, Copy)]
pub struct FlagSet<const N: usize> {
    raw: [u8; N],
}

impl<const N: usize> FlagSet<N> {
    pub fn from_bytes(bytes: [u8; N]) -> Self {
        FlagSet { raw: bytes }
    }

    fn get_indices(&self) -> Vec<usize> {
        self.raw
            .iter()
            .enumerate()
            .flat_map(|(i, &byte)| {
                let mut indices = vec![];
                let mut remaining = byte;
                let base = i * 8;

                while remaining != 0 {
                    let bit_pos = remaining.trailing_zeros() as usize;
                    indices.push(base + bit_pos);
                    remaining &= remaining - 1;
                }
                indices
            })
            .collect()
    }
}

impl<const N: usize> Serialize for FlagSet<N> {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_bytes(&self.raw)
    }
}

impl<const N: usize> Default for FlagSet<N> {
    fn default() -> Self {
        Self { raw: [0; N] }
    }
}

#[cfg(test)]
mod tests {
    use crate::pkm::types::FlagSet;

    #[test]
    fn flagset_indices() {
        let flagset = FlagSet {
            raw: [0b10010100, 0b10110010],
        };
        println!("{:?}", flagset.get_indices());
    }
}

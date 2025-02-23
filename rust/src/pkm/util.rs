use num::{self};

pub fn int_from_buffer_bits_le<T>(
    bytes: &[u8],
    byte_offset: usize,
    bit_offset: u32,
    bit_count: u32,
) -> Result<T, Box<dyn std::error::Error>>
where
    T: num::PrimInt + std::convert::TryFrom<u64>,
    <T as TryFrom<u64>>::Error: std::error::Error,
    <T as TryFrom<u64>>::Error: 'static,
{
    let chunk_byte_count = (bit_offset + bit_count).div_ceil(8);
    if chunk_byte_count == 1 {
        let _c: u64 = (*bytes.get(byte_offset).ok_or("byte_offset out of bounds")?).into();
    }

    let chunk_value: u64 = match chunk_byte_count {
        1 => bytes[byte_offset..byte_offset + 1]
            .try_into()
            .map(u8::from_le_bytes)?
            .into(),
        2 => bytes[byte_offset..byte_offset + 2]
            .try_into()
            .map(u16::from_le_bytes)?
            .into(),
        3..4 => bytes[byte_offset..byte_offset + 4]
            .try_into()
            .map(u32::from_le_bytes)?
            .into(),
        _ => Err("bit_count must be <= 32")?,
    };

    let bit_mask = 2_u64.pow(bit_count - 1);
    let masked: u64 = (chunk_value >> bit_offset) & bit_mask;
    let masked: T = masked.try_into()?;
    Ok(masked)
}

pub fn int_from_buffer_bits_be<T>(
    bytes: &[u8],
    byte_offset: usize,
    bit_offset: u32,
    bit_count: u32,
) -> Result<T, Box<dyn std::error::Error>>
where
    T: num::PrimInt + std::convert::TryFrom<u64>,
    <T as TryFrom<u64>>::Error: std::error::Error,
    <T as TryFrom<u64>>::Error: 'static,
{
    let chunk_byte_count = (bit_offset + bit_count).div_ceil(8);
    if chunk_byte_count == 1 {
        let _c: u64 = (*bytes.get(byte_offset).ok_or("byte_offset out of bounds")?).into();
    }

    let chunk_value: u64 = match chunk_byte_count {
        1 => bytes[byte_offset..byte_offset + 1]
            .try_into()
            .map(u8::from_be_bytes)?
            .into(),
        2 => bytes[byte_offset..byte_offset + 2]
            .try_into()
            .map(u16::from_be_bytes)?
            .into(),
        3..4 => bytes[byte_offset..byte_offset + 4]
            .try_into()
            .map(u32::from_be_bytes)?
            .into(),
        _ => Err("bit_count must be <= 32")?,
    };

    let bit_mask = 2_u64.pow(bit_count - 1);
    let masked: u64 = (chunk_value >> bit_offset) & bit_mask;
    let masked: T = masked.try_into()?;
    Ok(masked)
}
// pub fn u8_from_buffer_bits<T>(
//     bytes: Vec<u8>,
//     byte_offset: usize,
//     bit_offset: usize,
//     bit_count: usize,
//     little_endian: bool,
// ) where
//     T: num::PrimInt,
// {
//     let byte_count = std::mem::size_of::<T>();
//     let value_bytes: Vec<T> = vec![T::zero(); byte_count];
//     for byte_idx in 0..byte_count {
//         for bit_idx in 0..(u8::BITS as usize) {

//         }
//     }
// }

pub fn get_flag(bytes: &[u8], byte_offset: u32, bit_index: u32) -> bool {
    let byte_index = (byte_offset + (bit_index / 8)) as usize;
    if byte_index >= bytes.len() {
        panic!(
            "attempting to read flag out of range (byte {} of {})",
            byte_index,
            bytes.len()
        );
    }
    let bit_index = bit_index % 8;
    ((bytes[byte_index] >> bit_index) & 1) == 1
}

pub fn to_sized_array<A, T>(slice: &[T]) -> A
where
    A: Default + AsMut<[T]>,
    T: Clone,
{
    let mut a = A::default();
    <A as AsMut<[T]>>::as_mut(&mut a).clone_from_slice(slice);
    a
}

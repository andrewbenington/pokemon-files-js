use crate::conversion::gen3_string_encoding::from_gen3_string_encoding;

pub fn utf16_be_from_bytes(bytes: Vec<u8>) -> Result<String, String> {
    let u16_values: Vec<u16> = bytes
        .chunks_exact(2)
        .map(|chunk| u16::from_be_bytes([chunk[1], chunk[0]]))
        .collect();

    return String::from_utf16(&u16_values).map_err(|e| format!("{:?}", e));
}

pub fn gen3_string_from_bytes(bytes: Vec<u8>) -> String {
    return bytes
        .iter()
        .map(from_gen3_string_encoding)
        .map(|o| o.unwrap_or('\u{FFFD}'))
        .collect();
}

pub fn gen5_string_from_bytes(bytes: Vec<u8>) -> Result<String, String> {
    let u16_values: Vec<u16> = bytes
        .chunks_exact(2)
        .map(|chunk| u16::from_be_bytes([chunk[1], chunk[0]]))
        .take_while(|val| *val != 0xffff)
        .collect();

    return String::from_utf16(&u16_values).map_err(|e| format!("{:?}", e));
}

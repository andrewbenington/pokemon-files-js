pub fn from_be_bytes(bytes: Vec<u8>) -> String {
    let u16_values: Vec<u16> = bytes
        .chunks_exact(2)
        .map(|chunk| u16::from_be_bytes([chunk[1], chunk[0]]))
        .take_while(|c| *c != 0)
        .collect();
    String::from_utf16_lossy(&u16_values)
}

pub fn to_be_bytes(str: &str) -> Vec<u8> {
    str.encode_utf16()
        .flat_map(|val| val.to_be_bytes())
        .collect()
}

pub trait Pkm<const B: usize, const P: usize>: Sized {
    const BOX_SIZE: usize;
    const PARTY_SIZE: usize;

    fn from_bytes(bytes: &[u8]) -> Result<Self, String>;
    fn write_bytes(&self, bytes: &mut [u8; B]);
    fn to_box_bytes(&self) -> [u8; B];
    fn to_party_bytes(&self) -> [u8; P];
}

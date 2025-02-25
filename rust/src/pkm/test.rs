use std::{fs::File, io::Read};

use serde::Serialize;

use super::Pkm;

mod pk4;

pub fn pkm_from_file_sized<const B: usize, const P: usize, PK>(filename: &str) -> Result<PK, String>
where
    PK: Serialize + Pkm<B, P>,
{
    let mut file = File::open(filename).map_err(|e| e.to_string()).unwrap();

    let mut contents = Vec::new();
    file.read_to_end(&mut contents)
        .map_err(|e| e.to_string())
        .unwrap();

    PK::from_bytes(&contents)
}

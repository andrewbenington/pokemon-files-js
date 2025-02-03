use std::{fs::File, io::Read};

use pkm::PK8;

mod conversion;
mod pkm;

fn main() {
    let mut file = File::open("./regidrago.pk8")
        .map_err(|e| e.to_string())
        .unwrap();

    let mut contents = Vec::new();
    file.read_to_end(&mut contents)
        .map_err(|e| e.to_string())
        .unwrap();

    let mon = PK8::from_bytes(contents);
    match mon {
        Err(e) => println!("error building mon: {}", e),
        Ok(mon) => println!("{:?}", mon),
    }
}

use std::{fs::File, io::Read};

use pkm::{Pkm, PA8, PB7, PK2, PK3, PK5, PK8, PK9};
use serde::Serialize;

mod conversion;
mod pkm;

macro_rules! load_and_print_pkm {
    ($pkm_struct:ty, $filename:expr) => {
        load_and_print_pkm_sized::<
            { <$pkm_struct>::BOX_SIZE },
            { <$pkm_struct>::PARTY_SIZE },
            $pkm_struct,
        >($filename)
    };
}

fn main() {
    // load_and_print_pkm!(PK2, "./jumpluff.pk2");
    // load_and_print_pkm!(PK3, "./ho-oh.pkm");
    // load_and_print_pkm!(PK5, "./gothorita.pk5");
    // load_and_print_pkm!(PB7, "./rapidash.pb7");
    // load_and_print_pkm!(PK8, "./regidrago.pk8");
    // load_and_print_pkm!(PK8, "./urshifu.pk8");
    // load_and_print_pkm!(PA8, "./braviary.pa8");
    load_and_print_pkm!(PK9, "./floatzel.pk9");
}

fn load_and_print_pkm_sized<const B: usize, const P: usize, PK>(filename: &str)
where
    PK: Serialize + Pkm<B, P>,
{
    let mut file = File::open(filename).map_err(|e| e.to_string()).unwrap();

    let mut contents = Vec::new();
    file.read_to_end(&mut contents)
        .map_err(|e| e.to_string())
        .unwrap();

    let mon = PK::from_bytes(&contents);
    match mon {
        Err(e) => println!("error building mon: {}", e),
        Ok(mon) => println!("{}", toml::to_string(&mon).unwrap()),
    }
}

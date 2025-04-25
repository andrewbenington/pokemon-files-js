use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;
use std::path::Path;

#[derive(Debug, Serialize, Deserialize)]
struct Move {
    name: String,
    class: String,
}

fn main() {
    let json_path = Path::new("json").join("moves.json");
    let json_data = fs::read_to_string(json_path).expect("Failed to read JSON file");

    let moves: HashMap<String, Move> =
        serde_json::from_str(&json_data).expect("Failed to parse JSON");

    let mut map_string = String::from("");

    for (num_str, move_data) in moves.into_iter() {
        map_string.push_str(format!("({num_str}, {:?})\n", move_data).as_str());
    }

    let generated_code =
        format!("static MOVES: HashMap<String, Move> = HashMap::from([{map_string}]);");

    fs::create_dir_all(Path::new("src").join("generated")).expect("Failed to create directory");

    fs::write("src/generated/moves.rs", generated_code).expect("Failed to write generated file");
}

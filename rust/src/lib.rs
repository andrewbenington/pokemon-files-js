use serde_wasm_bindgen::to_value;
use wasm_bindgen::prelude::*; // For serialization to JS objects

#[wasm_bindgen]
pub struct WasmPK6 {
    inner: PK6,
}

#[wasm_bindgen]
impl WasmPK6 {
    #[wasm_bindgen(constructor)]
    pub fn new() -> WasmPK6 {
        WasmPK6 {
            inner: PK6::default(),
        }
    }

    #[wasm_bindgen(js_name = fromBytes)]
    pub fn from_bytes(bytes: Vec<u8>) -> Result<WasmPK6, JsValue> {
        PK6::from_bytes(&bytes)
            .map(|pk6| WasmPK6 { inner: pk6 })
            .map_err(|e| JsValue::from_str(&e))
    }

    #[wasm_bindgen(js_name = toBoxBytes)]
    pub fn to_box_bytes(&self) -> Vec<u8> {
        self.inner.to_box_bytes().to_vec()
    }

    #[wasm_bindgen(js_name = toPartyBytes)]
    pub fn to_party_bytes(&self) -> Vec<u8> {
        self.inner.to_party_bytes().to_vec()
    }

    #[wasm_bindgen(js_name = getNickname)]
    pub fn get_nickname(&self) -> String {
        self.inner.nickname.clone()
    }

    #[wasm_bindgen(js_name = setNickname)]
    pub fn set_nickname(&mut self, nickname: String) {
        self.inner.nickname = nickname;
    }

    #[wasm_bindgen(js_name = toJson)]
    pub fn to_json(&self) -> JsValue {
        to_value(&self.inner).unwrap()
    }
}

export const fromGen1PokemonIndexMap: { [key: number]: number } = {
  8: 80,
  35: 22,
  48: 96,
  117: 57,
  163: 77,
  13: 88,
  17: 104,
  19: 131,
  108: 23,
  165: 19,
  34: 95,
  44: 107,
  51: 126,
  171: 142,
  27: 120,
  30: 114,
  58: 86,
  74: 144,
  75: 145,
  155: 73,
  24: 72,
  66: 149,
  96: 27,
  105: 134,
  123: 10,
  143: 110,
  150: 17,
  153: 1,
  169: 74,
  28: 9,
  29: 127,
  116: 85,
  119: 49,
  139: 91,
  188: 69,
  5: 21,
  39: 75,
  40: 113,
  49: 76,
  90: 140,
  126: 68,
  91: 141,
  97: 28,
  149: 65,
  158: 119,
  164: 78,
  57: 56,
  109: 46,
  112: 13,
  130: 42,
  144: 53,
  148: 63,
  185: 43,
  187: 45,
  20: 59,
  22: 130,
  46: 47,
  65: 48,
  85: 26,
  101: 40,
  120: 87,
  133: 129,
  141: 101,
  16: 31,
  76: 132,
  88: 147,
  9: 2,
  36: 16,
  82: 37,
  132: 143,
  178: 5,
  180: 6,
  55: 109,
  59: 50,
  71: 60,
  72: 124,
  152: 121,
  157: 118,
  166: 20,
  168: 30,
  15: 29,
  93: 117,
  104: 135,
  107: 41,
  124: 11,
  129: 97,
  189: 70,
  12: 102,
  21: 151,
  26: 123,
  42: 122,
  128: 55,
  167: 33,
  41: 67,
  43: 106,
  47: 54,
  177: 7,
  100: 39,
  131: 150,
  190: 71,
  111: 62,
  1: 112,
  53: 125,
  70: 84,
  77: 52,
  89: 148,
  92: 116,
  145: 105,
  38: 64,
  110: 61,
  6: 100,
  18: 111,
  64: 83,
  106: 66,
  170: 137,
  0: 0,
  2: 115,
  7: 34,
  73: 146,
  186: 44,
  99: 139,
  102: 133,
  113: 14,
  125: 12,
  151: 18,
  78: 98,
  118: 51,
  138: 99,
  154: 3,
  176: 4,
  3: 32,
  11: 108,
  33: 58,
  98: 138,
  136: 89,
  45: 24,
  173: 81,
  25: 92,
  60: 128,
  83: 38,
  84: 25,
  103: 136,
  4: 35,
  10: 103,
  23: 90,
  114: 15,
  147: 93,
  179: 8,
  14: 94,
  37: 79,
  54: 82,
  142: 36,
}

export function fromGen1PokemonIndex(key: number): number {
  if (key in fromGen1PokemonIndexMap) {
    return fromGen1PokemonIndexMap[key]
  }
  return key
}

export const toGen1PokemonIndexMap: { [key: number]: number } = {
  47: 46,
  48: 65,
  26: 85,
  40: 101,
  59: 20,
  130: 22,
  101: 141,
  87: 120,
  129: 133,
  147: 88,
  31: 16,
  132: 76,
  37: 82,
  143: 132,
  5: 178,
  6: 180,
  2: 9,
  16: 36,
  60: 71,
  124: 72,
  121: 152,
  118: 157,
  109: 55,
  50: 59,
  135: 104,
  41: 107,
  11: 124,
  97: 129,
  20: 166,
  30: 168,
  29: 15,
  117: 93,
  70: 189,
  123: 26,
  122: 42,
  55: 128,
  33: 167,
  102: 12,
  151: 21,
  54: 47,
  7: 177,
  67: 41,
  106: 43,
  71: 190,
  39: 100,
  150: 131,
  84: 70,
  52: 77,
  148: 89,
  116: 92,
  62: 111,
  112: 1,
  125: 53,
  105: 145,
  64: 38,
  61: 110,
  83: 64,
  66: 106,
  137: 170,
  100: 6,
  111: 18,
  34: 7,
  146: 73,
  44: 186,
  0: 0,
  115: 2,
  139: 99,
  12: 125,
  18: 151,
  133: 102,
  14: 113,
  99: 138,
  3: 154,
  4: 176,
  98: 78,
  51: 118,
  58: 33,
  138: 98,
  89: 136,
  32: 3,
  108: 11,
  24: 45,
  81: 173,
  38: 83,
  25: 84,
  136: 103,
  92: 25,
  128: 60,
  90: 23,
  15: 114,
  93: 147,
  8: 179,
  35: 4,
  103: 10,
  82: 54,
  36: 142,
  94: 14,
  79: 37,
  96: 48,
  57: 117,
  77: 163,
  80: 8,
  22: 35,
  131: 19,
  23: 108,
  19: 165,
  88: 13,
  104: 17,
  126: 51,
  95: 34,
  107: 44,
  86: 58,
  144: 74,
  145: 75,
  73: 155,
  142: 171,
  120: 27,
  114: 30,
  27: 96,
  134: 105,
  10: 123,
  110: 143,
  72: 24,
  149: 66,
  74: 169,
  17: 150,
  1: 153,
  85: 116,
  49: 119,
  91: 139,
  69: 188,
  9: 28,
  127: 29,
  113: 40,
  76: 49,
  140: 90,
  68: 126,
  21: 5,
  75: 39,
  65: 149,
  141: 91,
  28: 97,
  13: 112,
  42: 130,
  53: 144,
  63: 148,
  119: 158,
  78: 164,
  56: 57,
  46: 109,
  43: 185,
  45: 187,
}

export function toGen1PokemonIndex(key: number): number {
  if (key in toGen1PokemonIndexMap) {
    return toGen1PokemonIndexMap[key]
  }
  return key
}

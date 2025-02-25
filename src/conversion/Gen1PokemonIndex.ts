export const fromGen1PokemonIndexMap: { [key: number]: number } = {
  0: 0,
  1: 112,
  2: 115,
  3: 32,
  4: 35,
  5: 21,
  6: 100,
  7: 34,
  8: 80,
  9: 2,
  10: 103,
  11: 108,
  12: 102,
  13: 88,
  14: 94,
  15: 29,
  16: 31,
  17: 104,
  18: 111,
  19: 131,
  20: 59,
  21: 151,
  22: 130,
  23: 90,
  24: 72,
  25: 92,
  26: 123,
  27: 120,
  28: 9,
  29: 127,
  30: 114,
  33: 58,
  34: 95,
  35: 22,
  36: 16,
  37: 79,
  38: 64,
  39: 75,
  40: 113,
  41: 67,
  42: 122,
  43: 106,
  44: 107,
  45: 24,
  46: 47,
  47: 54,
  48: 96,
  49: 76,
  51: 126,
  53: 125,
  54: 82,
  55: 109,
  57: 56,
  58: 86,
  59: 50,
  60: 128,
  64: 83,
  65: 48,
  66: 149,
  70: 84,
  71: 60,
  72: 124,
  73: 146,
  74: 144,
  75: 145,
  76: 132,
  77: 52,
  78: 98,
  82: 37,
  83: 38,
  84: 25,
  85: 26,
  88: 147,
  89: 148,
  90: 140,
  91: 141,
  92: 116,
  93: 117,
  96: 27,
  97: 28,
  98: 138,
  99: 139,
  100: 39,
  101: 40,
  102: 133,
  103: 136,
  104: 135,
  105: 134,
  106: 66,
  107: 41,
  108: 23,
  109: 46,
  110: 61,
  111: 62,
  112: 13,
  113: 14,
  114: 15,
  116: 85,
  117: 57,
  118: 51,
  119: 49,
  120: 87,
  123: 10,
  124: 11,
  125: 12,
  126: 68,
  128: 55,
  129: 97,
  130: 42,
  131: 150,
  132: 143,
  133: 129,
  136: 89,
  138: 99,
  139: 91,
  141: 101,
  142: 36,
  143: 110,
  144: 53,
  145: 105,
  147: 93,
  148: 63,
  149: 65,
  150: 17,
  151: 18,
  152: 121,
  153: 1,
  154: 3,
  155: 73,
  157: 118,
  158: 119,
  163: 77,
  164: 78,
  165: 19,
  166: 20,
  167: 33,
  168: 30,
  169: 74,
  170: 137,
  171: 142,
  173: 81,
  176: 4,
  177: 7,
  178: 5,
  179: 8,
  180: 6,
  185: 43,
  186: 44,
  187: 45,
  188: 69,
  189: 70,
  190: 71,
}

export function fromGen1PokemonIndex(key: number): number {
  if (key in fromGen1PokemonIndexMap) {
    return fromGen1PokemonIndexMap[key]
  }
  return key
}

export const toGen1PokemonIndexMap: { [key: number]: number } = {
  0: 0,
  112: 1,
  115: 2,
  32: 3,
  35: 4,
  21: 5,
  100: 6,
  34: 7,
  80: 8,
  2: 9,
  103: 10,
  108: 11,
  102: 12,
  88: 13,
  94: 14,
  29: 15,
  31: 16,
  104: 17,
  111: 18,
  131: 19,
  59: 20,
  151: 21,
  130: 22,
  90: 23,
  72: 24,
  92: 25,
  123: 26,
  120: 27,
  9: 28,
  127: 29,
  114: 30,
  58: 33,
  95: 34,
  22: 35,
  16: 36,
  79: 37,
  64: 38,
  75: 39,
  113: 40,
  67: 41,
  122: 42,
  106: 43,
  107: 44,
  24: 45,
  47: 46,
  54: 47,
  96: 48,
  76: 49,
  126: 51,
  125: 53,
  82: 54,
  109: 55,
  56: 57,
  86: 58,
  50: 59,
  128: 60,
  83: 64,
  48: 65,
  149: 66,
  84: 70,
  60: 71,
  124: 72,
  146: 73,
  144: 74,
  145: 75,
  132: 76,
  52: 77,
  98: 78,
  37: 82,
  38: 83,
  25: 84,
  26: 85,
  147: 88,
  148: 89,
  140: 90,
  141: 91,
  116: 92,
  117: 93,
  27: 96,
  28: 97,
  138: 98,
  139: 99,
  39: 100,
  40: 101,
  133: 102,
  136: 103,
  135: 104,
  134: 105,
  66: 106,
  41: 107,
  23: 108,
  46: 109,
  61: 110,
  62: 111,
  13: 112,
  14: 113,
  15: 114,
  85: 116,
  57: 117,
  51: 118,
  49: 119,
  87: 120,
  10: 123,
  11: 124,
  12: 125,
  68: 126,
  55: 128,
  97: 129,
  42: 130,
  150: 131,
  143: 132,
  129: 133,
  89: 136,
  99: 138,
  91: 139,
  101: 141,
  36: 142,
  110: 143,
  53: 144,
  105: 145,
  93: 147,
  63: 148,
  65: 149,
  17: 150,
  18: 151,
  121: 152,
  1: 153,
  3: 154,
  73: 155,
  118: 157,
  119: 158,
  77: 163,
  78: 164,
  19: 165,
  20: 166,
  33: 167,
  30: 168,
  74: 169,
  137: 170,
  142: 171,
  81: 173,
  4: 176,
  7: 177,
  5: 178,
  8: 179,
  6: 180,
  43: 185,
  44: 186,
  45: 187,
  69: 188,
  70: 189,
  71: 190,
}

export function toGen1PokemonIndex(key: number): number {
  if (key in toGen1PokemonIndexMap) {
    return toGen1PokemonIndexMap[key]
  }
  return key
}

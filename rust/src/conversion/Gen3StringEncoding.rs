static from_gen3_string_encoding_map: HashMap<u8,u8> = vec![(0, " "), (1, "À"), (2, "Á"), (3, "Â"), (4, "Ç"), (5, "È"), (6, "É"), (7, "Ê"), (8, "Ë"), (9, "Ì"), (10, "こ"), (11, "Î"), (12, "Ï"), (13, "Ò"), (14, "Ó"), (15, "Ô"), (16, "Œ"), (17, "Ù"), (18, "Ú"), (19, "Û"), (20, "Ñ"), (21, "ß"), (22, "à"), (23, "á"), (24, "ね"), (25, "Ç"), (26, "È"), (27, "é"), (28, "ê"), (29, "ë"), (30, "ì"), (31, "í"), (32, "î"), (33, "ï"), (34, "ò"), (35, "ó"), (36, "ô"), (37, "œ"), (38, "ù"), (39, "ú"), (40, "û"), (41, "ñ"), (42, "º"), (43, "ª"), (44, "⒅"), (45, "&"), (46, "+"), (47, "あ"), (48, "ぃ"), (49, "ぅ"), (50, "ぇ"), (51, "ぉ"), (52, "ゃ"), (53, "="), (54, "ょ"), (55, "が"), (56, "ぎ"), (57, "ぐ"), (58, "げ"), (59, "ご"), (60, "ざ"), (61, "じ"), (62, "ず"), (63, "ぜ"), (64, "ぞ"), (65, "だ"), (66, "ぢ"), (67, "づ"), (68, "で"), (69, "ど"), (70, "ば"), (71, "び"), (72, "ぶ"), (73, "べ"), (74, "ぼ"), (75, "ぱ"), (76, "ぴ"), (77, "ぷ"), (78, "ぺ"), (79, "ぽ"), (80, "っ"), (81, "¿"), (82, "¡"), (83, "PK"), (84, "MN"), (85, "オ"), (86, "カ"), (87, "キ"), (88, "ク"), (89, "ケ"), (90, "Í"), (91, "コ"), (92, "サ"), (93, "ス"), (94, "セ"), (95, "ソ"), (96, "タ"), (97, "チ"), (98, "ツ"), (99, "テ"), (100, "ト"), (101, "ナ"), (102, "ニ"), (103, "ヌ"), (104, "â"), (105, "ノ"), (106, "ハ"), (107, "ヒ"), (108, "フ"), (109, "ヘ"), (110, "ホ"), (111, "í"), (112, "ミ"), (113, "ム"), (114, "メ"), (115, "モ"), (116, "ヤ"), (117, "ユ"), (118, "ヨ"), (119, "ラ"), (120, "リ"), (121, "ル"), (122, "レ"), (123, "ロ"), (124, "ワ"), (125, "ヲ"), (126, "ン"), (127, "ァ"), (128, "ィ"), (129, "ゥ"), (130, "ェ"), (131, "ォ"), (132, "ャ"), (133, "ュ"), (134, "ョ"), (135, "ガ"), (136, "ギ"), (137, "グ"), (138, "ゲ"), (139, "ゴ"), (140, "ザ"), (141, "ジ"), (142, "ズ"), (143, "ゼ"), (144, "ゾ"), (145, "ダ"), (146, "ヂ"), (147, "ヅ"), (148, "デ"), (149, "ド"), (150, "バ"), (151, "ビ"), (152, "ブ"), (153, "ベ"), (154, "ボ"), (155, "パ"), (156, "ピ"), (157, "プ"), (158, "ペ"), (159, "ポ"), (160, "ッ"), (161, "0"), (162, "1"), (163, "2"), (164, "3"), (165, "4"), (166, "5"), (167, "6"), (168, "7"), (169, "8"), (170, "9"), (171, "!"), (172, "?"), (173, "."), (174, "-"), (175, "・"), (176, "…"), (177, "“"), (178, "”"), (179, "‘"), (180, "’"), (181, "♂"), (182, "♀"), (183, "$"), (184, ","), (185, "⑧"), (186, "/"), (187, "A"), (188, "B"), (189, "C"), (190, "D"), (191, "E"), (192, "F"), (193, "G"), (194, "H"), (195, "I"), (196, "J"), (197, "K"), (198, "L"), (199, "M"), (200, "N"), (201, "O"), (202, "P"), (203, "Q"), (204, "R"), (205, "S"), (206, "T"), (207, "U"), (208, "V"), (209, "W"), (210, "X"), (211, "Y"), (212, "Z"), (213, "a"), (214, "b"), (215, "c"), (216, "d"), (217, "e"), (218, "f"), (219, "g"), (220, "h"), (221, "i"), (222, "j"), (223, "k"), (224, "l"), (225, "m"), (226, "n"), (227, "o"), (228, "p"), (229, "q"), (230, "r"), (231, "s"), (232, "t"), (233, "u"), (234, "v"), (235, "w"), (236, "x"), (237, "y"), (238, "z"), (239, "0"), (240, ":"), (241, "Ä"), (242, "Ö"), (243, "Ü"), (244, "ä"), (245, "ö"), (246, "ü")].into_iter().collect();

export function fromGen3StringEncoding(key: number): string {
	if (key in fromGen3StringEncodingMap) {
		return fromGen3StringEncodingMap[key]
	}
	return `${key}`
}

export const toGen3StringEncodingMap: { [key: string]: number } = {
" ": 0,
"À": 1,
"Á": 2,
"Â": 3,
"Ç": 4,
"È": 5,
"É": 6,
"Ê": 7,
"Ë": 8,
"Ì": 9,
"こ": 10,
"Î": 11,
"Ï": 12,
"Ò": 13,
"Ó": 14,
"Ô": 15,
"Œ": 16,
"Ù": 17,
"Ú": 18,
"Û": 19,
"Ñ": 20,
"ß": 21,
"à": 22,
"á": 23,
"ね": 24,
"é": 27,
"ê": 28,
"ë": 29,
"ì": 30,
"í": 31,
"î": 32,
"ï": 33,
"ò": 34,
"ó": 35,
"ô": 36,
"œ": 37,
"ù": 38,
"ú": 39,
"û": 40,
"ñ": 41,
"º": 42,
"ª": 43,
"⒅": 44,
"&": 45,
"+": 46,
"あ": 47,
"ぃ": 48,
"ぅ": 49,
"ぇ": 50,
"ぉ": 51,
"ゃ": 52,
"=": 53,
"ょ": 54,
"が": 55,
"ぎ": 56,
"ぐ": 57,
"げ": 58,
"ご": 59,
"ざ": 60,
"じ": 61,
"ず": 62,
"ぜ": 63,
"ぞ": 64,
"だ": 65,
"ぢ": 66,
"づ": 67,
"で": 68,
"ど": 69,
"ば": 70,
"び": 71,
"ぶ": 72,
"べ": 73,
"ぼ": 74,
"ぱ": 75,
"ぴ": 76,
"ぷ": 77,
"ぺ": 78,
"ぽ": 79,
"っ": 80,
"¿": 81,
"¡": 82,
"PK": 83,
"MN": 84,
"オ": 85,
"カ": 86,
"キ": 87,
"ク": 88,
"ケ": 89,
"Í": 90,
"コ": 91,
"サ": 92,
"ス": 93,
"セ": 94,
"ソ": 95,
"タ": 96,
"チ": 97,
"ツ": 98,
"テ": 99,
"ト": 100,
"ナ": 101,
"ニ": 102,
"ヌ": 103,
"â": 104,
"ノ": 105,
"ハ": 106,
"ヒ": 107,
"フ": 108,
"ヘ": 109,
"ホ": 110,
"ミ": 112,
"ム": 113,
"メ": 114,
"モ": 115,
"ヤ": 116,
"ユ": 117,
"ヨ": 118,
"ラ": 119,
"リ": 120,
"ル": 121,
"レ": 122,
"ロ": 123,
"ワ": 124,
"ヲ": 125,
"ン": 126,
"ァ": 127,
"ィ": 128,
"ゥ": 129,
"ェ": 130,
"ォ": 131,
"ャ": 132,
"ュ": 133,
"ョ": 134,
"ガ": 135,
"ギ": 136,
"グ": 137,
"ゲ": 138,
"ゴ": 139,
"ザ": 140,
"ジ": 141,
"ズ": 142,
"ゼ": 143,
"ゾ": 144,
"ダ": 145,
"ヂ": 146,
"ヅ": 147,
"デ": 148,
"ド": 149,
"バ": 150,
"ビ": 151,
"ブ": 152,
"ベ": 153,
"ボ": 154,
"パ": 155,
"ピ": 156,
"プ": 157,
"ペ": 158,
"ポ": 159,
"ッ": 160,
"0": 161,
"1": 162,
"2": 163,
"3": 164,
"4": 165,
"5": 166,
"6": 167,
"7": 168,
"8": 169,
"9": 170,
"!": 171,
"?": 172,
".": 173,
"-": 174,
"・": 175,
"…": 176,
"“": 177,
"”": 178,
"‘": 179,
"’": 180,
"♂": 181,
"♀": 182,
"$": 183,
",": 184,
"⑧": 185,
"/": 186,
"A": 187,
"B": 188,
"C": 189,
"D": 190,
"E": 191,
"F": 192,
"G": 193,
"H": 194,
"I": 195,
"J": 196,
"K": 197,
"L": 198,
"M": 199,
"N": 200,
"O": 201,
"P": 202,
"Q": 203,
"R": 204,
"S": 205,
"T": 206,
"U": 207,
"V": 208,
"W": 209,
"X": 210,
"Y": 211,
"Z": 212,
"a": 213,
"b": 214,
"c": 215,
"d": 216,
"e": 217,
"f": 218,
"g": 219,
"h": 220,
"i": 221,
"j": 222,
"k": 223,
"l": 224,
"m": 225,
"n": 226,
"o": 227,
"p": 228,
"q": 229,
"r": 230,
"s": 231,
"t": 232,
"u": 233,
"v": 234,
"w": 235,
"x": 236,
"y": 237,
"z": 238,
":": 240,
"Ä": 241,
"Ö": 242,
"Ü": 243,
"ä": 244,
"ö": 245,
"ü": 246,
}

export function toGen3StringEncoding(key: string): number {
	if (key in toGen3StringEncodingMap) {
		return toGen3StringEncodingMap[key]
	}
	return parseFloat(key)
}

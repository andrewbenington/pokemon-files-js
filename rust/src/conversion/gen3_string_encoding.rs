pub fn from_gen3_string_encoding(key: &u8) -> Option<char> {
	return match key {0 => Some(' '),
1 => Some('À'),
2 => Some('Á'),
3 => Some('Â'),
4 => Some('Ç'),
5 => Some('È'),
6 => Some('É'),
7 => Some('Ê'),
8 => Some('Ë'),
9 => Some('Ì'),
10 => Some('こ'),
11 => Some('Î'),
12 => Some('Ï'),
13 => Some('Ò'),
14 => Some('Ó'),
15 => Some('Ô'),
16 => Some('Œ'),
17 => Some('Ù'),
18 => Some('Ú'),
19 => Some('Û'),
20 => Some('Ñ'),
21 => Some('ß'),
22 => Some('à'),
23 => Some('á'),
24 => Some('ね'),
25 => Some('Ç'),
26 => Some('È'),
27 => Some('é'),
28 => Some('ê'),
29 => Some('ë'),
30 => Some('ì'),
31 => Some('í'),
32 => Some('î'),
33 => Some('ï'),
34 => Some('ò'),
35 => Some('ó'),
36 => Some('ô'),
37 => Some('œ'),
38 => Some('ù'),
39 => Some('ú'),
40 => Some('û'),
41 => Some('ñ'),
42 => Some('º'),
43 => Some('ª'),
44 => Some('⒅'),
45 => Some('&'),
46 => Some('+'),
47 => Some('あ'),
48 => Some('ぃ'),
49 => Some('ぅ'),
50 => Some('ぇ'),
51 => Some('ぉ'),
52 => Some('ゃ'),
53 => Some('='),
54 => Some('ょ'),
55 => Some('が'),
56 => Some('ぎ'),
57 => Some('ぐ'),
58 => Some('げ'),
59 => Some('ご'),
60 => Some('ざ'),
61 => Some('じ'),
62 => Some('ず'),
63 => Some('ぜ'),
64 => Some('ぞ'),
65 => Some('だ'),
66 => Some('ぢ'),
67 => Some('づ'),
68 => Some('で'),
69 => Some('ど'),
70 => Some('ば'),
71 => Some('び'),
72 => Some('ぶ'),
73 => Some('べ'),
74 => Some('ぼ'),
75 => Some('ぱ'),
76 => Some('ぴ'),
77 => Some('ぷ'),
78 => Some('ぺ'),
79 => Some('ぽ'),
80 => Some('っ'),
81 => Some('¿'),
82 => Some('¡'),
83 => Some('ᴘ'),
84 => Some('ᴍ'),
85 => Some('オ'),
86 => Some('カ'),
87 => Some('キ'),
88 => Some('ク'),
89 => Some('ケ'),
90 => Some('Í'),
91 => Some('コ'),
92 => Some('サ'),
93 => Some('ス'),
94 => Some('セ'),
95 => Some('ソ'),
96 => Some('タ'),
97 => Some('チ'),
98 => Some('ツ'),
99 => Some('テ'),
100 => Some('ト'),
101 => Some('ナ'),
102 => Some('ニ'),
103 => Some('ヌ'),
104 => Some('â'),
105 => Some('ノ'),
106 => Some('ハ'),
107 => Some('ヒ'),
108 => Some('フ'),
109 => Some('ヘ'),
110 => Some('ホ'),
111 => Some('í'),
112 => Some('ミ'),
113 => Some('ム'),
114 => Some('メ'),
115 => Some('モ'),
116 => Some('ヤ'),
117 => Some('ユ'),
118 => Some('ヨ'),
119 => Some('ラ'),
120 => Some('リ'),
121 => Some('ル'),
122 => Some('レ'),
123 => Some('ロ'),
124 => Some('ワ'),
125 => Some('ヲ'),
126 => Some('ン'),
127 => Some('ァ'),
128 => Some('ィ'),
129 => Some('ゥ'),
130 => Some('ェ'),
131 => Some('ォ'),
132 => Some('ャ'),
133 => Some('ュ'),
134 => Some('ョ'),
135 => Some('ガ'),
136 => Some('ギ'),
137 => Some('グ'),
138 => Some('ゲ'),
139 => Some('ゴ'),
140 => Some('ザ'),
141 => Some('ジ'),
142 => Some('ズ'),
143 => Some('ゼ'),
144 => Some('ゾ'),
145 => Some('ダ'),
146 => Some('ヂ'),
147 => Some('ヅ'),
148 => Some('デ'),
149 => Some('ド'),
150 => Some('バ'),
151 => Some('ビ'),
152 => Some('ブ'),
153 => Some('ベ'),
154 => Some('ボ'),
155 => Some('パ'),
156 => Some('ピ'),
157 => Some('プ'),
158 => Some('ペ'),
159 => Some('ポ'),
160 => Some('ッ'),
161 => Some('0'),
162 => Some('1'),
163 => Some('2'),
164 => Some('3'),
165 => Some('4'),
166 => Some('5'),
167 => Some('6'),
168 => Some('7'),
169 => Some('8'),
170 => Some('9'),
171 => Some('!'),
172 => Some('?'),
173 => Some('.'),
174 => Some('-'),
175 => Some('・'),
176 => Some('…'),
177 => Some('“'),
178 => Some('”'),
179 => Some('‘'),
180 => Some('’'),
181 => Some('♂'),
182 => Some('♀'),
183 => Some('$'),
184 => Some(','),
185 => Some('⑧'),
186 => Some('/'),
187 => Some('A'),
188 => Some('B'),
189 => Some('C'),
190 => Some('D'),
191 => Some('E'),
192 => Some('F'),
193 => Some('G'),
194 => Some('H'),
195 => Some('I'),
196 => Some('J'),
197 => Some('K'),
198 => Some('L'),
199 => Some('M'),
200 => Some('N'),
201 => Some('O'),
202 => Some('P'),
203 => Some('Q'),
204 => Some('R'),
205 => Some('S'),
206 => Some('T'),
207 => Some('U'),
208 => Some('V'),
209 => Some('W'),
210 => Some('X'),
211 => Some('Y'),
212 => Some('Z'),
213 => Some('a'),
214 => Some('b'),
215 => Some('c'),
216 => Some('d'),
217 => Some('e'),
218 => Some('f'),
219 => Some('g'),
220 => Some('h'),
221 => Some('i'),
222 => Some('j'),
223 => Some('k'),
224 => Some('l'),
225 => Some('m'),
226 => Some('n'),
227 => Some('o'),
228 => Some('p'),
229 => Some('q'),
230 => Some('r'),
231 => Some('s'),
232 => Some('t'),
233 => Some('u'),
234 => Some('v'),
235 => Some('w'),
236 => Some('x'),
237 => Some('y'),
238 => Some('z'),
239 => Some('0'),
240 => Some(':'),
241 => Some('Ä'),
242 => Some('Ö'),
243 => Some('Ü'),
244 => Some('ä'),
245 => Some('ö'),
246 => Some('ü'),
_ => None,
}

}

pub fn to_gen3_string_encoding(value: &char) -> Option<u8> {
	return match value {' ' => Some(0),
'À' => Some(1),
'Á' => Some(2),
'Â' => Some(3),
'Ç' => Some(4),
'È' => Some(5),
'É' => Some(6),
'Ê' => Some(7),
'Ë' => Some(8),
'Ì' => Some(9),
'こ' => Some(10),
'Î' => Some(11),
'Ï' => Some(12),
'Ò' => Some(13),
'Ó' => Some(14),
'Ô' => Some(15),
'Œ' => Some(16),
'Ù' => Some(17),
'Ú' => Some(18),
'Û' => Some(19),
'Ñ' => Some(20),
'ß' => Some(21),
'à' => Some(22),
'á' => Some(23),
'ね' => Some(24),
'é' => Some(27),
'ê' => Some(28),
'ë' => Some(29),
'ì' => Some(30),
'í' => Some(31),
'î' => Some(32),
'ï' => Some(33),
'ò' => Some(34),
'ó' => Some(35),
'ô' => Some(36),
'œ' => Some(37),
'ù' => Some(38),
'ú' => Some(39),
'û' => Some(40),
'ñ' => Some(41),
'º' => Some(42),
'ª' => Some(43),
'⒅' => Some(44),
'&' => Some(45),
'+' => Some(46),
'あ' => Some(47),
'ぃ' => Some(48),
'ぅ' => Some(49),
'ぇ' => Some(50),
'ぉ' => Some(51),
'ゃ' => Some(52),
'=' => Some(53),
'ょ' => Some(54),
'が' => Some(55),
'ぎ' => Some(56),
'ぐ' => Some(57),
'げ' => Some(58),
'ご' => Some(59),
'ざ' => Some(60),
'じ' => Some(61),
'ず' => Some(62),
'ぜ' => Some(63),
'ぞ' => Some(64),
'だ' => Some(65),
'ぢ' => Some(66),
'づ' => Some(67),
'で' => Some(68),
'ど' => Some(69),
'ば' => Some(70),
'び' => Some(71),
'ぶ' => Some(72),
'べ' => Some(73),
'ぼ' => Some(74),
'ぱ' => Some(75),
'ぴ' => Some(76),
'ぷ' => Some(77),
'ぺ' => Some(78),
'ぽ' => Some(79),
'っ' => Some(80),
'¿' => Some(81),
'¡' => Some(82),
'ᴘ' => Some(83),
'ᴍ' => Some(84),
'オ' => Some(85),
'カ' => Some(86),
'キ' => Some(87),
'ク' => Some(88),
'ケ' => Some(89),
'Í' => Some(90),
'コ' => Some(91),
'サ' => Some(92),
'ス' => Some(93),
'セ' => Some(94),
'ソ' => Some(95),
'タ' => Some(96),
'チ' => Some(97),
'ツ' => Some(98),
'テ' => Some(99),
'ト' => Some(100),
'ナ' => Some(101),
'ニ' => Some(102),
'ヌ' => Some(103),
'â' => Some(104),
'ノ' => Some(105),
'ハ' => Some(106),
'ヒ' => Some(107),
'フ' => Some(108),
'ヘ' => Some(109),
'ホ' => Some(110),
'ミ' => Some(112),
'ム' => Some(113),
'メ' => Some(114),
'モ' => Some(115),
'ヤ' => Some(116),
'ユ' => Some(117),
'ヨ' => Some(118),
'ラ' => Some(119),
'リ' => Some(120),
'ル' => Some(121),
'レ' => Some(122),
'ロ' => Some(123),
'ワ' => Some(124),
'ヲ' => Some(125),
'ン' => Some(126),
'ァ' => Some(127),
'ィ' => Some(128),
'ゥ' => Some(129),
'ェ' => Some(130),
'ォ' => Some(131),
'ャ' => Some(132),
'ュ' => Some(133),
'ョ' => Some(134),
'ガ' => Some(135),
'ギ' => Some(136),
'グ' => Some(137),
'ゲ' => Some(138),
'ゴ' => Some(139),
'ザ' => Some(140),
'ジ' => Some(141),
'ズ' => Some(142),
'ゼ' => Some(143),
'ゾ' => Some(144),
'ダ' => Some(145),
'ヂ' => Some(146),
'ヅ' => Some(147),
'デ' => Some(148),
'ド' => Some(149),
'バ' => Some(150),
'ビ' => Some(151),
'ブ' => Some(152),
'ベ' => Some(153),
'ボ' => Some(154),
'パ' => Some(155),
'ピ' => Some(156),
'プ' => Some(157),
'ペ' => Some(158),
'ポ' => Some(159),
'ッ' => Some(160),
'0' => Some(161),
'1' => Some(162),
'2' => Some(163),
'3' => Some(164),
'4' => Some(165),
'5' => Some(166),
'6' => Some(167),
'7' => Some(168),
'8' => Some(169),
'9' => Some(170),
'!' => Some(171),
'?' => Some(172),
'.' => Some(173),
'-' => Some(174),
'・' => Some(175),
'…' => Some(176),
'“' => Some(177),
'”' => Some(178),
'‘' => Some(179),
'’' => Some(180),
'♂' => Some(181),
'♀' => Some(182),
'$' => Some(183),
',' => Some(184),
'⑧' => Some(185),
'/' => Some(186),
'A' => Some(187),
'B' => Some(188),
'C' => Some(189),
'D' => Some(190),
'E' => Some(191),
'F' => Some(192),
'G' => Some(193),
'H' => Some(194),
'I' => Some(195),
'J' => Some(196),
'K' => Some(197),
'L' => Some(198),
'M' => Some(199),
'N' => Some(200),
'O' => Some(201),
'P' => Some(202),
'Q' => Some(203),
'R' => Some(204),
'S' => Some(205),
'T' => Some(206),
'U' => Some(207),
'V' => Some(208),
'W' => Some(209),
'X' => Some(210),
'Y' => Some(211),
'Z' => Some(212),
'a' => Some(213),
'b' => Some(214),
'c' => Some(215),
'd' => Some(216),
'e' => Some(217),
'f' => Some(218),
'g' => Some(219),
'h' => Some(220),
'i' => Some(221),
'j' => Some(222),
'k' => Some(223),
'l' => Some(224),
'm' => Some(225),
'n' => Some(226),
'o' => Some(227),
'p' => Some(228),
'q' => Some(229),
'r' => Some(230),
's' => Some(231),
't' => Some(232),
'u' => Some(233),
'v' => Some(234),
'w' => Some(235),
'x' => Some(236),
'y' => Some(237),
'z' => Some(238),
':' => Some(240),
'Ä' => Some(241),
'Ö' => Some(242),
'Ü' => Some(243),
'ä' => Some(244),
'ö' => Some(245),
'ü' => Some(246),
_ => None,
}

}

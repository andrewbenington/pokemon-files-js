import PK3 from '../PK3'; // Adjust the import path as needed

describe('PK3 Class', () => {
  const buffer = new Uint8Array([
    0x0C, 0xEF, 0x02, 0xD2, 0x6B, 0x99, 0x37, 0x75, 0xBB, 0xE0, 0xD5, 0xDF, 0xD5, 0xEE, 0xD5, 0xE6,
    0xFF, 0x00, 0x02, 0x02, 0xBE, 0xDD, 0xD5, 0xE1, 0xE3, 0xE2, 0xD8, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x41, 0x00, 0x00, 0x00, 0xC2, 0x70, 0x07, 0x00, 0x00, 0x46, 0x00, 0x00, 0x5E, 0x00, 0xF7, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x0A, 0x0F, 0x00, 0x00, 0x05, 0x00, 0x00, 0xFC, 0xFC, 0x01, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x05, 0x26, 0xEF, 0x97, 0xEB, 0x81, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xBC, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00
  ]);

  let pk3Instance: PK3;

  beforeEach(() => {
    pk3Instance = PK3.fromBytes(buffer.buffer);
  });

  test('should correctly parse personality value', () => {
    expect(pk3Instance.personalityValue).toBe(0xD202EF0C);
  });

  test('should correctly parse trainer ID', () => {
    expect(pk3Instance.trainerID).toBe(0x996B);
  });

  test('should parse dex number correctly', () => {
    expect(pk3Instance.dexNum).toBe(65);
  });

  test('should return correct held item name', () => {
    expect(pk3Instance.heldItemName).toBe('(None)');
  });

  test('should correctly calculate the level based on experience', () => {
    expect(pk3Instance.getLevel()).toBeGreaterThan(0);
  });

  test('should correctly identify gender', () => {
    expect(pk3Instance.gender).toBe(0x1); 
  });

  test('should identify shiny status', () => {
    expect(pk3Instance.isShiny()).toBe(false);
  });

  test('should identify square shiny status', () => {
    expect(pk3Instance.isSquareShiny()).toBe(false); 
  });

  test('should return correct ability based on personality', () => {
    expect(pk3Instance.ability).toBe('Synchronize');
  });

  test('should return correct nature', () => {
    expect(pk3Instance.nature).toBe(0x3);
  });

  test('should generate a correct checksum', () => {
    pk3Instance.refreshChecksum();
    expect(pk3Instance.checksum).toBeGreaterThan(0);
  });

  test('should serialize and deserialize correctly to/from bytes', () => {
    const bytes = pk3Instance.toBytes();
    const deserialized = PK3.fromBytes(bytes);
    expect(deserialized.personalityValue).toBe(pk3Instance.personalityValue);
    expect(deserialized.trainerID).toBe(pk3Instance.trainerID);
    expect(deserialized.dexNum).toBe(pk3Instance.dexNum);
  });
});

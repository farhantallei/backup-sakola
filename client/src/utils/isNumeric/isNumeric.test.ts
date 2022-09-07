import isNumeric from './isNumeric';

describe('@app/utils/isNumeric', () => {
  it('should return true', () => {
    expect(isNumeric('123')).toBe(true);
  });
  it('should return true', () => {
    expect(isNumeric('-123')).toBe(false);
  });
  it('should return false', () => {
    expect(isNumeric('')).toBe(false);
  });
  it('should return false', () => {
    expect(isNumeric(' ')).toBe(false);
  });
  it('should return false', () => {
    expect(isNumeric('HELLO WORLD')).toBe(false);
  });
  it('should return false', () => {
    expect(isNumeric('123abcd')).toBe(false);
  });
  it('should return false', () => {
    expect(isNumeric('abcd123')).toBe(false);
  });
  it('should return false', () => {
    expect(isNumeric('123abcd123')).toBe(false);
  });
  it('should return false', () => {
    expect(isNumeric('0x10')).toBe(false);
  });
  it('should return false', () => {
    expect(isNumeric('123.123')).toBe(false);
  });
  it('should return false', () => {
    expect(isNumeric('..123')).toBe(false);
  });
  it('should return false', () => {
    expect(isNumeric('.123')).toBe(false);
  });
  it('should return false', () => {
    expect(isNumeric('123..')).toBe(false);
  });
  it('should return false', () => {
    expect(isNumeric('123.')).toBe(false);
  });
});

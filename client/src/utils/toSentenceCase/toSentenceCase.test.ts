import toSentenceCase from './toSentenceCase';

describe('@app/utils/toSentenceCase', () => {
  it('should sentence the given word', () => {
    expect(toSentenceCase('hello world')).toBe('Hello world');
  });
  it('should transform the given uppercase word into sentencecase word', () => {
    expect(toSentenceCase('HELLO WORLD')).toBe('Hello world');
  });
});

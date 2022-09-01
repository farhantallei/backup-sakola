import addClassName from './addClassName';

describe('@app/utils/addClassName', () => {
  it('should add given class names into selected element', () => {
    const element = document.createElement('div');
    addClassName(element, 'foo bar');
    expect(element.classList.contains('foo')).toBe(true);
    expect(element.classList.contains('bar')).toBe(true);
  });
});

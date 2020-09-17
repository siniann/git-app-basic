import { filenameRegex, descriptionRegex } from './regularExpression';


describe('Valid filename', () => {
  it('should return a filename ending with .txt', () => {
    const filename = filenameRegex('abc');
    expect(filename).toEqual('abc.txt');
  });
  it('should return a filename ending with .txt', () => {
    const filename = filenameRegex('abc.txt');
    expect(filename).toEqual('abc.txt');
  });
  it('should return a filename ending with .txt', () => {
    const filename = filenameRegex('');
    expect(filename).toEqual('');
  });
});

describe('valid description syntax', () => {
  it('should return true for valid description ', () => {
    const description = 'Add some data';
    const isValid = descriptionRegex(description);

    expect(isValid).toEqual(true);
  });
  it('should return false for invalid description syntax', () => {
    const description = 'invalid description test';
    const isValid = descriptionRegex(description);

    expect(isValid).toEqual(false);
  });
  it('should return false for invalid description syntax', () => {
    const description = 'invalid description test';
    const isValid = descriptionRegex(description);

    expect(isValid).toEqual(false);
  });

  it('should return false for invalid description syntax', () => {
    const isValid = descriptionRegex('');

    expect(isValid).toEqual(false);
  });
});

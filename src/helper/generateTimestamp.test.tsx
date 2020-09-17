import generateTimestamp from './generateTimestamp';

describe('generate timestamp', () => {
  it('should return a timestamp', () => {
    expect(generateTimestamp()).not.toEqual('');
  });

/*  it('should generate a timestamp from a date', () => {
    const mockDate = new Date(Date.UTC(1999, 0, 1, 1, 1, 1));
    jest.spyOn(global, 'Date').mockImplementation(() => String(mockDate));

    expect(generateTimestamp()).toEqual('Date: 1999-1-1 Time: 2:1:1');
  }); */
});

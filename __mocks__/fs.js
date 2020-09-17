module.exports = {
  fs: {
    readFile: jest.fn().mockResolvedValue({ err: null, data: 'some text' }),
    // readFile: jest.fn((file, encoding, callback) => callback('someData')),
  },
};


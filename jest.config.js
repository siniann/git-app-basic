module.exports = {
  roots: [
    '<rootDir>',
  ],
  setupFiles: [
    '<rootDir>/setupTests.js',
  ],
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'babel-jest',
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'jsx',
    'tsx',
  ],
  testMatch: [
    '**/*.(test|steps).(js|jsx|ts|tsx)',
  ],
  collectCoverageFrom: [
    'src/**/*.js*',
    'src/**/*.ts*',
    '!src/**/*.snap',
    '!src/**/*.stories.jsx',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
    'src/**/*.js*': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
    'src/**/*.ts*': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/mocks.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/mocks.js',
  },
};

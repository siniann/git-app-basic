module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb',
  ],
  env: {
    jest: true,
    node: true,
    browser: true
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/indent': ['error', 2],
    'import/no-named-as-default-member': 0,
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".jsx",
          ".tsx",
        ]
      }
    ],
  },
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.ts',
          '.jsx',
          '.tsx',
        ],
      },
    },
  },
  overrides: [
    {
      files: [
        '*.test.js',
        '*.test.ts',
        '*.test.jsx',
        '*.test.tsx',
        '*.steps.js',
        '*.steps.ts',
        '*.steps.jsx',
        '*.steps.tsx',
      ],
      rules: {
        'no-unused-vars': ['warn'],
        'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }]
      },
    },
  ],
};

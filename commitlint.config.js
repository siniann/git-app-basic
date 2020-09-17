module.exports = {
    parserPreset: {
      parserOpts: {
        headerPattern: '^(\\w*) (\\S.*)$',
        headerCorrespondence: [
          'type',
          'subject',
          '',
        ],
      },
    },
    rules: {
      'header-max-length': [
        2,
        'always',
        72,
      ],
      'header-full-stop': [
        2,
        'never',
      ],
      'type-empty': [
        2,
        'never',
      ],
      'type-case': [
        2,
        'always',
        'sentence-case',
      ],
      'type-enum': [
        2,
        'always',
        [
          'Add',
          'Fix',
          'Refactor',
          'Rename',
          'Update',
          'Remove',
          'Move',
          'Style',
        ],
      ],
      'subject-empty': [
        2,
        'never',
      ],
      'subject-min-length': [
        2,
        'always',
        3,
      ],
    },
  };
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'prettier',
  ],
  ignorePatterns: [
    'client/dist/**/*',
    'client/public/**/*',
    'e2e/playwright-report/**/*',
    'packages/data-provider/types/**/*',
    'packages/data-provider/dist/**/*',
    'packages/data-provider/test_bundle/**/*',
    'data-node/**/*',
    'meili_data/**/*',
    'node_modules/**/*',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'import'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow' }],
    indent: ['error', 2, { SwitchCase: 1 }],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    'linebreak-style': 0,
    curly: ['error', 'all'],
    semi: ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-trailing-spaces': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    // "arrow-parens": [2, "as-needed", { requireForBlockBody: true }],
    // 'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-console': 'off',
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/extensions': 'off',
    'no-promise-executor-return': 'off',
    'no-param-reassign': 'off',
    'no-continue': 'off',
    'no-restricted-syntax': 'off',
    'react/prop-types': ['off'],
    'react/display-name': ['off'],
    'no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
    quotes: ['error', 'single'],
    'import/order': [
      'warn',
      {
        groups: [
          ['builtin'], // Node.js standard libraries, react
          ['external'], // npm packages
          ['type'], // Type imports (TypeScript)
          [
            'internal', // Internal alias imports eg.(~/Component)
            'parent', // Parent directory imports eg.(../ParentComponent)
            'sibling', // Sibling imports eg.(./components/MyComponent)
            'index',
            'object',
          ],
        ],
        // 'newlines-between': 'always', // Enforce new lines between groups
        pathGroups: [
          {
            pattern: '{react,react-dom/**}',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '~/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin', 'type'], // Exclude these types from the path group rule
        warnOnUnassignedImports: true, // Warn for unassigned imports
        // alphabetize: { order: 'asc', caseInsensitive: true }, // Alphabetize imports within each group
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'no-unused-vars': 'off', // off because it conflicts with '@typescript-eslint/no-unused-vars'
        'react/display-name': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
      },
    },
    {
      files: ['rollup.config.js', '.eslintrc.js', 'jest.config.js'],
      env: {
        node: true,
      },
    },
    {
      files: [
        '**/*.test.js',
        '**/*.test.jsx',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.js',
        '**/*.spec.jsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        'setupTests.js',
      ],
      env: {
        jest: true,
        node: true,
      },
      rules: {
        'react/display-name': 'off',
        'react/prop-types': 'off',
        'react/no-unescaped-entities': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './client/tsconfig.json',
      },
      plugins: ['@typescript-eslint/eslint-plugin', 'jest'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'error',
      },
    },
    {
      files: './packages/data-provider/**/*.ts',
      overrides: [
        {
          files: '**/*.ts',
          parser: '@typescript-eslint/parser',
          parserOptions: {
            project: './packages/data-provider/tsconfig.json',
          },
        },
      ],
    },
    {
      files: './config/translations/**/*.ts',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './config/translations/tsconfig.json',
      },
    },
    {
      files: ['./packages/data-provider/specs/**/*.ts'],
      parserOptions: {
        project: './packages/data-provider/tsconfig.spec.json',
      },
    },
  ],
  settings: {
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: ['./client/tsconfig.json'],
      },
      node: {
        project: ['./client/tsconfig.json'],
      },
    },
  },
};

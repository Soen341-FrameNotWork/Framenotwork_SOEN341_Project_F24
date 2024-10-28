module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/prop-types': 'off', 
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/react-in-jsx-scope': 'off', 
    '@next/next/no-img-element': 'off', 

    
    'no-console': ['warn', { allow: ['warn', 'error'] }],

    
    'import/no-extraneous-dependencies': [
      'warn',
      {
        devDependencies: true,
      },
    ],

    
    'max-len': ['warn', { code: 120 }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};


module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  extends: [
    '@react-native-community',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    semi: 0,
    'comma-dangle': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error']
  }
}

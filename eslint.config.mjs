import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['node_modules/', 'dist/', '.next/'],
  },
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          printWidth: 80, // Customize this as per your needs (default is 80)
          singleQuote: true,
          trailingComma: 'es5',
          jsxSingleQuote: false,
          semi: false,
          tabWidth: 2,
        },
      ],
      'react/jsx-curly-spacing': ['error', 'never'],
      'react/jsx-indent': ['error', 2],
    },
  },
  eslintConfigPrettier,
];

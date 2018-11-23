module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
  ],
  plugins: [
    'react-hot-loader/babel',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
  ],
  env: {
    test: {
      plugins: [
        '@babel/transform-modules-commonjs',
        'babel-plugin-dynamic-import-node',
      ],
    },
  },
}

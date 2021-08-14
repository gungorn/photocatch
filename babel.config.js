module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathPrefix: '~',
            rootPathSuffix: 'src'
          },
          {
            rootPathPrefix: '~screens',
            rootPathSuffix: 'src/screens/index'
          },
          {
            rootPathPrefix: '~assets',
            rootPathSuffix: 'src/assets/index'
          },
          {
            rootPathPrefix: '~redux',
            rootPathSuffix: 'src/redux/index'
          },
          {
            rootPathPrefix: '~components',
            rootPathSuffix: 'src/components/index'
          },
          {
            rootPathPrefix: '~utils/*',
            rootPathSuffix: 'src/utils/*'
          },
          {
            rootPathPrefix: '~configs',
            rootPathSuffix: 'src/configs/index'
          },
          {
            rootPathPrefix: '~theme',
            rootPathSuffix: 'src/theme/index'
          }
        ]
      }
    ]
  ]
};

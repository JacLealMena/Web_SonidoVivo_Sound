module.exports = function configureKarma(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],
    files: [{ pattern: 'src/**/*.spec.js', watched: false }],
    preprocessors: {
      'src/**/*.spec.js': ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        }]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },
    browsers: ['jsdom'],
    reporters: ['progress'],
    singleRun: true,
    client: {
      jasmine: {
        random: false
      }
    }
  });
};

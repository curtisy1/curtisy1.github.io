module.exports = {
  optimization: {
    emitOnErrors: false,
  },
  watch: true,
  devtool: 'inline-source-map',
  entry: "./src/scripts/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules|\.d\.ts$/,
        use: [
          { loader: "ts-loader" }
        ]
      },
      {
        test: /\.d\.ts$/,
        loader: 'ignore-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: [/node_modules/],
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true,
              url: false
            }
          },
          "sass-loader",
        ]
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: [".ts", ".tsx", ".js"]
  }
};
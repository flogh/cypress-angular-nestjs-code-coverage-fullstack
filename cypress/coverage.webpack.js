module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: "istanbul-instrumenter-loader",
        options: { esModules: true },
        enforce: "post",
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/,
          /(ngfactory|ngstyle)\.js/
        ]
      }
    ]
  }
};

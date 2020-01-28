module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                loader: 'istanbul-instrumenter-loader',
                options: { esModules: true },
                enforce: 'post',
                // include: require('path').join(__dirname, '..', 'angular'),
                exclude: [/\.(e2e|spec)\.ts$/, /node_modules/, /(ngfactory|ngstyle)\.js/],
            },
        ],
    },
};

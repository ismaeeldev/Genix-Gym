module.exports = {
    // Other webpack configurations
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
                exclude: /node_modules\/(?!stylis-plugin-rtl)/, // Ignore the warning for this package
            },
        ],
    },
};

const config = {
    mode: 'production',
    entry: {
        index: './src/js/index.js',
        main: './src/js/main.js',
        order: './src/js/order.js'
    },
    output: {
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};

export default config;
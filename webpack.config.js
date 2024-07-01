const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/comic.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'comic.js',
        path: path.resolve(__dirname, 'dist'),
    },
};

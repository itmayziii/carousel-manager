const path = require('path');

module.exports = {
    entry: {"carousel-manager": './src/carousel-manager.ts'},
    output: {
        filename: 'dist/[name].js',
        library: 'webpackNumbers',
        libraryTarget: 'commonjs'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {test: /\.tsx?$/, loader: 'ts-loader'}
        ]
    },
    externals: {
        jquery: {
            jquery: 'jQuery',
            foundation: 'Foundation'
        }
    }
};
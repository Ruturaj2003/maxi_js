//Uti package
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    //Output reqiures Absolute path not Relative path
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'assets', 'scripts'),
        publicPath: 'assets/scripts/',
    },
    devServer: {
        static: {
            directory: path.join(__dirname),
        },
    },
    devtool: 'eval-cheap-source-map',
    plugins: [new CleanPlugin.CleanWebpackPlugin()],
};

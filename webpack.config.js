const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

const entries  = {};

glob.sync('./src/components/**/index.js').forEach(path => {
    const chunk = path.split('./src/components/')[1].split('/index.js')[0];
    entries[chunk] = path;
})

module.exports = {
    entry: entries,
    output: {
        path: __dirname + '/dist',
        filename: '7uTree.js'
    },
    devtool: '#eval-source-map',
    devServer: {
        host: 'localhost',
        port: 8668,
        inline: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.js)$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template : __dirname + "/public/index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}
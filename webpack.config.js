const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    const isProduction = env === 'production';
    return {
        entry: ['./src/index.js'],
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'index_bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
            ],
        },
        mode: 'development',
        devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
        devServer: {
            port: 8085,
            historyApiFallback: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
            })
        ]
    }
}
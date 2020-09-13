const path = require('path');

module.exports = (env) => {
    const isProduction = env === 'production';
    return  {
        entry: './src/index.js',
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
        devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        devServer: {
            historyApiFallback: true,
        }
    }
}
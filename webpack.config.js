const path = require('path')
const vueLoader = require('vue-loader/lib/plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProduction = process.env.NODE_ENV == 'production'

const config = {
    entry: {
        main: path.resolve(__dirname, './src')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        chunkFilename: '[id].js'
    },
    resolve: {
        extensions: [
            '.js', '.vue'
        ],
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    isProduction ? miniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.resolve(__dirname, './public/styles/global.scss')
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|woff)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: isProduction ? 'assets/fonts/[contenthash:8].[ext]' : '[path][name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|gif|jpe?g)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 10,
                            esModule: false,
                            name: isProduction ? 'assets/images/[contenthash:8].[ext]' : '[path][name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: isProduction ? [
                    'babel-loader',
                    'eslint-loader'
                ] : [
                    'babel-loader',
                    'eslint-loader',
                    'source-map-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            }
        ]
    },
    plugins: [
        new vueLoader(),
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProduction,
                removeComments: isProduction
            }
        })
    ]
}

if (isProduction) {
    config.mode = 'production'
    config.output.filename = 'scripts/[contenthash:8].js'
    config.output.chunkFilename = 'scripts/[contenthash:8].js'
    config.output.publicPath = 'http://localhost'
    config.optimization = {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    }
    config.plugins.push(
        new CleanWebpackPlugin()
    )
    config.plugins.push(
        new miniCssExtractPlugin({
            filename: 'styles/[contenthash:8].css',
            chunkFilename: 'styles/[contenthash:8].css'
        })
    )
}
else {
    config.devtool = 'source-map'
    config.devServer = {
        host: '0.0.0.0',
        port: 3000,
        hot: true
    }
}

module.exports = config
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ["babel-polyfill", "./app/js"]
};
module.exports = {
    entry: './src/index.js',
    output:{
        path: path.join(__dirname,
        '/dist'),
        filename: 'index_bundle.js'
    },
    module:{
        rules : [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader:'babel-loader'
                }
            },
			 {
                    test: /\.css$/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [
                                    require("autoprefixer")()
                                ],
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "fonts/[name].[ext]",
                        },
                    },
                },
                {
                    test: /\.(jpe?g|png|gif|svg|ico)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: "assets/"
                            }
                        }
                    ]
                }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
}
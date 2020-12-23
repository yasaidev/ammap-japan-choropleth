var $path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyFilePlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

module.exports = {
    mode: "production",

    devtool: "source-map",

    entry: {
        index: "./src/index.js"
    },

    output: {
        path: $path.join(__dirname, "dist"),
        filename: "[name].js",
        chunkFilename: "[name].js"
    },

    module: {
        rules: [{
            test: /\.js$/,
            include: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                    plugins: ["@babel/plugin-syntax-dynamic-import"]
                }
            }
        }, {
            test: /.js$/,
            use: ["source-map-loader"],
            enforce: "pre"
        }]
    },

    devServer: {
        contentBase: $path.join(__dirname, "dist")
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/html/index.html"
        }
        ),
        new CopyFilePlugin({
            patterns: [
                {
                    from: ".",
                    to: "assets/",
                    context: "./src/assets"
                },
            ],
            options: {
            }
        }),
        new WriteFilePlugin()
    ]
};

const {VueLoaderPlugin} = require('vue-loader');
 
module.exports = {
    entry: {
        index: "../src/main.js"  //webpack的入口文件，指定将哪个文件进行打包
    },
    module: {
        rules: [{
            test: /\.vue$/,//vue文件加载器
            use: ['vue-loader']
        }, {
            test: /\.js$/,//js文件加载器
            use: ['babel-loader'],
            exclude: /node_modules/
        }, {
            test: /\.less$/,//lsaa文件加载器
            loaders: ["style-loader", "css-loader", "less-loader"]
        }, {
            test: /\.css$/,//css文件加载器
            loaders: ["style-loader", "css-loader"]
        }]
    },
    plugins: [
        // 添加VueLoaderPlugin，以响应vue-loader
        new VueLoaderPlugin()
    ]
};
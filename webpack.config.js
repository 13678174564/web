const path=require('path')
const htmlWebpackPlugin = require('html-webpack-plugin');
const  webpack=require('webpack');
const VueLoaderPlugin=require('vue-loader/lib/plugin')
module.exports = {
    entry:path.join(__dirname,'./src/main.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js',
    },
    plugins:[new htmlWebpackPlugin({
        template:path.join(__dirname,'index.html'),
        filename: 'index.html'
    }),
     new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ],
    module: { // 这个节点用于配置所有第三方模块加载器
        rules: [ // 配置所有第三方模块的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, //配置处理.css文件的第三方loader 规则
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, //配置处理 .less 文件的第三方 loader 规则
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 配置处理 .scss 文件的第三方 loader 规则
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=31606&name=[name]-[hash:6].[ext]'},// 处理url图片路径的loader &name=[name]-[hash:6].[ext]
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理字体文件的 loader
            { test:/\.js$/, use: 'babel-loader', exclude:/node_modules/ }, // 配置 Babel 来转换高级的ES语法
            { test: /\.vue$/, use: 'vue-loader' }, // 处理 .vue 文件的 loader
        ]
    },

    devServer:{
        open:true,
        port:30000,
        hot:true,
        contentBase:path.join(__dirname,'./src')
    },
    resolve:{
        extensions:['.js','.json','.vue'],
      alias:{
          '@':path.resolve('src')
      }
    },
    mode:'development'
}
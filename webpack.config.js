'use strict';

const [join, LoaderVUE, CleanWP, UglifyjsWP, ExtractWP] = [
    require('path').join,
    require('vue-loader/lib/plugin'),
    require('clean-webpack-plugin'),
    require('uglifyjs-webpack-plugin'),
    require('extract-text-webpack-plugin')
];

const prod = /^production$/i.test(process.env.NODE_ENV);

const conf = module.exports = {
    entry: {
        today: './src/app.js'
    },
    output: {
        path: join(__dirname, 'build'),
        publicPath: '/build/',
        filename: '[name]-build.js'
    },
    devtool: prod ? 'source-map' : 'inline-source-map',
    devServer: {
        historyApiFallback: { index: './index.htm' }
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/i,
                loader: ['vue-loader']
            },
            {
                test: /\.css$/i,
                loader: prod ? ExtractWP.extract({
                    fallback: ['vue-style-loader', 'style-loader'],
                    use: ['css-loader']
                }) : ['vue-style-loader', 'style-loader', 'css-loader']
            },
            {
                test: /\.less$/i,
                loader: prod ? ExtractWP.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                }) : ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(jpe?g|png|gif|ico|svg)$/i,
                loader: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: prod ? '/resource' : '',
                            name: '[name]-[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff2?)$/i,
                loader: ['url-loader']
            }
        ]
    },
    plugins: [new LoaderVUE()],
    optimization: {
        minimizer: []
    }
};

if (prod) {
    delete conf.devServer;
    conf.plugins.push(
        new CleanWP(['./build']),
        new ExtractWP('/style/style.css')
    );
    conf.optimization.minimizer.push(
        new UglifyjsWP({ 
            sourceMap: true,
            test: /\.js$/i,
            include: ['/node_modules/'] 
        }
    ));
}
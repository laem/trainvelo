const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const path = require('path')
// replace accordingly './.env' with the path of your .env file
const Dotenv = require('dotenv-webpack')
console.log('envputain', process.env.REACT_APP_SNCF_TOKEN)

const {
	commonLoaders,
	styleLoader,
	HTMLPlugins,
	default: common,
} = require('./webpack.common')

module.exports = {
	...common,
	module: {
		rules: [...commonLoaders('development'), styleLoader('style-loader')],
	},
	devServer: {
		historyApiFallback: true,
		static: path.join(__dirname, 'dist'),
		hot: true,
	},
	mode: 'development',
	plugins: [
		...(common.plugins || []),
		...HTMLPlugins({ injectTrackingScript: true }),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify('development'),
		}),
		new ReactRefreshWebpackPlugin(),
		new Dotenv(),
	],
}

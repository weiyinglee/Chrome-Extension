module.exports = {
	entry: {
		script:"./js/script.js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015']
				}
			}
		],

	},
	output: {
		path: __dirname + "/js",
		filename: "[name].min.js"
	}
}
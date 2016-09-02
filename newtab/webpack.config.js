module.exports = {
	entry: {
		a:"./js/script.js",
		b:"./js/script2.js"
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
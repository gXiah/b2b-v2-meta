/*
**
** Global workspace config
**
*/

// ==============
// Pre-config ops
// ==============

const path = require('path');

// Number of elements in 'dist/' (to name the builds 'build-0', 'build-1', ...)
var num_of_builds = (require('fs').readdirSync('dist/')).length;


// ==============
//     Config
// ==============

module.exports = {
	outputDir: 'dist/build-' + num_of_builds,

	// Aliases
	configureWebpack: {
		resolve: {
			alias: {
				"@containers": path.resolve(__dirname, 'public/containers'),

				"@lib": path.resolve(__dirname, 'src/library'),
					"@libcommon": path.resolve(__dirname, 'src/library/common'),
						"@commoncmp": path.resolve(__dirname, 'src/library/common/components'),
						"@commonpnl": path.resolve(__dirname, 'src/library/common/panels'),
					"@libcustom": path.resolve(__dirname, 'src/library/custom')
			}
		}
	},

	// Main file (Where the app is mounted)
	chainWebpack: (config) => {
		config
			.plugin('html')
			.tap( (arg) => {
				arg[0].template = './public/containers/dev/dev.container.html'
				return arg
			})
	}
}
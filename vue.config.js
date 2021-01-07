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

	configureWebpack: {
		resolve: {
			alias: {
				"@lib": path.resolve(__dirname, 'src/components/libraries'),
					"@vui": path.resolve(__dirname, 'src/components/libraries/vui'),
						"@vui-units": path.resolve(__dirname, 'src/components/libraries/vui/vui-units')
			}
		}
	},

	chainWebpack: (config) => {
		config
			.plugin('html')
			.tap( (arg) => {
				arg[0].template = './public/containers/simple.container.html'
				return arg
			})
	}
}
# b2b-v2-meta

## Project setup
```
npm install
```
And then, modify the ```vue-logger.js``` file @ ```node_modules/vuejs-logger/dist/vue-logger.js``` 
```
16	VueLogger.prototype.install = function (Vue, options) {
17	    options = Object.assign(this.getDefaultOptions(), options);
18	    if (this.isValidOptions(options, this.logLevels)) {
19	        Vue.$log = this.initLoggerInstance(options, this.logLevels);
20 ---->    // Vue.prototype.$log = Vue.$log; // Delete this
21	    }
22	    else {
23	        throw new Error(this.errorMessage);
24	    }
25	};
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

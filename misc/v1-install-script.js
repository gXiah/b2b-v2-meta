cleed = document.createElement('div');
cleed.id="app-test";
var body = document.getElementsByTagName("body")[0];
body.appendChild(cleed);

var link = document.createElement('link');
link.href = 'https://storage.googleapis.com/cleed-datacenter-europe/packages/lib/cleedBox.css';
link.rel='stylesheet';

var script = document.createElement('script');
script.src = 'https://storage.googleapis.com/cleed-datacenter-europe/packages/lib/cleedBox2.umd.js';

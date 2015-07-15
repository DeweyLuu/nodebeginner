var http = require('http');
var url = require('url');

function start(route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log('request for ' + pathname + ' recieved.');
		route(handle, pathname, response, request);
	}

	http.createServer(onRequest).listen(8888);
	console.log('server has started');
}
exports.start = start;

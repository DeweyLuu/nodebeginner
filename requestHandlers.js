var querystring = require('querystring'),
	fs = require('fs');
	formidable = require('formidable');

function start(response) {
	console.log('request handler "start" was called.');

	var body = '<html>' +
		'<head>' +
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" method="post">'+
		'<textarea name="text" rows="20" cols="60"></textarea>'+
		'<input type="submit" value="Submit text" />'+
		'</form>'+
		'</body>'+
		'</html>';

		response.writeHead(200, {"content-type": "text/plain"});
		response.write(body);
		response.end();

}

function upload(response, postData) {
	console.log('request handler "upload" was called.');

	var form = new formidable.IncomingForm();
	console.log('about to parse');
	form.parse(request, function(error, fields, files) {
		console.log('parsing done');

		fs.rename(files.upload.path, '/tmp/test.png', function(error) {
			if(error) {
				fs.unlink('/tmp/test.png');
				fs.rename(files.upload.path, "/tmp/test.png");
			}
		});
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}

function show(response) {
	console.log('request handler "show" was called');
	response.writeHead(200, {"Content-Type": "image/png"});
	fs.createReadStream("/temp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;



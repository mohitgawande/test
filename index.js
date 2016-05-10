var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');

var app = express();
console.log(__dirname);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.json());       // to support JSON-encoded bodies

app.get('*', function (req, res) {
    res.status('200').send('FUCK You')
})
app.post('/test', function (request, response) {
	console.log('REQUEST', request);
	console.log('REQUEST BODY', request.body)
	response.status(200).send('OK')
});

app.post('/exportData', function (request, response) {
	console.log('REQUEST BODY', request.body);

	var postData = JSON.stringify(request.body);
	var optionspost = {
		host: 'devapi.seedoc.co',
		port: 4000,
		path: '/exportData',
		method: 'POST',
		headers: { 'Content-Type': 'application/json', 'Content-Length': postData.length }
	};

	var req = https.request(optionspost, function (res) {
		console.log(JSON.stringify(res));
	});

	req.on('error', (e) => {
		console.log(`problem with request: ` + e.message);
	});

	req.write(postData);
	req.end();

});

var port = process.env.PORT || 3000;

app.listen(port);
console.log("App listening on port " + port);
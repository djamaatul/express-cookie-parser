const express = require('express');
const http = require('http');
const https = require('https');
const url = require('url');
const app = express();
const server = http
	.createServer
	// (req, res) => {
	// res.setHeader('Content-type', 'json');
	// switch (req.url) {
	// 	case '/':
	// 		res.write('<h1>siap</h1>');
	// 		res.end();
	// 		break;

	// 	default:
	// 		break;
	// }
	// }
	();
server.on('request', (req, res) => {
	const query = url.parse(req.url, true).query;
	res.setHeader('Content-type', 'application/json');
	// https.get('https://www.google.com', (response) => {
	// 	response.setEncoding('utf-8');
	// 	response.on('data', (chunk) => {
	// 		res.end(chunk);
	// 	});
	// });
	res.end(JSON.stringify({ siap: '1234' }));
});

server.listen(5000, () => {
	console.log('listening on', 5000);
});

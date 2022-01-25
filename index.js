const express = require('express');
const cookie = require('cookie-parser');
const app = express();
const router = require('./src/routes');

app.use(express.json());
app.use(cookie());

app.use('/api/v1', router);

app.listen(5000, () => {
	console.log('listen on ', 5000);
});

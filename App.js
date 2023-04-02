const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressFileupload = require('express-fileupload');
const app = express();

const auth = require('./routes/auth');
const classes = require('./routes/class');

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(
	expressFileupload({
		useTempFiles: true,
		tempFileDir: '/tmp/'
	})
);

app.get('/', (req, res) => {
	res.status(200).json({
		success: true,
		message: `server is not runing at ${process.env.PORT}`
	});
});

app.use('/api/user', auth);
app.use('/api/class', classes);

module.exports = app;

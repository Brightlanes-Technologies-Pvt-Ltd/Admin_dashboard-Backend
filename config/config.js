const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Master-Dashboard').then(() => {
	console.log('db connected');
});

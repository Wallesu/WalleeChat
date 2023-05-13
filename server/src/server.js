const express = require('express');
const app = express();
const { Server } = require('socket.io');
const cors = require('cors')

const PORT = process.env.PORT || 3000;

const server = require('http').createServer(app);

const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

const schedule = require('./schedule/index.js')
schedule.getPhotos //get photos from Pexels API at 21:00pm


const saveMessage = require('./functions/index').saveMessage
let messages = [];
io.on('connection', (socket) => {
	socket.on('sendMessage', (data) => {
		messages.push(data);
		saveMessage(data.message, data.sender.id, data.receiver.id)
		socket.broadcast.emit('receivedMessage', data);
	});
});


app.use(cors())
app.use(express.json()) 
app.use('/users', require('./controllers/User.js'))
app.use('/messages', require('./controllers/Message.js'))
app.use('/photos', require('./controllers/Photos'))
app.use('/friends', require('./controllers/Friends'))
app.use('/tokens', require('./controllers/Tokens'))


server.listen(PORT, () => {
	console.log(`-=- API is running on port ${PORT} -=-`);
});

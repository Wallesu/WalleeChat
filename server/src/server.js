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

let messages = [];

const saveMessage = require('./functions/index').saveMessage

io.on('connection', (socket) => {
	socket.on('sendMessage', (data) => {
		messages.push(data);
		saveMessage(data.message, data.sender.id, data.receiver.id)
		console.log(data)
		socket.broadcast.emit('receivedMessage', data);
	});
});


app.use(cors())
app.use(express.json()) 
app.use('/users', require('./controllers/User.js'))
app.use('/messages', require('./controllers/Message.js'))

app.get('/login', (req, res) => {
	return res.send('oi');
});

server.listen(PORT, () => {
	console.log(`-=- API is running on port ${PORT} -=-`);
});

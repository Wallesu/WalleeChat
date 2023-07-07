const mysql = require('mysql2/promise');

async function connectToDatabase(){
	const connection = await mysql.createConnection({
		host: 'mysql_server',
		user: 'walle',
		password: 'password',
		database: 'walleechat',
	});

	return connection
}



// connection.connect((err) => {
// 	if(err){
// 		console.log('Erro connecting to database:', err)
// 		return
// 	}
// 	console.log('Connection established')
// })


module.exports = { connection: connectToDatabase() };

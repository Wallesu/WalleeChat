// console.log('passou aq')
// const connection = require('./connection')
// console.log(connection)
const mysql = require('mysql2');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'walleechat',
});


createTables(connection)


function createTables(connection){

    connection.connect((err) => {
        if(err){
            console.log('Erro connecting to database:', err)
            return
        }
        console.log('Connection established')
    })
    const Users = `
        CREATE TABLE IF NOT EXISTS Users (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            nickname VARCHAR(45) NOT NULL,
            password CHAR(64) NOT NULL,
            email VARCHAR(256) NOT NULL,
            photo TEXT,
            bio VARCHAR(150),
            createdAt DATE,
            updatedAt DATE,
            deletedAt DATE
        );
    `
    const Messages = `
        CREATE TABLE IF NOT EXISTS Messages (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            content TEXT,
            sender_id INT NOT NULL,
            CONSTRAINT FK_Messages_Senders FOREIGN KEY (sender_id) REFERENCES Users (id),
            receiver_id INT,
            CONSTRAINT FK_Messages_Receivers FOREIGN KEY (receiver_id) REFERENCES Users (id),
            createdAt DATE,
            updatedAt DATE,
            deletedAt DATE
        );
    `
    connection.query(Users,
        function(err, results, fields){
            if(err) console.log(err)
            if(results){
                console.log(results, fields)
            }
        }    
    )

    connection.query(Messages,
        function(err, results, fields){
            if(err) console.log(err)
            if(results){
                console.log(results, fields)
            }
        }    
    )    


    connection.end()
}


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
    const CreateTableUsers = `
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
    const CreateTableMessages = `
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

    const CreateTablePhotos = `
        CREATE TABLE IF NOT EXISTS Photos (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(250),
            url VARCHAR(2048),
            tiny_url VARCHAR(2048),
            photographer VARCHAR(250),
            photographer_url VARCHAR(2048),
            website VARCHAR(2048)
        );
    `

    const DropColumnUsers_photo = `
        ALTER TABLE Users
        DROP COLUMN photo
    `

    const AddForeignKeyUsers_photo_id = `
        ALTER TABLE Users
        ADD COLUMN photo_id INT,
        ADD FOREIGN KEY FK_Users_Photos(photo_id) REFERENCES Photos(id)

    `

    connection.query(CreateTableUsers,
        function(err, results, fields){
            if(err) console.log(err)
            if(results){
                console.log(results, fields)
            }
        }    
    )

    connection.query(CreateTableMessages,
        function(err, results, fields){
            if(err) console.log(err)
            if(results){
                console.log(results, fields)
            }
        }    
    )
    
    connection.query(CreateTablePhotos,
        function(err, results, fields){
            if(err) console.log(err)
            if(results){
                console.log(results, fields)
            }
        }    
    )

    connection.query(DropColumnUsers_photo,
        function(err, results, fields){
            if(err) console.log(err)
            if(results){
                console.log(results, fields)
            }
        }    
    )

    connection.query(AddForeignKeyUsers_photo_id,
        function(err, results, fields){
            if(err) console.log(err)
            if(results){
                console.log(results, fields)
            }
        }    
    )


    connection.end()
}


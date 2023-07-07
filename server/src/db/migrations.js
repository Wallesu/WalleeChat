// console.log('passou aq')
// const connection = require('./connection')
// console.log(connection)
const mysql = require('mysql2/promise');

async function connectToDatabase() {
    let connection;
    while (!connection) {
        try {
            connection = await mysql.createConnection({
                host: 'mysql_server',
                user: 'walle',
                password: 'password',
                database: 'walleechat',
            });
            console.log('Connection established');
        } catch (error) {
            console.log('Error connecting to database:', error);
            console.log('Retrying in 10 seconds...');
            await new Promise((resolve) => setTimeout(resolve, 10000));
        }
    }
    return connection;
}
createTables(connectToDatabase())


async function createTables(connection) {
    connection = await connection
    try {
        await connection.execute(`
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
    `);

        await connection.execute(`
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
    `);

        await connection.execute(`
      CREATE TABLE IF NOT EXISTS Photos (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(250),
        url VARCHAR(2048),
        tiny_url VARCHAR(2048),
        photographer VARCHAR(250),
        photographer_url VARCHAR(2048),
        website VARCHAR(2048)
      );
    `);

        await connection.execute(`
      ALTER TABLE Users
      DROP COLUMN photo;
    `);

        await connection.execute(`
      ALTER TABLE Users
      ADD COLUMN photo_id INT,
      ADD FOREIGN KEY FK_Users_Photos(photo_id) REFERENCES Photos(id);
    `);

        await connection.execute(`
      CREATE TABLE IF NOT EXISTS Friends (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user1_id INT NOT NULL,
        CONSTRAINT FK_Users_Friends1 FOREIGN KEY (user1_id) REFERENCES Users (id),
        user2_id INT NOT NULL,
        CONSTRAINT FK_Users_Friends2 FOREIGN KEY (user2_id) REFERENCES Users (id),
        status INT NOT NULL
      );
    `);

        console.log('Tables created successfully.');
    } catch (error) {
        console.log('Error creating tables:', error);
    } finally {
        connection.end();
    }
}


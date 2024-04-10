import mysql from "mysql2";

const connectToDb = () => {
    const connection = mysql.createConnection({
        host: process.env.SQL_SERVER,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATABASE,
        multipleStatements: true,
    });

    connection.connect((err) => {
        if (err) {
            console.error("Error connecting to the database:", err);
            return;
        }
    });
    return connection;
};

export default connectToDb;

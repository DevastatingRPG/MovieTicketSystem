// pages/api/admin.js
import mysql from 'mysql';

// Create a connection to your MySQL database
const connection = mysql.createConnection({
    host: process.env.SQL_SERVER,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    multipleStatements: true,
});

const handleAdminRequests = (req, res) => {
    let query;
    const { func } = req.query;
    const { vid, city, pincode, location, avail, sid, name, trailer, stype, image } = req.body;

    switch (func) {
        case 'insvenue':
            query = `CALL InsertVenue(${vid}, \'${city}\', ${pincode}, \'${location}\', \'${avail}\')`;
            break;
        case 'insshow':
            query = `CALL InsertShow(${sid}, \'${name}\', \'${trailer}\', \'${stype}\', \'${image}\')`;
            break;
        case 'delvenue':
            query = `DELETE FROM venue WHERE vid=${vid}`;
            break;
        case 'delshow':
            query = `DELETE FROM shows WHERE sid=${sid}`;
            break;
    }

    connection.query(query, (err, rows, fields) => {
        if (err) {
            console.error(err);
            res.status(403).send(err);
        }
        res.status(200).send(rows);
    });
};

export default handleAdminRequests;
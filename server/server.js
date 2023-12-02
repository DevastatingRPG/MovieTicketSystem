const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const app = express();
const jwt = require('jsonwebtoken')

require('dotenv').config();
env = process.env;
const PORT = env.PORT || 5000;
const JWT_SECRET_KEY = env.JWT_SECRET_KEY;

app.use(cors());
app.use(express.query());
app.use(express.json());

const connection = mysql.createConnection({
    host: env.SQL_SERVER,
    user: env.SQL_USER,
    password: env.SQL_PASSWORD,
    database: env.SQL_DATABASE,
    multipleStatements: true,
});

app.post('/admin', (req, res) => {
    let query;
    const { func } = req.query;
    const { vid, city, pincode, location, avail,
        sid, name, trailer, stype, image } = req.body;
    // Stype is category'Action\',_utf8mb4\'Drama\',_utf8mb4\'Comedy\',_utf8mb4\'Thriller\',_utf8mb4\'Other\
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
            res.sendStatus(403);
        }
        res.sendStatus(200);
    })


})

app.get('/movies', (req, res) => {
    query = 'SELECT * FROM Movies';
    connection.query(query, (err, rows, fields) => {
        if (err) {
            console.error(err);
            res.sendStatus(403);
        }
        res.send(rows);
    })
})

app.get('/booking', (req, res) => {
    const { func, uid, sid, vid } = req.query;
    let query;
    switch (func) {
        case 'avail':
            query = `CALL Show_Availability(${sid}, ${vid}, @avail, @error); SELECT @avail, @error`;
            connection.query(query, (err, rows, fields) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(403);
                }
                let result = rows[1][0]
                let avail = result["@avail"];
                let error = result["@error"];
                if (error) {
                    res.send(error);
                }
                else {
                    res.send(avail);
                }
            })
            break;
        case 'list':
            query = 'SELECT * FROM event_location; SELECT VID, location FROM venue; SELECT SID, name FROM shows;';
            connection.query(query, (err, rows, fields) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(403);
                }
                res.send(rows);
            })
            break;
        case 'occupied':
            query = `CALL GetOccupiedSeats(${sid}, ${vid}, @occupied); SELECT @occupied;`;
            connection.query(query, (err, rows, fields) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(403);
                }
                res.send(rows[1][0]["@occupied"]);
            })
            break;
    }

})

app.post('/booking', (req, res) => {
    const { func } = req.query;
    const { uid, vid, sid, pmeth, amount, seats, timing } = req.body;
    let query;
    switch (func) {
        case 'insert':
            var bid;
            query = `CALL InsertBooking(${uid}, ${sid}, \'${pmeth}\', ${amount}, \'Y\', @bid);SELECT @bid;`

            connection.query(query, async (err, rows, fields) => {
                if (err) {
                    console.error(err);
                }
                console.log(rows);
                bid = rows[1][0]["@bid"]
                for (let seat of seats) {
                    await new Promise((resolve, reject) => {
                        connection.query(`CALL InsertTicket(${bid}, ${vid},\'${timing}\', ${seat})`, (err, rows, fields) => {
                            if (err) {
                                console.error(err);
                                reject(err);
                            } else {
                                resolve();
                            }
                        })
                    })
                }
            })

            break;
    }
});

app.post('/login', (req, res) => {
    const { uname, password } = req.body;
    const query = `CALL VerifyUserCredentials(\'${uname}\', \'${password}\', @verified, @error, @uid); SELECT @verified, @error, @uid;`;
    connection.query(query, (err, rows, fields) => {
        if (err) {
            console.error(err);
            res.sendStatus(403);
        }
        let result = rows[1][0];
        let verified = result["@verified"];
        let error = result["@error"];
        let uid = result["@uid"];
        if (verified) {
            const token = jwt.sign({ uname }, JWT_SECRET_KEY, { expiresIn: '30d' });
            res.json({ token, message: 'Login successful', uid });
        }
        else {
            res.send(error);

        }
    })
})

app.post('/register', (req, res) => {
    const { name, email, age, gender, mobile, uname, password } = req.body;
    const query = `CALL InsertUser(\'${name}\', \'${email}\', ${age}, 
  \'${gender}\', ${mobile}, \'${uname}\', \'${password}\')`;
    connection.query(query, (err, rows, fields) => {
        if (err) {
            console.error(err);
            res.sendStatus(409);
        }
        res.sendStatus(200);
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
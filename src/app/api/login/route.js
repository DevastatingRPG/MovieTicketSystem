// app/api/login.js
import connectToDb from "../db";
const jwt = require("jsonwebtoken");
import { NextResponse } from "next/server";


export async function POST(req, res) {
    const bodyData = await req.json();
    const connection = connectToDb().promise();

    const { uname, password } = bodyData;
    // const sql = `CALL VerifyUserCredentials(?, ?, @verified, @error, @uid); SELECT @verified, @error, @uid;`;
    const values = [uname, password];

    let response;
    try {
        const result = await connection.execute(
            `CALL VerifyUserCredentials(?, ?, @verified, @error, @uid)`,
            values
        );
        console.log("done first");
        // const variables = await connection.query('SELECT @verified, @error, @uid');
        const variables = await connection.query("SELECT @verified, @error, @uid");
        const data = variables[0][0]; // Access the first object within the first array

        const verified = data["@verified"];
        const error = data["@error"];
        const uid = data["@uid"];
        // connection.query(
        //     ,
        //     (err, rows, fields) => {
        // const verified = rs["@verified"];
        // const error = rs["@error"];
        // const uid = rs["@uid"];

        if (verified) {
            const token = jwt.sign({ uname }, process.env.JWT_SECRET_KEY, {
                expiresIn: "30d",
            });
            response = NextResponse.json({ token, message: "Success!", uid });
        } else {
            console.log(error);
            response = NextResponse.json(
                { message: "Invalid Details!" },
                { status: 400 }
            );
        }
        // }
        // );
        // console.log(variables)
    } catch (err) {
        console.error(err);
        response = NextResponse.json({ message: "Error!" }, { status: 400 }); // Internal Server Error (handle specific errors later)
        return response;
    } finally {
        connection.end(); // Close connection
        return response;
    }
}

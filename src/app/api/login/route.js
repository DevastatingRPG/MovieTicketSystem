// app/api/login.js
import connectToDb from "../db";
const jwt = require("jsonwebtoken");
import { NextResponse } from "next/server";


export async function POST(req, res) {
    const bodyData = await req.json();
    const connection = connectToDb().promise();

    const { uname, password } = bodyData;
    const values = [uname, password];

    let response;
    try {
        const result = await connection.execute(
            `CALL VerifyUserCredentials(?, ?, @verified, @error, @uid)`,
            values
        );
        const variables = await connection.query("SELECT @verified, @error, @uid");
        const data = variables[0][0]; // Access the first object within the first array

        const verified = data["@verified"];
        const error = data["@error"];
        const uid = data["@uid"];

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

    } catch (err) {
        console.error(err);
        response = NextResponse.json({ message: "Error!" }, { status: 400 }); // Internal Server Error (handle specific errors later)
        return response;
    } finally {
        connection.end(); // Close connection
        return response;
    }
}

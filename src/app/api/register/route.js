// app/api/register.js
import connectToDb from "../db";
import { NextResponse } from 'next/server';

export async function POST(req, context) {
    const bodyData = await req.json();
    const connection = connectToDb();
    const { name, email, age, gender, mobile, uname, password } = bodyData;
    const sql = `CALL InsertUser(?, ?, ?, ?, ?, ?, ?)`;
    const values = [name, email, age, gender, mobile, uname, password];

    let response;
    try {
        const result = await connection.execute(sql, values);
        response = NextResponse.json({ message: 'Success!' }); // Example response
    } catch (err) {
        console.error(err);
        response = NextResponse.json({ message: 'Invalid!' });// Internal Server Error (handle specific errors later)
        
    } finally {
        connection.end(); // Close connection
        return response
    }
}

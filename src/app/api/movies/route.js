// app/api/login.js
import connectToDb from "../db";
import { NextResponse } from "next/server";


export async function GET(req, res) {
    const connection = connectToDb().promise();

    let response;
    try {      
        const result = await connection.query('SELECT * FROM Movies');
        const data = result[0]; // Access the first object within the first array
        response = NextResponse.json({ data });

    } catch (err) {
        console.error(err);
        response = NextResponse.json({ message: "Error!" }, { status: 400 }); // Internal Server Error (handle specific errors later)
        return response;
    } finally {
        connection.end(); // Close connection
        return response;
    }
    
}

import connectToDb from "../db";
import { NextResponse } from "next/server";

export async function POST(req, res){
    const bodyData = await req.json();
    const connection = connectToDb().promise();
    const { bid } = bodyData;
    let response;
    let values = [bid];
    try{
        const result = await connection.execute("CALL DeleteBooking(?)", values);
        response = NextResponse.json({ message: "Success!" });
    }
    catch(e){
        console.log(e)
        response = NextResponse.json({ message: "Error!" }, { status: 500 });
        return response;
    }
    finally {
        if (connection) connection.end(); // Release the connection
        return response;
    }
}
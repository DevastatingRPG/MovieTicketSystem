import connectToDb from "../db";
import { NextResponse } from "next/server";

export async function POST(req, res){
    const bodyData = await req.json();
    const connection = connectToDb().promise();
    const { uid } = bodyData;
    let response;
    let values = [uid];
    try{
        const result = await connection.execute("CALL DeleteUser(?)", values);
        response = NextResponse.json({ message: "Success!" });
    }
    catch(e){
        console.error(e)
        response = NextResponse.json({ message: "Error!" }, { status: 500 });
        return response;
    }
    finally {
        if (connection) connection.end(); // Release the connection
        return response;
    }
}
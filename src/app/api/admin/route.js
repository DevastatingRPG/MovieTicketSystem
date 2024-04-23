// app/api/admin.js
import connectToDb from "../db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const bodyData = await req.json();
    const connection = connectToDb().promise();
    const {
        vid,
        city,
        pincode,
        location,
        avail,
        sid,
        name,
        trailer,
        stype,
        image,
    } = bodyData;

    const params = req.nextUrl.searchParams;
    const func = params.get("func");
    let response;
    let result;
    let values;
    try {
        switch (func) {
            case "insvenue":
                values = [vid, city, pincode, location, avail];
                result = await connection.execute(
                    "CALL InsertVenue(?, ?, ?, ?, ?)",
                    values
                );
                break;
            case "insshow":
                values = [sid, name, trailer, stype, image];
                result = await connection.execute(
                    "CALL InsertShow(?, ?, ?, ?, ?)",
                    values
                );
                break;
            case "delvenue":
                values = [vid];
                result = await connection.execute(
                    "DELETE FROM venue WHERE vid=?",
                    values
                );
                break;
            case "delshow":
                values = [sid];
                result = await connection.execute(
                    "DELETE FROM shows WHERE sid=?",
                    values
                );
                break;
            default:
                response = NextResponse.json({ message: "Invaid Function!" }, { status: 500 });
                return response
        }
        response = NextResponse.json({ message: "Success!" });
    } catch (err) {
        console.error(err);
        response = NextResponse.json({ message: "Error!" }, { status: 500 });
        return response;
    } finally {
        if (connection) connection.end(); // Release the connection
        return response;
    }
}

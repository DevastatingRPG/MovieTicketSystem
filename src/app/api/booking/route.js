// app/api/login.js
import connectToDb from "../db";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    const connection = connectToDb().promise();
    const params = req.nextUrl.searchParams;
    // const { func, uid, sid, vid } =
    const func = params.get("func");
    let response;
    let query;
    let result;
    try {
        switch (params.get("func")) {
            case "avail":
                query = `CALL Show_Availability(${params.get(
                    "sid"
                )}, ${params.get(
                    "vid"
                )}, @avail, @error); SELECT @avail, @error`;
                result = await connection.query(query);
                break;
            case "list":
                query =
                    "SELECT * FROM event_location; SELECT VID, location FROM venue; SELECT SID, name FROM shows;";
                result = await connection.query(query);
                break;
            case "occupied":
                query = `CALL GetOccupiedSeats(${params.get(
                    "sid"
                )}, ${params.get("vid")}, @occupied); SELECT @occupied;`;
                result = await connection.query(query);
                break;
            default:
                return res.status(400).json({ message: "Invalid function" });
        }

        if (result[0][0] && result[0][0]["@error"]) {
            response = NextResponse.json(
                { message: "Error!" },
                { status: 400 }
            );
            // Check for stored procedure errors
            return response;
        }

        const data = result[1].length ? result[0] : {}; // Extract data (if available)
        response = NextResponse.json({ data });
    } catch (err) {
        console.error(err);
        response = NextResponse.json({ message: "Error!" }, { status: 500 });
    } finally {
        if (connection) connection.end(); // Release the connection
        return response;
    }
}

export async function POST(req, res) {
    const bodyData = await req.json();
    const connection = connectToDb().promise();
    const { uid, vid, sid, pmeth, amount, seats, timing } = bodyData;

    let response;
    const values = [uid, sid, pmeth, amount];

    try {
        const result = await connection.execute(
            "CALL InsertBooking(?, ?, ?, ?, 'Y', @bid)",
            values
        );
        const variables = await connection.query("SELECT @bid");
        const data = variables[0][0];
        const bid = data["@bid"];       
        for (let seat of seats) {
            const values = [bid, vid, timing, seat];
            const result = await connection.execute("CALL InsertTicket(?, ?, ?, ?)", values)
        }
        response = NextResponse.json({ message: "Success!" });
    } catch (err) {
        console.error(err);
        response = NextResponse.json({ message: "Error!" }, { status: 400 }); // Internal Server Error (handle specific errors later)
        return response;
    } finally {
        connection.end(); // Close connection
        return response;
    }
}

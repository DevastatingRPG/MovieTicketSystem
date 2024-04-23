import { NextResponse } from "next/server";

const jwt = require("jsonwebtoken");

export async function POST(req, res) {
    try {
        const bodyData = await req.json();
        const { token } = bodyData;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return NextResponse.json(
                { message: "Expired" },
                {
                    status: 400,
                }
            );
        } else if (decoded.exp < Math.floor(Date.now() / 1000)) {
            return NextResponse.json(
                { message: "Expired" },
                {
                    status: 400,
                }
            );
        } else {
            // If the token is valid, return some protected data.
            return NextResponse.json(
                { data: "Protected data" },
                {
                    status: 200,
                }
            );
        }
    } catch (e) {
        console.error("Token verification failed", e);
        return NextResponse.json(
            { message: "Unauthorized" },
            {
                status: 400,
            }
        );
    }
}

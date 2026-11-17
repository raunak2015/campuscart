import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json(
            { message: "Logout successful" },
            { status: 200 }
        );

        response.cookies.set("campuscart-token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            expires: new Date(0),
        });

        return response;

    } catch (error) {
        console.error("Logout Error:", error);

        return NextResponse.json(
            { message: "Logout failed" },
            { status: 500 }
        );
    }
}

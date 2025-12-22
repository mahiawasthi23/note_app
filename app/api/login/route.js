import { NextResponse } from "next/server";
import connectToDB from "@/lib/mongodb";
import { User } from "@/app/models/User";
import { verifyPassword } from "@/lib/hashPassword";

export async function POST(request) {
    try {
        await connectToDB();

        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
        }

        
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

       
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

       

        return NextResponse.json({ message: "Login successful", user: { name: user.name, email: user.email } });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

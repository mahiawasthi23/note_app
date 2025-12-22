import { NextResponse } from "next/server";
import connectToDB from "@/lib/mongodb";
import { User } from "@/app/models/User";
import { verifyPassword } from "@/lib/hashPassword";

export async function POST(request) {
  try {
    await connectToDB();

    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );
    response.cookies.set("userId", user._id.toString(), {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    return response;

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

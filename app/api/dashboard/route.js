import { NextResponse } from "next/server";
import connectToDB from "@/lib/mongodb";
import { Note } from "@/app/models/Note";
import { cookies } from "next/headers";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectToDB();

    const cookieStore = await cookies(); 
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json([], { status: 200 });
    }

    const notes = await Note.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).sort({ createdAt: -1 });

    return NextResponse.json(notes, { status: 200 });

  } catch (error) {
    console.error("GET NOTES ERROR:", error);
    return NextResponse.json([], { status: 500 });
  }
}


export async function POST(req) {
  try {
    await connectToDB();

    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        { message: "Not logged in" },
        { status: 401 }
      );
    }

    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content required" },
        { status: 400 }
      );
    }

    const note = await Note.create({
      userId: new mongoose.Types.ObjectId(userId),
      title,
      content,
    });

    return NextResponse.json(note, { status: 201 });

  } catch (error) {
    console.error("CREATE NOTE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to create note" },
      { status: 500 }
    );
  }
}


export async function PUT(req) {
  try {
    await connectToDB();

    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    const { id, title, content } = await req.json();

    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: id,
        userId: new mongoose.Types.ObjectId(userId),
      },
      { title, content },
      { new: true }
    );

    return NextResponse.json(updatedNote, { status: 200 });

  } catch (error) {
    console.error("UPDATE NOTE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to update note" },
      { status: 500 }
    );
  }
}


export async function DELETE(req) {
  try {
    await connectToDB();

    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    const { id } = await req.json();

    await Note.findOneAndDelete({
      _id: id,
      userId: new mongoose.Types.ObjectId(userId),
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("DELETE NOTE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to delete note" },
      { status: 500 }
    );
  }
}

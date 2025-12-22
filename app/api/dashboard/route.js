import connectToDB from "@/lib/mongodb";
import { Note } from "@/app/models/Note";
import { NextResponse } from "next/server";


export async function GET() {
  await connectToDB();
  const notes = await Note.find().sort({ createdAt: -1 });
  return NextResponse.json(notes);
}

export async function POST(req) {
  await connectToDB();
  const { title, content } = await req.json();

  const note = await Note.create({ title, content });
  return NextResponse.json(note, { status: 201 });
}


export async function PUT(req) {
  await connectToDB();
  const { id, title, content } = await req.json();

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );

  return NextResponse.json(updatedNote);
}


export async function DELETE(req) {
  await connectToDB();
  const { id } = await req.json();

  await Note.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

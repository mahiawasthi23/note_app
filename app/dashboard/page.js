"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Trash2, Edit2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "" });

 
  const fetchNotes = async () => {
    const res = await fetch("/api/dashboard");
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

 
  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notes, searchQuery]);

  
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6;
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
  const currentNotes = filteredNotes.slice(
    (currentPage - 1) * notesPerPage,
    currentPage * notesPerPage
  );

  
  const handleSave = async () => {
    if (!formData.title || !formData.content) return alert("Fill all fields");

    if (editingNote) {
      await fetch("/api/dashboard", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingNote._id,
          title: formData.title,
          content: formData.content,
        }),
      });
    } else {
      await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }

    setIsModalOpen(false);
    setFormData({ title: "", content: "" });
    setEditingNote(null);
    fetchNotes();
  };


  const handleDelete = async (id) => {
    await fetch("/api/dashboard", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 p-6 pb-24">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">

     
        <header className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">My Notes</h1>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              placeholder="Search notes..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </header>

      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentNotes.map((note) => (
            <Card key={note._id} className="group">
              <CardHeader className="flex flex-row justify-between">
                <CardTitle>{note.title}</CardTitle>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      setEditingNote(note);
                      setFormData({
                        title: note.title,
                        content: note.content,
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(note._id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 line-clamp-3">
                  {note.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

      
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 pt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight />
            </Button>
          </div>
        )}
      </div>

    
      <Button
        className="fixed bottom-8 right-8 rounded-full h-14 px-6"
        onClick={() => {
          setEditingNote(null);
          setFormData({ title: "", content: "" });
          setIsModalOpen(true);
        }}
      >
        <Plus className="mr-2" /> Add Note
      </Button>

     
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingNote ? "Edit Note" : "New Note"}
            </DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <textarea
            className="border rounded-md p-3 text-sm min-h-32"
            placeholder="Write note..."
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

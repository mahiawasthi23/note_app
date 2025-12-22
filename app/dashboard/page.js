"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Trash2,
  Edit2,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User as UserIcon,
  StickyNote,
  Sparkles
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "" });

  // Authentication & Notes fetching logic (Keeping your functional logic as is)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        if (!res.ok) { router.push("/login"); return; }
        const data = await res.json();
        setUser(data.user ?? data);
      } catch (error) { router.push("/login"); }
    };
    fetchUser();
  }, [router]);

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/dashboard", { credentials: "include" });
      const data = await res.json();
      setNotes(Array.isArray(data) ? data : []);
    } catch (error) { setNotes([]); }
  };

  // useEffect(() => { fetchNotes(); }, []);

  useEffect(() => {
    const loadData = async () => {
      await fetchNotes();
    };
    loadData();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    router.push("/");
  };

  // Search & Pagination Logic
  const filteredNotes = useMemo(() => {
    return notes.filter(note =>
      (note.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.content || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notes, searchQuery]);

  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6;
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
  const currentNotes = filteredNotes.slice((currentPage - 1) * notesPerPage, currentPage * notesPerPage);

  const handleSave = async () => {
    if (!formData.title || !formData.content) return alert("Fill all fields");
    const method = editingNote ? "PUT" : "POST";
    const body = editingNote ? { id: editingNote._id, ...formData } : formData;

    await fetch("/api/dashboard", {
      method: method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setIsModalOpen(false);
    setEditingNote(null);
    setFormData({ title: "", content: "" });
    fetchNotes();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this note?")) return;
    await fetch("/api/dashboard", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:to-black p-4 md:p-8 pb-32">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Modern Navbar Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-xl shadow-zinc-200/50 dark:shadow-none">
          <div className="flex items-center gap-3 pl-2">
            <div className="bg-black dark:bg-white p-2 rounded-xl shadow-lg">
              <StickyNote className="h-5 w-5 text-white dark:text-black" />
            </div>
            <h1 className="text-xl font-black tracking-tighter italic">MY.NOTES</h1>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-black transition-colors" />
              <Input
                placeholder="Search your thoughts..."
                className="pl-10 h-11 bg-zinc-100/50 border-none rounded-2xl focus:ring-2 focus:ring-black/5 transition-all"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 h-11 w-11 rounded-2xl hover:bg-zinc-100 transition-all overflow-hidden border border-zinc-200">
                    <Avatar className="h-full w-full">
                      <AvatarFallback className="bg-gradient-to-br from-zinc-100 to-zinc-300 font-bold">
                        {user.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2 shadow-2xl border-zinc-100">
                  <DropdownMenuLabel className="font-normal p-3">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-zinc-500">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer py-2.5">
                    <UserIcon className="h-4 w-4" /> Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="rounded-lg gap-2 cursor-pointer py-2.5 text-red-600 focus:bg-red-50 focus:text-red-600">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>

        {/* Notes Grid */}
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-700">
            {currentNotes.map((note) => (
              <Card key={note._id} className="group relative bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm border-zinc-200/50 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-3xl overflow-hidden">
                <CardHeader className="flex flex-row justify-between items-start pb-2">
                  <CardTitle className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">{note.title}</CardTitle>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-xl bg-zinc-100 hover:bg-zinc-200"
                      onClick={() => { setEditingNote(note); setFormData({ title: note.title, content: note.content }); setIsModalOpen(true); }}
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-600"
                      onClick={() => handleDelete(note._id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap break-words overflow-hidden leading-relaxed">
                    {note.content}
                  </p>
                  <div className="mt-4">
                    <span className="text-[10px] uppercase font-bold text-zinc-400">{note.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-4">
            <div className="bg-zinc-100 p-6 rounded-full">
              <Sparkles className="h-12 w-12 text-zinc-300" />
            </div>
            <h3 className="text-xl font-bold text-zinc-400">No notes found. Start creating!</h3>
          </div>
        )}

        {/* Simple Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 pt-10">
            <Button variant="ghost" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="rounded-2xl h-12 w-12">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-sm font-black tracking-widest text-zinc-400">
              {currentPage} / {totalPages}
            </span>
            <Button variant="ghost" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="rounded-2xl h-12 w-12">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Floating Add Note Button */}
      <Button
        className="fixed bottom-10 right-10 rounded-full h-16 px-8 bg-black text-white hover:bg-zinc-800 shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 group"
        onClick={() => { setEditingNote(null); setFormData({ title: "", content: "" }); setIsModalOpen(true); }}
      >
        <Plus className="mr-2 h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
        <span className="font-bold text-lg">Add Note</span>
      </Button>

      {/* Modern Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-3xl border-none shadow-2xl p-0 overflow-hidden">
          <div className="bg-zinc-50 p-6 border-b">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black tracking-tighter uppercase italic">
                {editingNote ? "Refine Note" : "Capture Idea"}
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Heading</label>
              <Input
                placeholder="Give it a name..."
                className="text-xl font-bold border-none bg-zinc-100/50 h-14 rounded-2xl focus:ring-0"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Body</label>
              <textarea
                className="w-full border-none bg-zinc-100/50 rounded-2xl p-4 text-sm min-h-[250px] focus:outline-none focus:ring-0 resize-none font-medium leading-relaxed"
                placeholder="Pour your thoughts here..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter className="p-6 bg-zinc-50 border-t gap-3 sm:gap-0">
            <Button variant="ghost" className="rounded-xl font-bold" onClick={() => setIsModalOpen(false)}>Discard</Button>
            <Button onClick={handleSave} className="bg-black text-white rounded-xl px-10 font-bold hover:bg-zinc-800 transition-all">
              {editingNote ? "Update Note" : "Save Note"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
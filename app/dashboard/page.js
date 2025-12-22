// "use client";

// import React, { useState, useMemo } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Plus, Search, Trash2, Edit2, ChevronLeft, ChevronRight } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";

// export default function Dashboard() {
//   const [notes, setNotes] = useState([
//     { id: 1, title: "Backend Plan", content: "Discuss MongoDB schema with my friend.", date: "Dec 22" },
//     { id: 2, title: "Shopping List", content: "Buy a new keyboard and coffee.", date: "Dec 21" },
//   ]);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingNote, setEditingNote] = useState(null);
//   const [formData, setFormData] = useState({ title: "", content: "" });

//   // --- 1. SEARCH LOGIC ---
//   const filteredNotes = useMemo(() => {
//     return notes.filter(note => 
//       note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       note.content.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [notes, searchQuery]);

//   // --- 2. PAGINATION LOGIC ---
//   const [currentPage, setCurrentPage] = useState(1);
//   const notesPerPage = 6;
//   const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
//   const currentNotes = filteredNotes.slice((currentPage - 1) * notesPerPage, currentPage * notesPerPage);

//   // --- 3. ADD / EDIT LOGIC (Yahan Backend API aayegi) ---
//   const handleSave = async () => {
//     if (!formData.title || !formData.content) return alert("Please fill all fields");

//     if (editingNote) {
//       // TODO: Your friend will add: await fetch(`/api/notes/${editingNote.id}`, { method: 'PUT', ... })
//       setNotes(notes.map(n => n.id === editingNote.id ? { ...n, ...formData } : n));
//     } else {
//       // TODO: Your friend will add: await fetch('/api/notes', { method: 'POST', ... })
//       const newNote = {
//         id: crypto.randomUUID(),
//         ...formData,
//         date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
//       };
//       setNotes([newNote, ...notes]);
//     }
//     closeModal();
//   };

//   // --- 4. DELETE LOGIC (Yahan Backend API aayegi) ---
//   const handleDelete = async (id) => {
//     if (confirm("Are you sure you want to delete this note?")) {
//       // TODO: Your friend will add: await fetch(`/api/notes/${id}`, { method: 'DELETE' })
//       setNotes(notes.filter(note => note.id !== id));
//     }
//   };

//   const openModal = (note = null) => {
//     if (note) {
//       setEditingNote(note);
//       setFormData({ title: note.title, content: note.content });
//     } else {
//       setEditingNote(null);
//       setFormData({ title: "", content: "" });
//     }
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setFormData({ title: "", content: "" });
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-zinc-950 p-6 flex flex-col relative pb-24">
//       <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col gap-6">
        
//         {/* Header & Search */}
//         <header className="flex flex-col md:flex-row items-center justify-between gap-4">
//           <h1 className="text-2xl font-bold italic tracking-tighter">NOTES APP</h1>
//           <div className="relative w-full max-w-sm">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
//             <Input 
//               placeholder="Search your notes..." 
//               className="pl-9 bg-zinc-50 dark:bg-zinc-900 border-none"
//               value={searchQuery}
//               onChange={(e) => {setSearchQuery(e.target.value); setCurrentPage(1);}}
//             />
//           </div>
//         </header>

//         <hr className="border-zinc-100 dark:border-zinc-800" />

//         {/* Notes Grid */}
//         {currentNotes.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {currentNotes.map((note) => (
//               <Card key={note.id} className="group relative border-zinc-200 shadow-sm hover:shadow-md transition-all">
//                 <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
//                   <CardTitle className="text-lg font-semibold">{note.title}</CardTitle>
//                   <div className="flex gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
//                     <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openModal(note)}>
//                       <Edit2 className="h-4 w-4 text-zinc-600" />
//                     </Button>
//                     <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(note.id)}>
//                       <Trash2 className="h-4 w-4 text-red-500" />
//                     </Button>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3 leading-relaxed">
//                     {note.content}
//                   </p>
//                   <span className="text-[10px] uppercase font-bold text-zinc-400">{note.date}</span>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20 text-zinc-400">No notes found matching your search.</div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="mt-auto pt-10 flex items-center justify-center gap-4">
//             <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>
//               <ChevronLeft className="h-4 w-4" />
//             </Button>
//             <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
//             <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* --- Floating Action Button (FAB) --- */}
//       <Button 
//         onClick={() => openModal()}
//         className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all bg-black text-white dark:bg-white dark:text-black"
//       >
//         <Plus className="h-8 w-8" />
//       </Button>

//       {/* --- Add/Edit Dialog --- */}
//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="sm:max-w-[500px]">
//           <DialogHeader>
//             <DialogTitle className="text-xl font-bold">
//               {editingNote ? "Edit Note" : "New Note"}
//             </DialogTitle>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <Input 
//               placeholder="Note Title" 
//               className="font-semibold text-lg border-zinc-200"
//               value={formData.title} 
//               onChange={(e) => setFormData({...formData, title: e.target.value})}
//             />
//             <textarea 
//               className="w-full min-h-[200px] p-3 rounded-md border border-zinc-200 bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
//               placeholder="Start typing your note here..."
//               value={formData.content}
//               onChange={(e) => setFormData({...formData, content: e.target.value})}
//             />
//           </div>
//           <DialogFooter>
//             <Button variant="ghost" onClick={closeModal}>Cancel</Button>
//             <Button onClick={handleSave} className="px-8">
//               {editingNote ? "Update" : "Save"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


"use client";

import React, { useState, useMemo } from 'react';
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
  const [notes, setNotes] = useState([
    { id: 1, title: "Backend Plan", content: "Discuss MongoDB schema with my friend.", date: "Dec 22" },
    { id: 2, title: "Shopping List", content: "Buy a new keyboard and coffee.", date: "Dec 21" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "" });

  // --- 1. SEARCH LOGIC (Fix) ---
  const filteredNotes = useMemo(() => {
    return notes.filter(note => 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notes, searchQuery]);

  // --- 2. PAGINATION LOGIC ---
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6;
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
  const currentNotes = filteredNotes.slice((currentPage - 1) * notesPerPage, currentPage * notesPerPage);

  // --- 3. SAVE LOGIC (API placeholder included) ---
  const handleSave = () => {
    if (!formData.title || !formData.content) return alert("Please fill all fields");

    if (editingNote) {
      // Backend: await fetch(`/api/notes/${editingNote.id}`, { method: 'PUT', ... })
      setNotes(notes.map(n => n.id === editingNote.id ? { ...n, ...formData } : n));
    } else {
      // Backend: await fetch('/api/notes', { method: 'POST', ... })
      const newNote = {
        id: crypto.randomUUID(), // Lint error fix
        ...formData,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      };
      setNotes([newNote, ...notes]);
    }
    setIsModalOpen(false);
    setFormData({ title: "", content: "" });
  };

  const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 p-6 flex flex-col relative pb-24 font-sans">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col gap-6">
        
        {/* Header & Search Bar */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">My Notes</h1>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input 
              placeholder="Search notes..." 
              className="pl-10 bg-zinc-50 border-zinc-200"
              value={searchQuery}
              onChange={(e) => {setSearchQuery(e.target.value); setCurrentPage(1);}}
            />
          </div>
        </header>

        <hr className="border-zinc-100 dark:border-zinc-800" />

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentNotes.map((note) => (
            <Card key={note.id} className="group border-zinc-200 shadow-sm hover:border-zinc-300 transition-all">
              <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                <CardTitle className="text-lg font-semibold">{note.title}</CardTitle>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" onClick={() => {
                    setEditingNote(note);
                    setFormData({ title: note.title, content: note.content });
                    setIsModalOpen(true);
                  }}>
                    <Edit2 className="h-4 w-4 text-zinc-500" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(note.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 mb-4 line-clamp-3 leading-relaxed">{note.content}</p>
                <span className="text-[10px] uppercase font-bold text-zinc-400">{note.date}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-auto flex items-center justify-center gap-4 py-8">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}><ChevronLeft/></Button>
            <span className="text-sm">Page {currentPage} of {totalPages}</span>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}><ChevronRight/></Button>
          </div>
        )}
      </div>

      {/* --- New "Add Note" Button (Bottom Right) --- */}
      <Button 
        onClick={() => {
          setEditingNote(null);
          setFormData({ title: "", content: "" });
          setIsModalOpen(true);
        }}
        className="fixed bottom-8 right-8 h-14 px-6 rounded-full shadow-xl hover:scale-105 transition-all gap-2 bg-black text-white hover:bg-zinc-800"
      >
        <Plus className="h-5 w-5" />
        <span className="font-semibold">Add Note</span>
      </Button>

      {/* --- Add/Edit Dialog --- */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle className="text-xl">{editingNote ? "Edit Note" : "Create New Note"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input 
              placeholder="Title" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
            <textarea 
              className="w-full min-h-50 p-3 rounded-md border border-zinc-200 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
              placeholder="Write your note here..."
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
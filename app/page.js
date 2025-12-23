"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Search, 
  Trash2, 
  Edit2, 
  CloudSync, 
  ShieldCheck, 
  LayoutDashboard 
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-100 via-white to-zinc-200 dark:from-zinc-900 dark:to-black">
      
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-md border border-zinc-200 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Sparkles className="h-4 w-4 text-purple-600" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
            Cloud Powered Notes
          </span>
        </div> */}

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white mb-6">
          Smart<span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">Notes</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-12 leading-relaxed font-medium">
          A high-performance workspace to <span className="text-zinc-900 font-bold underline decoration-zinc-300">Create, Edit, and Manage</span> your thoughts. 
          Powered by MongoDB for <span className="text-zinc-900 font-bold">real-time sync</span>, integrated with <span className="text-zinc-900 font-bold">instant search</span>, 
          and secured with <span className="text-zinc-900 font-bold">JWT Authentication</span>. 
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
          <Link href="/login">
            <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-2xl hover:scale-105 transition-all bg-black text-white dark:bg-white dark:text-black">
              Start Writing Now
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full backdrop-blur-sm border-zinc-300 gap-2 hover:bg-zinc-50 transition-all">
              <LayoutDashboard className="h-5 w-5" /> Login
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left border-t border-zinc-200 dark:border-zinc-800 pt-16">
          <div className="space-y-3 p-4 rounded-2xl transition-colors hover:bg-zinc-50">
            <div className="h-10 w-10 bg-zinc-900 text-white rounded-lg flex items-center justify-center">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-zinc-900">Instant Search</h3>
            <p className="text-sm text-zinc-500">Find any note in milliseconds using our optimized search filter logic.</p>
          </div>

          <div className="space-y-3 p-4 rounded-2xl transition-colors hover:bg-zinc-50">
            <div className="h-10 w-10 bg-zinc-900 text-white rounded-lg flex items-center justify-center">
              <CloudSync className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-zinc-900">MongoDB Sync</h3>
            <p className="text-sm text-zinc-500">Your notes are stored in the cloud. Access them anytime from any device.</p>
          </div>

          <div className="space-y-3 p-4 rounded-2xl transition-colors hover:bg-zinc-50">
            <div className="h-10 w-10 bg-zinc-900 text-white rounded-lg flex items-center justify-center">
              <Edit2 className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-zinc-900">Seamless CRUD</h3>
            <p className="text-sm text-zinc-500">Smoothly Create, Read, Update, and Delete notes with our Shadcn Dialog UI.</p>
          </div>

          <div className="space-y-3 p-4 rounded-2xl transition-colors hover:bg-zinc-50">
            <div className="h-10 w-10 bg-zinc-900 text-white rounded-lg flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-zinc-900">Secure Auth</h3>
            <p className="text-sm text-zinc-500">Protected dashboard access with secure login and logout functionality.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
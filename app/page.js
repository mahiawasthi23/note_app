import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-6 text-center">
      <h1 className="text-5xl font-bold tracking-tight text-zinc-900 mb-4">
        Smart Notes
      </h1>
      <p className="max-w-[600px] text-lg text-zinc-600 mb-8">
        The simplest way to keep your thoughts organized. Built with Next.js, Mongo, and Shadcn.
      </p>
      
      <div className="flex gap-4">
        <Link href="/login">
          <Button size="lg">Login to App</Button>
        </Link>
        <Link href="/signup">
          <Button variant="outline" size="lg">Create Account</Button>
        </Link>
      </div>
    </div>
  );
}
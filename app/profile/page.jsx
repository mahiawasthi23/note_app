"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/me")
            .then(res => {
                if (!res.ok) router.push("/login");
                return res.json();
            })
            .then(data => setUser(data));
    }, []);

    if (!user) return <p className="text-center mt-20">Loading...</p>;

    const logout = async () => {
        await fetch("/api/logout", { method: "POST" });
        router.push("/");
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-zinc-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm text-zinc-500">Name</p>
                        <p className="font-medium">{user.name}</p>
                    </div>

                    <div>
                        <p className="text-sm text-zinc-500">Email</p>
                        <p className="font-medium">{user.email}</p>
                    </div>

                    <Button className="w-full" onClick={logout}>
                        Logout
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

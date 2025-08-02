"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import axios from "axios";

import api from "@/lib/axios";

type Note = {
  _id: string;
  title: string;
  content: string;
  updatedAt: string;
};

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  // Fetch Notes
  useEffect(() => {
    const fetchNotes = async () => {
      const token = await getToken();
      const res = await api.get("/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    };
    fetchNotes();
  }, []);

  // Create Note
  const handleCreateNote = async () => {
    if (!title.trim() || !content.trim()) return;

    const token = await getToken();
    const res = await axios.post(
      "http://localhost:5000/notes",
      { title, content },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setNotes((prev) => [res.data, ...prev]);
    setTitle("");
    setContent("");
  };

  return (
    <div className="min-h-screen p-6 bg-background">
      <SignedIn>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Your Notes</CardTitle>

              {/* Create Note Button and Modal */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    New Note
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a New Note</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Note Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <Textarea
                      placeholder="Your content here..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={5}
                    />
                    <Button onClick={handleCreateNote} className="w-full">
                      Save Note
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>

            <CardContent>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                {notes.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No notes yet. Create one using the button above.
                  </p>
                ) : (
                  notes.map((note) => (
                    <div
                      key={note._id}
                      className="mb-4 p-3 border rounded-md bg-muted"
                    >
                      <h2 className="font-semibold">{note.title}</h2>
                      <p className="text-sm text-muted-foreground">
                        {note.content}
                      </p>
                    </div>
                  ))
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="text-center mt-10">
          <p className="text-lg mb-4">You are signed out.</p>
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        </div>
      </SignedOut>
    </div>
  );
}

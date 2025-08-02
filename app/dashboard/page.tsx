"use client";
import Assistant from "@/components/Assistant";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useAuth } from "@clerk/nextjs";
import {
  Card, CardHeader, CardContent, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pencil, Trash2, Plus } from "lucide-react";
import axios from 'axios';

type Note = {
  _id: string;
  title: string;
  content: string;
  updatedAt: string;
};

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [open, setOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const fetchNotes = async () => {
    const token = await getToken();
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSave = async () => {
    const token = await getToken();
    if (editingNote) {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/${editingNote._id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
    setTitle("");
    setContent("");
    setEditingNote(null);
    setOpen(false);
    fetchNotes();
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    const token = await getToken();
    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotes();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Notes</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 w-4 h-4" /> Create Note
        </Button>
      </div>

      <ScrollArea className="h-[70vh]">
        <div className="grid gap-4">
          {notes.map((note) => (
            <Card key={note._id}>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>{note.title}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(note)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(note._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {note.content}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingNote ? "Edit Note" : "Create Note"}
            </DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-2"
          />
          <Textarea
            placeholder="Your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px]"
          />
          <DialogFooter>
            <Button onClick={handleSave}>
              {editingNote ? "Update Note" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Assistant />
    </div>
    
  );
}



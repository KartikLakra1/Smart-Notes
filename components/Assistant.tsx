"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { useAuth } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import axios from 'axios';

export default function Assistant() {
  const { getToken } = useAuth();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    setAnswer("");
    const token = await getToken();

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ai/query`,
        { question },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("I'm out of token right now, Gimme some Money to buy them!!! or wait for them to get replenished");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-secondary rounded-xl shadow space-y-4 mt-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold">Ask your AI Assistant</h2>
      <Textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something based on your notes..."
      />
      <Button onClick={handleAsk} disabled={loading}>
        {loading ? <Loader className="animate-spin w-4 h-4" /> : "Ask"}
      </Button>
      {answer && (
        <div className="p-4 bg-muted rounded-md border text-sm whitespace-pre-wrap">
          <strong className="block mb-1">AI Response:</strong>
          {answer}
        </div>
      )}
    </div>
  );
}

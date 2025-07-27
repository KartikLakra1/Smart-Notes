'use client';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import axios from '@/lib/axios';

export default function AiAssistantPage() {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = async () => {
    try {
      const res = await axios.post('/api/ai/ask', { prompt });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setAnswer('Something went wrong while contacting the AI.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask a question..."
      />
      <Button onClick={handleAsk}>Ask AI</Button>
      <div className="bg-muted p-4 rounded shadow whitespace-pre-wrap">{answer}</div>
    </div>
  );
}

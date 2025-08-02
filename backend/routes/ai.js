import express from 'express';
import openai from '../utils/openai.js';
import Note from '../models/Note.js';
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/ai/query
router.post('/query', requireAuth, async (req, res) => {
  
  try {
    const { question } = req.body;
    const userId = req.userId;

    const notes = await Note.find({ userId });

    const notesText = notes
      .map((n, i) => `${i + 1}. ${n.title}:\n${n.content}`)
      .join('\n\n');

    const prompt = `
You are a helpful assistant. Based on the following notes:

${notesText}

Answer this question: "${question}" in just few words
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    });

    res.json({ answer: completion.choices[0].message.content.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI assistant failed to respond' });
  }
});

export default router;

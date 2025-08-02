import Note from "../models/Note.js";

export const createNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.auth.userId;

  try {
    const note = await Note.create({ userId, title, content });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getNotes = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const notes = await Note.find({ userId }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const note = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    await Note.findByIdAndDelete(id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

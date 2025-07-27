# 🧠 Smart Notes App with Contextual AI Assistant

A full-stack, AI-powered notes application where users can create, organize, and interact with topic-based notes. This app integrates OpenAI’s GPT-4 to summarize notes, answer context-aware questions, and suggest personalized learning paths — like ChatPDF, but built from scratch with your own notes.

---

## ✨ Features

- 🗂️ Create, view, edit, and delete **topic-based notes**
- 🤖 Built-in **AI Assistant** powered by GPT-4 for:
  - Summarizing notes
  - Answering context-based questions
  - Suggesting learning plans
- 🔐 **Authentication** using Clerk (OAuth, JWT-secured APIs)
- 🧾 **PDF Upload & Parsing** (Coming Soon)
- 💻 Responsive UI with **shadcn/ui** & Tailwind CSS
- 🧠 ChatGPT-like interaction based on your uploaded content
- ☁️ Dockerized backend with plans to deploy on **AWS EC2**

---

## 🏗️ Tech Stack

| Frontend          | Backend            | AI/ML        | Auth     | Deployment    |
| ----------------- | ------------------ | ------------ | -------- | ------------- |
| Next.js 14        | Node.js + Express  | OpenAI GPT-4 | Clerk    | Docker + AWS  |
| TypeScript        | MongoDB + Mongoose |              | JWT Auth | EC2 (Planned) |
| Tailwind + shadcn | REST APIs          |              |          |               |

---

## 📸 UI Preview

> Coming soon: Screenshots or a Loom walkthrough

---

## 🧰 Installation & Development

### 📦 Prerequisites

- Node.js ≥ 18
- MongoDB
- OpenAI API key
- Clerk project + credentials

### 🔧 Setup

```bash
# Clone the repository
git clone https://github.com/your-username/smart-notes-ai.git
cd smart-notes-ai

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

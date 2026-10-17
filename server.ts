import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/gemini", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Gemini API key is missing on the server." });
      }

      const { prompt, systemInstruction, useJson } = req.body;
      const ai = new GoogleGenAI({ apiKey });
      
      const config: any = {};
      if (systemInstruction) config.systemInstruction = systemInstruction;
      if (useJson) config.responseMimeType = "application/json";

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: Object.keys(config).length > 0 ? config : undefined,
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    }
  });

  // --- Database Editor APIs ---
  const DATABASE_DIR = path.join(process.cwd(), "src", "databases");

  // Helper to check if file is within database directory
  const isSafePath = (filename: string) => {
    const resolvedPath = path.resolve(DATABASE_DIR, filename);
    return resolvedPath.startsWith(DATABASE_DIR);
  };

  // Get list of editable files
  app.get("/api/database/files", (req, res) => {
    try {
      const filesList = [
        { id: "sentences.json", name: "Base de Datos Principal (Sentences)", desc: "Frases principales, traducciones, categorías y emojis.", type: "sentences" },
        { id: "vocabulary.json", name: "Vocabulario (Vocabulary)", desc: "Palabras sueltas con traducciones, categorías y emojis.", type: "vocabulary" },
        { id: "grammar_quizzes.json", name: "Quizzes de Gramática (Grammar)", desc: "Preguntas de opción múltiple de gramática con opciones, respuesta correcta y explicación.", type: "grammar" },
        { id: "dialogues.json", name: "Diálogos y Conversaciones (Dialogues)", desc: "Conversaciones interactivas por turnos entre hablante A y B.", type: "dialogues" },
        { id: "reading_comprehension.json", name: "Comprensión Lectora (Reading)", desc: "Textos de lectura con preguntas de comprensión asociadas.", type: "reading" }
      ];
      res.json(filesList);
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Error listing database files" });
    }
  });

  // Read a database file
  app.get("/api/database/read", async (req, res) => {
    try {
      const { file } = req.query;
      if (!file || typeof file !== "string") {
        return res.status(400).json({ error: "Filename is required" });
      }

      if (!isSafePath(file)) {
        return res.status(403).json({ error: "Access denied" });
      }

      const filePath = path.join(DATABASE_DIR, file);
      const fs = await import("fs");
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
      }

      const content = fs.readFileSync(filePath, "utf8");
      res.json({ content: JSON.parse(content) });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Error reading file" });
    }
  });

  // Save a database file
  app.post("/api/database/save", async (req, res) => {
    try {
      const { file, content } = req.body;
      if (!file || typeof file !== "string" || !content) {
        return res.status(400).json({ error: "File name and content are required" });
      }

      if (!isSafePath(file)) {
        return res.status(403).json({ error: "Access denied" });
      }

      // Validate JSON structure
      let parsedData;
      try {
        parsedData = typeof content === "string" ? JSON.parse(content) : content;
      } catch (jsonErr) {
        return res.status(400).json({ error: "Invalid JSON format: " + (jsonErr as Error).message });
      }

      const filePath = path.join(DATABASE_DIR, file);
      const fs = await import("fs");
      fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2), "utf8");

      res.json({ success: true, message: "Database saved successfully" });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Error saving file" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

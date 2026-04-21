import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/chat", async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await fetch('http://localhost:11434/api/generate', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3",
                prompt: prompt,
                stream: false
            })
        });
        const data = await response.json();
        res.json({ reply: data.response })
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(5001, () => {
    console.log("Backend running on http://localhost:5001");
});
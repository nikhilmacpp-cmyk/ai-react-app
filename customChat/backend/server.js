import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const documents = [
"Company allows 10 days leave",
"Refund policy is 7 days"
]

let chatHistory = []
const app = express();
app.use(express.json());
app.use(cors());

app.post("/chat", async (req, res) => {
    try {
        const prompt = 'HI';
        chatHistory.push({ role: "user", content: prompt });
        const formattedPrompt = chatHistory
      .map(msg => `${msg.role}: ${msg.content}`)
      .join("\n");
        const response = await fetch('http://localhost:11434/api/generate', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3",
                prompt: formattedPrompt,
                stream: false
            })
        });
        const data = await response.json();
        chatHistory.push({ role: "assistant", content: data.response });
        res.json({ reply: data.response })
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(5001, () => {
    console.log("Backend running on http://localhost:5001");
});
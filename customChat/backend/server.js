import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { OllamaEmbeddings } from "@langchain/ollama";

const main = async () => {
    try {
        const documents = [
            "Company allows 10 days leave",
            "Refund policy is 7 days"
        ]

        const embeddings = new OllamaEmbeddings({
            model: "llama3"
        })

        const vectorStore = await MemoryVectorStore.fromTexts(
            documents,
            [],
            embeddings
        )
        console.log("Embeddings loaded");

        let chatHistory = [];
        const app = express();
        app.use(express.json());
        app.use(cors());

        app.post("/chat", async (req, res) => {
            try {
                console.log('API Hit')
                const prompt = req.body.prompt;
                chatHistory.push({ role: "user", content: prompt });

                // RAG Retrieval
                const results =
                    await vectorStore.similaritySearchWithScore(
                        prompt,
                        1
                    );

                const [doc, score] = results[0];
                console.log(score)
                let context = '';
                if (score > 0.7) {
                    context = prompt;
                } else {

                    context = results[0][0]?.pageContent;
                }

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
    } catch (err) {
        console.log('error', err)
    }
}

main();
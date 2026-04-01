import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const app = express()
app.use(express.json());
const port = process.env.PORT || 3000;
const MODEL = "gemini-3-flash-preview";
app.get('/', (req: Request, res: Response) => {
    res.send(process.env.OPENAI_API_KEY)
});
app.get('/api/hello', (req: Request, res: Response) => {
    res.send({ message: 'hello server!!' })
});
app.post('/api/chat', async (req: Request, res: Response) => {
    const { prompt = '' } = req.body;
    try {
        const response = await ai.models.generateContent({
            model: MODEL,
            contents: prompt,
            config: {
                maxOutputTokens: 100, // 👈 control response length
                temperature: 0.2,     // optional (creativity)
            }
        })
        res.send({ message: 'Data extracted', status: 'sucess', res: response.text })
    } catch (err) {
        res.send({ message: 'Failed to extract', status: 'failure' })
    }
})
// const stream =  ai.models.generateContentStream({
//             model: "gemini-3-flash-preview",
//             contents: promptFromUser,
//         })
// });

app.listen(port, () => {
    console.log(`server is running on http:/localhost:${port}`)
});

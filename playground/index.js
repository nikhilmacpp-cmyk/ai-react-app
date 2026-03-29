import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
console.log("KEY:", process.env.GEMINI_API_KEY);
const getAIPromptResponse = async (promptFromUser = '') => {
    try {
        let finalText = ""
        const stream = await ai.models.generateContentStream({
            model: "gemini-3-flash-preview",
            contents: promptFromUser,
        })
        for await (const chunk of stream){
            if(chunk.text){
                finalText+= chunk.text}
        }
        return finalText;
    } catch (er) {
        console.log('Prompt error', er);
    }
}
const promptText = 'write a paragraph'
const getRes = await getAIPromptResponse(promptText);
console.log("AI Output:", getRes);

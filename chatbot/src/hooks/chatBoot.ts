import { useState } from 'react';
import axios from "axios";
const API_KEY = "AIzaSyCTYpUpiITUtndl3t-jnH_mcdhGnfBLoc8"; // paste your key here
const MODEL = "gemini-3-flash-preview";
interface Message {
    text: string,
    sender: "user" | "bot"
}
export const useChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = async (message: string) => {
        const newMessages: Message[] = [...messages, { text: message, sender: "user" }]
        setMessages(newMessages)
        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
                {
                    contents: [
                        {
                            parts: [{ text: message }]
                        }
                    ]
                }
            )
            const botMessage = response?.data?.candidates[0].content.parts[0].text;
            const BotNewMessages: Message[] = [...newMessages, { text: botMessage, sender: "bot" }]
            setMessages((BotNewMessages))
        } catch (er) {
            console.log('Error while fetching', er)
        }
    }
    return { messages, sendMessage }
}
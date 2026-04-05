import { useState } from 'react';
import { LuBot, LuSendHorizontal } from "react-icons/lu";
import {useChatBot} from '../hooks/chatBoot'
const ChatComponent = () => {
    const [input, setInput] = useState("");
    const {messages,sendMessage} = useChatBot();
    const handleSend = () => {
        if(input.trim()){
            sendMessage(input)
            setInput('')
        }
    }
    return (
        <div className="flex flex-col h-[80vh] bg-white">
            <h2 className="p-4 font-semibold text-lg text-center bg-blue-100 flex text-blue-800 items-center gap-2">
                React + OpenAI ChatBot <LuBot size={25} />
            </h2>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages?.map((msg,id)=>(
                    <div key={id} className={`p-3 rounder-lg max-w-xs 
                    ${msg.sender === 'user' ? 'bg-blue-500 text-white ml-auto' 
                    : 'bg-gray-300 text-gray-800'}`}>
                        {msg.text}
                    </div>
                ))}

            </div>
            <div className="flex items-center p-4 bg-gray-50">
                <input type="text" className="flex-1 p-2 border rounded-lg focus:outline-none"
                    placeholder="Your message here"
                    value={input}
                    onChange={(e) => { setInput(e.target.value) }}
                />
                < button onClick={handleSend} className="p-2">
                    <LuSendHorizontal size={20} />
                </button>
            </div>
        </div>
    )
}

export default ChatComponent
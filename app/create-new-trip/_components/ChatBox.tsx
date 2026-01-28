"use client";
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Send } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import EmptyBoxState from './EmptyBoxState';

type Message = {
    role: string,
    content: string
}

function ChatBox() {

    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const onSend = async () => {

        if (!userInput?.trim()) return;

        setLoading(true);
        setUserInput('');
        const newMsg: Message = {
            role: "user",
            content: userInput
        }

        setMessages((prev: Message[]) => [...prev, newMsg]);

        const result = await axios.post("/api/aimodel", {
            messages: [...messages, newMsg]
        });

        setMessages((prev: Message[]) => [...prev, {
            role: "assistant",
            content: result?.data?.resp
        }]);

        setLoading(false);
    }
    return (
        <div className='flex flex-col h-[80vh]'>
            {messages.length == 0 && <EmptyBoxState onSelectOption={(v:string)=>{setUserInput(v);onSend()}} />}
            {/* Display messages */}
            <section className='flex-1 overflow-y-auto p-4'>
                {
                    messages.map((msg: Message, index) => (
                        msg.role == 'user' ?
                            <div key={index} className='flex justify-end mt-2'>
                                <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg' >
                                    <p>{msg.content}</p>
                                </div>
                            </div> :
                            <div key={index} className='flex justify-start mt-2'>
                                <div className='max-w-[70%] bg-gray-100 text-black px-4 py-2 rounded-lg' >
                                    <p>{msg.content}</p>
                                </div>
                            </div>
                    ))
                }

                {
                    loading && 
                    <div className='max-w-lg min-w-auto bg-gray-100 text-black px-4 py-2 rounded-lg'>
                        <Loader2 className = "animate-spin" />
                    </div>
                }

            </section>
            {/* Input box */}
            <section>
                <div>
                    <div className="border border-primary/40 rounded-2xl mt-4 p-4 shadow-lg relative">
                        <Textarea placeholder="Create a Trip of your dreams..." className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none" onChange={(e) => setUserInput(e.target.value)} value={userInput} />
                        <Button size={"icon"} className="absolute bottom-4 right-4" onClick={() => onSend()}  >
                            <Send className="w-12 h-12" />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ChatBox
"use client";
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import React from 'react'

function ChatBox() {

    const onSend = () => {
        
    }
  return (
    <div className='flex flex-col h-[80vh]'>
        {/* Display messages */}
        <section className='flex-1 overflow-y-auto p-4'>
              <div className='flex justify-end mt-2'>
                <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg' >
                    <p>Hi, I'm WanderWise AI</p>
                </div>
            </div>
              <div className='flex justify-start mt-2'>
                <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg' >
                    <p>Hi, I'm WanderWise AI</p>
                </div>
            </div>
        </section>
        {/* Input box */}
        <section>
              <div>
                  <div className="border border-primary/40 rounded-2xl mt-4 p-4 shadow-lg relative">
                      <Textarea placeholder="Create a Trip of your dreams..." className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none" />
                      <Button size={"icon"} className="absolute bottom-4 right-4" onClick={() => onSend()} >
                          <Send className="w-12 h-12" />
                      </Button>
                  </div>
              </div>
        </section>
    </div>
  )
}

export default ChatBox
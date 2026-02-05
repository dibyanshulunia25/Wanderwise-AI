"use client";

import { suggestions } from "@/app/_components/Hero";

function EmptyBoxState({ onSelectOption }: any) {
    return (
        <div>
            <p className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>Hi, I&apos;m <span className='font-bold text-primary'>WanderWise AI</span>. To start your trip planning journey, Please Type Hi in the chat box</p>
            <div className="flex flex-col items-start justify-start gap-4 mt-4  ">
                {suggestions.map((suggestion, index) => (
                    <div onClick={() => onSelectOption(suggestion.title)} key={index} className="flex items-center gap-2 bg-gray-100 hover:cursor-pointer hover:bg-gray-50 rounded-full p-2">
                        {suggestion.icon}
                        <p className="text-secondary  opacity-70 text-sm capitalize">{suggestion.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EmptyBoxState
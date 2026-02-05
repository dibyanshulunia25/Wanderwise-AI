import React from 'react'
import ChatBox from './_components/ChatBox'
import Itinerary from './_components/Itinerary'

function CreateNewTrip() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2 p-4 absolute z-1000'>
            <div className='col-span-1'>
                <ChatBox />
            </div>
            <div className='col-span-2'>
                <Itinerary />
            </div>
        </div>
    )
}

export default CreateNewTrip
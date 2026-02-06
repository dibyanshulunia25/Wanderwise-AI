"use client"
import React, { useEffect } from 'react'
import ChatBox from './_components/ChatBox'
import Itinerary from './_components/Itinerary'
import { useTripDetail } from '../provider'

function CreateNewTrip() {
    const { setTripInfo } = useTripDetail();

    useEffect(() => {
        setTripInfo && setTripInfo(null);
    }, [])

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2 p-4'>
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
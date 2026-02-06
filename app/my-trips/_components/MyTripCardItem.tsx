"use client"
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Trip } from '../page';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MyTripCardItem = ({ trip, index }: { trip: Trip, index: number }) => {
    const [photoUrl, setPhotoUrl] = useState<string>('');

    // Normalize tripDetail
    let tripData = trip?.tripDetail;
    if (typeof tripData === 'string') {
        try {
            tripData = JSON.parse(tripData);
        } catch (e) {
            console.error("Failed to parse trip detail", e);
        }
    }
    // Handle nested trip_plan if it exists, otherwise use tripDetail itself
    const normalizedTrip = tripData?.trip_plan || tripData;

    const GetGooglePlaceDetail = async () => {
        const result = await axios.post('/api/google-place-detail', {
            placeName: normalizedTrip?.destination,
        });
        if (result?.data.e) {
            return;
        }
        setPhotoUrl(result?.data);
    }

    useEffect(() => {
        if (trip) {
            GetGooglePlaceDetail();
        }
    }, [trip])

    return (
        <Link key={index} className='p-4 border rounded-xl shadow-md flex flex-col gap-2 hover:scale-105 transition-all cursor-pointer' href={`/view-trips/${trip?.tripId}`}>
            <Image src={photoUrl ? photoUrl : '/placeholder.png'} alt="" width={500} height={500} className='rounded-2xl w-full h-[250px] object-cover' />
            <h2 className='font-med text-sm flex gap-2 items-center truncate'>{normalizedTrip?.origin}<ArrowRight className='w-4 h-4 shrink-0' />{normalizedTrip?.destination}</h2>
            <p className='text-sm text-gray-500'>
                {normalizedTrip?.duration} Trip with {normalizedTrip?.budget} Budget
            </p>

        </Link>
    )
}

export default MyTripCardItem
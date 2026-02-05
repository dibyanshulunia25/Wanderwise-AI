"use client"
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Trip } from '../page';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MyTripCardItem = ({trip, index}: {trip: Trip, index: number}) => {
    const [photoUrl, setPhotoUrl] = useState<string>('');
        const GetGooglePlaceDetail = async () => {
            const result = await axios.post('/api/google-place-detail', {
                placeName: trip?.tripDetail?.trip_plan?.destination,
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
        <Link key={index} className='p-4 border rounded-xl shadow-md flex flex-col gap-2 ' href={`/view-trips/${trip?.tripId}`}>
            <Image src={photoUrl ? photoUrl : '/placeholder.png'} alt="" width={500} height={500} className='rounded-2xl w-full h-[250px] object-cover' />
            <h2 className='font-med text-sm flex gap-2 items-center'>{trip?.tripDetail?.trip_plan?.origin}<ArrowRight />{trip?.tripDetail?.trip_plan?.destination}</h2>
            <p className='text-sm text-gray-500'>
                {trip?.tripDetail?.trip_plan?.duration} Trip with {trip?.tripDetail?.trip_plan?.budget} Budget
            </p>

        </Link>
    )
}

export default MyTripCardItem
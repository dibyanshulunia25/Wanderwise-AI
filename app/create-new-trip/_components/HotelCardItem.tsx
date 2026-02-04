"use client"
import { Button } from '@/components/ui/button'
import { ExternalLink, Star, Wallet } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Hotel } from './ChatBox'
import axios from 'axios'

const HotelCardItem = ({ hotel }: { hotel: Hotel }) => {
    const [photoUrl, setPhotoUrl] = useState<string>('');
    const GetGooglePlaceDetail = async () => {
        const result = await axios.post('/api/google-place-detail', {
            placeName: hotel?.hotel_name,
        });
        if (result?.data.e) {
            return;
        }
        setPhotoUrl(result?.data);
    }

    useEffect(() => {
        if (hotel) {
            GetGooglePlaceDetail();
        }
    }, [hotel])

    return (
        <div className='h-full transition-all cursor-pointer border rounded-xl p-3 shadow-md flex flex-col gap-2 mb-6'>
            <Image src={photoUrl ? photoUrl : '/placeholder.png'} alt={hotel.hotel_name} width={400} height={200} className='rounded-xl h-[180px] w-full object-cover' />
            <h3 className="text-lg font-semibold">{hotel.hotel_name}</h3>
            <h2 className='text-gray-400 text-sm'>{hotel.hotel_address}</h2>
            <div className='flex flex-col justify-between items-start gap-2'>
                <h2 className='text-sm flex gap-1 text-green-400'><Wallet />{hotel.price_per_night}</h2>
                <h2 className='text-yellow-500 text-sm flex gap-1 items-center'><Star />{hotel.rating}</h2>
            </div>
            <Link href={`https://www.google.com/maps/search/?api=1&query=${hotel.hotel_name}`} target='_blank'>
                <Button className='mt-1 w-full' variant={"outline"} >View <ExternalLink /></Button>
            </Link>
        </div>
    )
}

export default HotelCardItem
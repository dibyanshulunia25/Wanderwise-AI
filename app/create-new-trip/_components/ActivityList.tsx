"use client"
import { Button } from '@/components/ui/button'
import { Clock10Icon, ExternalLink, Ticket } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Activity } from './ChatBox'
import { useEffect, useState } from 'react'
import axios from 'axios'

const ActivityList = ({ activity }: { activity: Activity }) => {
    const [photoUrl, setPhotoUrl] = useState<string>('');
    const GetGooglePlaceDetail = async () => {
        const result = await axios.post('/api/google-place-detail', {
            placeName: activity?.place_name + ":" + activity?.place_address,
        });
        if (result?.data.e) {
            return;
        }
        setPhotoUrl(result?.data);
    }

    useEffect(() => {
        if (activity) {
            GetGooglePlaceDetail();
        }
    }, [activity])
    return (
        <div className='h-full transition-all cursor-pointer border rounded-xl p-3 shadow-md flex flex-col gap-2'>
            <Image src={photoUrl ? photoUrl : '/placeholder.png'} alt={activity.place_name} width={400} height={200} className='rounded-xl h-[180px] w-full object-cover' />
            <h3 className="text-lg font-semibold">{activity.place_name}</h3>
            <h2 className='text-sm text-green-400 flex justify-start gap-2'><Ticket /> {activity.ticket_pricing}</h2>
            <h2 className='text-sm text-orange-400 flex justify-start gap-2'><Clock10Icon />{activity.best_time_to_visit}</h2>
            <Link href={`https://www.google.com/maps/search/?api=1&query=${activity.place_name}`} target='_blank'>
                <Button className='mt-1 w-full' variant={"outline"} >View <ExternalLink /></Button>
            </Link>
        </div>
    )
}

export default ActivityList
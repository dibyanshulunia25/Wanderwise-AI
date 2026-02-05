"use client"
import { Timeline } from '@/components/ui/timeline';
import HotelCardItem from './HotelCardItem';
import ActivityList from './ActivityList';
import { useTripDetail } from '@/app/provider';
import { TripInfo } from './ChatBox';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';


const Itinerary = () => {

    const { tripInfo, setTripInfo } = useTripDetail();

    const [tripData, setTripData] = useState<TripInfo | null>(null);


    useEffect(() => {
        if (tripInfo) {
            setTripData(tripInfo);
        }
    }, [tripInfo]);

    const data = tripData ? [
        {
            title: "Recommended Hotels",
            content: (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    {tripData?.hotels?.map((hotel, index) => (
                        <HotelCardItem hotel={hotel} key={index} />
                    ))}
                </div>
            ),
        },
        ...(tripData?.itinerary?.map((dayData) => ({
            title: `Day ${dayData?.day}`,
            content: (
                <div className='flex flex-col gap-2 mb-6'>
                    <h2 className='text-gray-400 text-md'><span className='text-primary'>Best Time:</span> {dayData?.best_time_to_visit_day}</h2>
                    <h3 className="text-lg font-semibold line-clamp-2">{dayData?.day_plan}</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        {dayData?.activities?.map((activity, index) => (
                            <ActivityList activity={activity} key={index} />
                        ))}
                    </div>
                </div>
            ),
        })) || [])
    ] : [];
    return (
        <div className="relative w-full overflow-y-auto h-[90vh] mt-4">
            {tripData ? <Timeline data={data} tripData={tripData} />
                :
                <div>
                    <Image src={'/travel.png'} alt="travel" width={800} height={700} className='w-full h-[80vh] object-cover blur-xs rounded-3xl'></Image>
                    <h2 className="text-2xl flex items-center gap-2 absolute bottom-10 ml-4 font-semibold text-primary"><ArrowLeft /> Trying to know you to generate a perfect itinerary only for you</h2>
                </div>
            }
        </div>
    );
}

export default Itinerary
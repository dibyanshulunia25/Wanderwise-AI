"use client"
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useConvex } from 'convex/react';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useUserDetail } from '../provider';
import { TripInfo } from '../create-new-trip/_components/ChatBox';
import MyTripCardItem from './_components/MyTripCardItem';

export type Trip = {
    tripId: any;
    tripDetail:
    {
        trip_plan: TripInfo;
    };
    uid: string;
}

const MyTrips = () => {

    const [myTrips, setMyTrips] = useState<Trip[]>([]);
    const { userDetail, setUserDetail } = useUserDetail();
    const { user } = useUser();

    const convex = useConvex();

    const GetUserTrips = async () => {
        if (!userDetail) {
            return;
        }
        const result = await convex.query(api.tripDetail.GetTripDetail, {
            uid: userDetail?._id,
        });
        console.log("Convex Result:", result);
        setMyTrips(result);
    }

    useEffect(() => {
        if (userDetail) {
            GetUserTrips();
        }
    }, [userDetail]);

    return (
        <div className='px-10 p-10 md:px-24 lg:px-48 text-secondary'>
            <h2 className='font-bold text-3xl capitalize flex items-center gap-2'>
                Hi <span className='text-primary'>{user?.firstName}</span>, here are your Trips
                <ArrowDown className='animate-bounce' />
            </h2>

            {myTrips?.length == 0 ? (
                <div className='mt-10 p-6 border rounded-2xl flex flex-col items-center justify-center gap-4'>
                    <h2 className='text-lg font-medium'>You have not created any trips yet.</h2>
                    <Link href="/create-new-trip">
                        <Button className='hover:cursor-pointer'>
                            Create New Trip
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
                    {myTrips.map((trip, index) => {
                        return (
                            <MyTripCardItem trip={trip} key={index} index={index} />
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default MyTrips
"use client";
import { TripInfo } from '@/app/create-new-trip/_components/ChatBox';
import Itinerary from '@/app/create-new-trip/_components/Itinerary';
import { Trip } from '@/app/my-trips/page';
import { useTripDetail, useUserDetail } from '@/app/provider';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ViewTrip = () => {
    const { tripid } = useParams();
    const { userDetail } = useUserDetail();
    const { tripInfo, setTripInfo } = useTripDetail();

    const convex = useConvex();
    const [tripData, setTripData] = useState<Trip>();

    const GetTripDetailById = async () => {
        const result = await convex.query(api.tripDetail.GetTripById, {
            uid: userDetail?._id,
            tripId: tripid + "",
        });

        if (result) {
            let tripDetails = result.tripDetail;

            // Handle JSON string
            if (typeof tripDetails === 'string') {
                try {
                    tripDetails = JSON.parse(tripDetails);
                } catch (e) {
                    console.error("Failed to parse trip details", e);
                }
            }

            // Normalize structure only if trip_plan exists, otherwise assume it's the plan
            const normalizedTripInfo = tripDetails?.trip_plan || tripDetails?.tripPlan || tripDetails;

            console.log("Convex Result:", result);
            console.log("Normalized Trip Info:", normalizedTripInfo);

            setTripData(result);
            setTripInfo(normalizedTripInfo);
        }
    }

    useEffect(() => {
        userDetail && GetTripDetailById();
    }, [userDetail]);


    return (
        <div className='mt-4 overflow-auto'>
            <Itinerary />
        </div>
    )
}

export default ViewTrip
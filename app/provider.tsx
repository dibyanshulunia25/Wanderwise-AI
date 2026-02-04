"use client";
import React, { useContext, useEffect, useState } from 'react'
import Header from './_components/Header';
import Footer from './_components/Footer';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';
import { TripContextType, TripDetailContext } from '@/context/TripDetailContext';

const Provider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const CreateUser = useMutation(api.user.CreateNewUser);
    const { user } = useUser();

    const [userDetail, setUserDetail] = useState<any>();
    const [tripInfo, setTripInfo] = useState<TripInfo | null>(null);

    const CreateNewUser = async () => {
        if (user) {
            //save new user if doent exist 
            const newUser = await CreateUser({
                email: user?.primaryEmailAddress?.emailAddress ?? '',
                imageUrl: user?.imageUrl,
                name: user?.fullName ?? '',
            })
            setUserDetail(newUser);
        }
    }

    useEffect(() => {
        user && CreateNewUser();
    }, [user]);


    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <TripDetailContext.Provider value={{ tripInfo, setTripInfo }}>
                <div className='m-4'>
                    <Header />
                    {children}
                    <Footer />
                </div>
            </TripDetailContext.Provider>
        </UserDetailContext.Provider>
    )
}

export default Provider

export const useUserDetail = () => { return useContext(UserDetailContext); }
export const useTripDetail = (): TripContextType | undefined => { return useContext(TripDetailContext); }
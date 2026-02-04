"use client";
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import EmptyBoxState from './EmptyBoxState';
import GroupSizeUi from './GroupSizeUi';
import BudgetUi from './BudgetUi';
import DaysUi from './DaysUi';
import FinalUi from './FinalUi';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useTripDetail, useUserDetail } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';

type Message = {
    role: string,
    content: string,
    ui?: string,
}

export type TripInfo = {
    budget: string,
    destination: string,
    duration: string,
    group_size: string,
    origin: string,
    hotels: Hotel[],
    itinerary: Itinerary[],
}

export type Hotel = {
    hotel_name: string,
    hotel_address: string,
    price_per_night: string,
    hotel_image_url: string,
    geo_coordinates: {
        latitude: number,
        longitude: number,
    },
    rating: number,
    description: string,
};

export type Activity = {
    best_time_to_visit: string,
    geo_coordinates: {
        latitude: number,
        longitude: number,
    },
    place_address: string,
    place_details: string,
    place_image_url: string,
    place_name: string,
    ticket_pricing: string,
    time_travel_each_location: string,
}

export type Itinerary = {
    day: number,
    day_plan: string,
    best_time_to_visit_day: string,
    activities: Activity[],

}

function ChatBox() {

    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [isFinal, setIsFinal] = useState(false);
    const [tripDetail, setTripDetail] = useState<TripInfo>();
    const { userDetail, setUserDetail } = useUserDetail();
    const { tripInfo, setTripInfo } = useTripDetail();

    const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail);

    const onSend = async () => {

        if (!userInput?.trim() && !isFinal) return;

        setLoading(true);
        setUserInput('');
        const newMsg: Message = {
            role: "user",
            content: userInput ?? "",
        }

        setMessages((prev: Message[]) => [...prev, newMsg]);

        const result = await axios.post("/api/aimodel", {
            messages: [...messages, newMsg],
            isFinal: isFinal,
        });


        !isFinal && setMessages((prev: Message[]) => [...prev, {
            role: "assistant",
            content: result?.data?.resp,
            ui: result?.data?.ui
        }]);

        if (isFinal) {
            const tripData = result?.data?.trip_plan || result?.data;
            setTripDetail(tripData);
            setTripInfo(tripData);
            const tripId = uuidv4();
            await SaveTripDetail({
                tripId: tripId,
                uid: userDetail?._id,
                tripDetail: tripData,
            });
            setMessages((prev: Message[]) => [...prev, {
                role: "assistant",
                content: "I've updated your trip plan based on your request.",
                ui: "Final"
            }]);
        }
        setLoading(false);
    }

    const RenderGenerativeUi = (ui: string) => {
        if (ui == "budget") {
            //budget ui component
            return <BudgetUi onSelectedOption={(v: string) => { setUserInput(v); onSend() }} />
        }
        else if (ui == "groupSize") {
            //groupSize ui component
            return <GroupSizeUi onSelectedOption={(v: string) => { setUserInput(v); onSend() }} />
        }
        else if (ui == "TripDuration") {
            //
            return <DaysUi onSelectedOption={(v: string) => { setUserInput(v); onSend() }} />
        }
        else if (ui == "Final") {
            //
            return <FinalUi viewTrip={() => { console.log() }}
                disable={!tripDetail}
            />
        }
        return null;
    }

    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.ui == "Final") {
            setIsFinal(true);
            // setUserInput("OK, Great");
        }
    }, [messages])

    useEffect(() => {
        if (isFinal && userInput) {
            onSend();
        }
    }, [isFinal])

    return (
        <div className='flex flex-col h-[80vh] bg-primary/10 rounded-2xl p-4'>
            {messages.length == 0 && <EmptyBoxState onSelectOption={(v: string) => { setUserInput(v); onSend() }} />}
            {/* Display messages */}
            <section className='flex-1 overflow-y-auto p-4'>
                {
                    messages.map((msg: Message, index) => (
                        msg.role == 'user' ?
                            <div key={index} className='flex justify-end mt-2'>
                                <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg' >
                                    <p>{msg.content}</p>
                                </div>
                            </div> :
                            <div key={index} className='flex justify-start mt-2'>
                                <div className='max-w-[70%] bg-gray-100 text-black px-4 py-2 rounded-lg' >
                                    {msg.content}
                                    {RenderGenerativeUi(msg.ui ?? "")}
                                </div>
                            </div>
                    ))
                }

                {
                    loading &&
                    <div className='max-w-[70%] bg-gray-100 text-black mt-2 px-4 py-2 rounded-lg flex items-center justify-center'>
                        <Loader2 className="animate-spin" />
                    </div>
                }

            </section>
            {/* Input box */}
            <section>
                <div>
                    <div className="border border-primary/40 rounded-2xl mt-4 p-4 shadow-lg relative">
                        <Textarea placeholder="Create a Trip of your dreams..." className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none" onChange={(e) => setUserInput(e.target.value)} value={userInput} />
                        <Button size={"icon"} className="absolute bottom-4 right-4" onClick={() => onSend()}  >
                            <Send className="w-12 h-12" />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ChatBox
"use client"
import { Timeline } from '@/components/ui/timeline';
import HotelCardItem from './HotelCardItem';
import ActivityList from './ActivityList';
import { useTripDetail } from '@/app/provider';
import { TripInfo } from './ChatBox';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

// const TRIP_DATA = {
//     budget: "Cheap",
//     destination: "Goa, India",
//     duration: "2 days",
//     group_size: "1",
//     hotels: [
//         {
//             description:
//                 "A clean and comfortable budget hotel offering basic amenities, located conveniently close to Candolim beach. Ideal for solo travelers.",
//             geo_coordinates: {
//                 latitude: 15.5186,
//                 longitude: 73.7661,
//             },
//             hotel_address:
//                 "Near Candolim Beach, Candolim, Bardez, Goa 403515",
//             hotel_image_url:
//                 "https://example.com/redfox_goa.jpg",
//             hotel_name: "Red Fox Hotel, Goa",
//             price_per_night:
//                 "Approximately $30 - $40 USD (varying with season)",
//             rating: 3.5,
//         },
//         {
//             description:
//                 "A well-rated hostel providing dorm beds and private rooms at a low cost. Great for meeting other travelers and close to popular North Goa sights.",
//             geo_coordinates: {
//                 latitude: 15.6027,
//                 longitude: 73.7441,
//             },
//             hotel_address:
//                 "400/9, Chapora Main Rd, Vagator, Goa 403519",
//             hotel_image_url:
//                 "https://example.com/hostellokal_goa.jpg",
//             hotel_name: "Hostel Lokal Goa",
//             price_per_night:
//                 "Approximately $10 - $20 USD (dorm bed)",
//             rating: 4,
//         },
//     ],
//     itinerary: [
//         {
//             activities: [
//                 {
//                     best_time_to_visit:
//                         "Morning (9 AM - 11 AM) for cooler weather and fewer crowds.",
//                     geo_coordinates: {
//                         latitude: 15.4921,
//                         longitude: 73.7719,
//                     },
//                     place_address:
//                         "Fort Aguada Rd, Candolim, Goa 403515",
//                     place_details:
//                         "A 17th-century Portuguese fort standing on Sinquerim Beach, overlooking the Arabian Sea. Offers panoramic views and historical insights.",
//                     place_image_url:
//                         "https://example.com/fort_aguada.jpg",
//                     place_name: "Fort Aguada",
//                     ticket_pricing:
//                         "Free entry (lighthouse entry fee if applicable, check locally)",
//                     time_travel_each_location: "2-3 hours",
//                 },
//                 {
//                     best_time_to_visit:
//                         "Late afternoon (3 PM - 5 PM) for pleasant weather.",
//                     geo_coordinates: {
//                         latitude: 15.5147,
//                         longitude: 73.7663,
//                     },
//                     place_address: "Candolim, Goa",
//                     place_details:
//                         "One of the longest beaches in Goa, known for its tranquil environment compared to its bustling neighbors. Good for a relaxed stroll and sunbathing.",
//                     place_image_url:
//                         "https://example.com/candolim_beach.jpg",
//                     place_name: "Candolim Beach",
//                     ticket_pricing: "Free",
//                     time_travel_each_location: "1-2 hours",
//                 },
//                 {
//                     best_time_to_visit:
//                         "Afternoon (4 PM - 6 PM) to enjoy the lively atmosphere.",
//                     geo_coordinates: {
//                         latitude: 15.5398,
//                         longitude: 73.7554,
//                     },
//                     place_address: "Calangute, Goa",
//                     place_details:
//                         "Known as the 'Queen of Beaches,' it's the largest and one of the most popular beaches in North Goa. Bustling with activities and shacks.",
//                     place_image_url:
//                         "https://example.com/calangute_beach.jpg",
//                     place_name: "Calangute Beach",
//                     ticket_pricing: "Free",
//                     time_travel_each_location: "1-2 hours",
//                 },
//                 {
//                     best_time_to_visit:
//                         "Late afternoon to sunset (5 PM - 7 PM).",
//                     geo_coordinates: {
//                         latitude: 15.5724,
//                         longitude: 73.7431,
//                     },
//                     place_address: "Anjuna, Goa",
//                     place_details:
//                         "Famous for its vibrant flea market (on Wednesdays) and stunning sunsets. Known for its rocky shoreline and laid-back vibe.",
//                     place_image_url:
//                         "https://example.com/anjana_beach.jpg",
//                     place_name: "Anjuna Beach",
//                     ticket_pricing:
//                         "Free (flea market entrance may apply on market days, check locally)",
//                     time_travel_each_location: "2-3 hours",
//                 },
//             ],
//             best_time_to_visit_day:
//                 "Morning for forts, afternoon for beaches, evening for sunset.",
//             day: 1,
//             day_plan:
//                 "Explore North Goa's famous beaches and historical forts. Start with the iconic Fort Aguada overlooking the Arabian Sea, then relax and sightsee at Candolim Beach and Calangute Beach. End the day with sunset views at Anjuna Beach.",
//         },
//         {
//             activities: [
//                 {
//                     best_time_to_visit:
//                         "Morning (9 AM - 11 AM) to avoid crowds and heat.",
//                     geo_coordinates: {
//                         latitude: 15.4988,
//                         longitude: 73.9114,
//                     },
//                     place_address:
//                         "Old Goa Road, Bainguinim, Goa 403402",
//                     place_details:
//                         "A UNESCO World Heritage Site, this iconic church holds the mortal remains of St. Francis Xavier. Famous for its Baroque architecture.",
//                     place_image_url:
//                         "https://example.com/basilica_bom_jesus.jpg",
//                     place_name: "Basilica of Bom Jesus",
//                     ticket_pricing: "Free entry",
//                     time_travel_each_location: "1-2 hours",
//                 },
//                 {
//                     best_time_to_visit: "Morning (10 AM - 12 PM).",
//                     geo_coordinates: {
//                         latitude: 15.5002,
//                         longitude: 73.9112,
//                     },
//                     place_address: "Velha Goa, Goa 403402",
//                     place_details:
//                         "One of the largest churches in Asia, dedicated to Catherine of Alexandria. Known for its grand Portuguese-Manueline architecture.",
//                     place_image_url:
//                         "https://example.com/se_cathedral.jpg",
//                     place_name: "Se Cathedral",
//                     ticket_pricing: "Free entry",
//                     time_travel_each_location: "1-2 hours",
//                 },
//                 {
//                     best_time_to_visit:
//                         "Late morning (11 AM - 1 PM).",
//                     geo_coordinates: {
//                         latitude: 15.5004,
//                         longitude: 73.9109,
//                     },
//                     place_address: "Velha Goa, Goa 403402",
//                     place_details:
//                         "A beautiful church and convent integrated into a museum, showcasing Portuguese religious art and artifacts.",
//                     place_image_url:
//                         "https://example.com/st_francis_assisi.jpg",
//                     place_name: "Church of St. Francis of Assisi",
//                     ticket_pricing:
//                         "Nominal entrance fee for the museum (check locally)",
//                     time_travel_each_location: "1-1.5 hours",
//                 },
//                 {
//                     best_time_to_visit: "Afternoon (2 PM - 5 PM).",
//                     geo_coordinates: {
//                         latitude: 15.4216,
//                         longitude: 74.0084,
//                     },
//                     place_address:
//                         "Ponda-Belgaum Highway, Curti, Ponda, Goa 403401",
//                     place_details:
//                         "Experience the aromas and wonders of various spices. Includes a guided tour, traditional Goan lunch, and elephant wash (optional at extra cost).",
//                     place_image_url:
//                         "https://example.com/sahakari_spice_farm.jpg",
//                     place_name: "Sahakari Spice Farm",
//                     ticket_pricing:
//                         "Approximately $5 - $15 USD (includes tour and lunch)",
//                     time_travel_each_location:
//                         "2-3 hours (including travel time to/from Old Goa)",
//                 },
//             ],
//             best_time_to_visit_day:
//                 "Morning for Old Goa sites, afternoon for spice plantation.",
//             day: 2,
//             day_plan:
//                 "Explore the cultural and historical side of Old Goa, visiting ancient churches and cathedrals that reflect its Portuguese heritage. Conclude the trip with a visit to a spice plantation for a unique sensory experience.",
//         },
//     ],
//     origin: "Mumbai, India",
// }

const Itinerary = () => {
    //@ts-ignore
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
        <div className="relative w-full overflow-y-auto h-[80vh]">
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
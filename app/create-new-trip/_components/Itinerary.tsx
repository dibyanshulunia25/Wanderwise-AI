import React from 'react'

const TRIP_DATA = {
    "destination": "Goa, India",
    "duration": "1 day",
    "origin": "Mumbai, India",
    "budget": "Cheap",
    "group_size": "1",
    "hotels": [
        {
            "hotel_name": "Goa doesn't require a hotel for a 1-day trip from Mumbai",
            "hotel_address": "N/A",
            "price_per_night": "N/A",
            "hotel_image_url": "N/A",
            "geo_coordinates": {
                "latitude": 15.2993,
                "longitude": 74.124
            },
            "rating": 0,
            "description": "For a 1-day trip to Goa from Mumbai, it's recommended to travel early morning and return late evening, eliminating the need for a hotel stay. This helps keep the budget low."
        }
    ],
    "itinerary": [
        {
            "day": 1,
            "day_plan": "Explore North Goa's iconic beaches and a historical fort, experiencing a mix of natural beauty and cultural heritage. Focus on efficiency due to limited time.",
            "best_time_to_visit_day": "Early morning to late evening to maximize sightseeing.",
            "activities": [
                {
                    "place_name": "Fort Aguada",
                    "place_details": "A 17th-century Portuguese fort standing on Sinquerim Beach, overlooking the Arabian Sea. Offers panoramic views and historical significance.",
                    "place_image_url": "https://example.com/fort_aguada.jpg",
                    "geo_coordinates": {
                        "latitude": 15.4921,
                        "longitude": 73.7745
                    },
                    "place_address": "Fort Aguada Rd, Candolim, Goa 403515",
                    "ticket_pricing": "Free entry",
                    "time_travel_each_location": "2-3 hours including travel from arrival point",
                    "best_time_to_visit": "Morning (9:00 AM - 11:00 AM) to avoid heat and crowds."
                },
                {
                    "place_name": "Calangute Beach",
                    "place_details": "Known as the 'Queen of Beaches', it is the largest beach in North Goa and a popular tourist destination for its vibrant atmosphere and water sports.",
                    "place_image_url": "https://example.com/calangute_beach.jpg",
                    "geo_coordinates": {
                        "latitude": 15.5463,
                        "longitude": 73.7547
                    },
                    "place_address": "Calangute, Goa 403516",
                    "ticket_pricing": "Free entry; water sports extra",
                    "time_travel_each_location": "2-3 hours including travel from Fort Aguada",
                    "best_time_to_visit": "Late morning to early afternoon (11:00 AM - 2:00 PM) for beach activities and lunch."
                },
                {
                    "place_name": "Baga Beach",
                    "place_details": "Adjacent to Calangute, Baga Beach is famous for its nightlife, shacks, and vibrant market. Offers a more lively experience with various food options.",
                    "place_image_url": "https://example.com/baga_beach.jpg",
                    "geo_coordinates": {
                        "latitude": 15.5654,
                        "longitude": 73.7533
                    },
                    "place_address": "Baga, Goa 403516",
                    "ticket_pricing": "Free entry; food and drinks extra",
                    "time_travel_each_location": "2-3 hours including travel from Calangute, before returning for departure.",
                    "best_time_to_visit": "Afternoon (2:00 PM - 5:00 PM) for relaxation, snacks, and experiencing the lively atmosphere before heading back."
                }
            ]
        }
    ]
}

const Itinerary = () => {
    return (
        <div>Itinerary</div>
    )
}

export default Itinerary
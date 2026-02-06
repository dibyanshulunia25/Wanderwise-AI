"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { TripInfo } from "./ChatBox";

interface MapViewProps {
    tripData: TripInfo;
}

type MarkerType = {
    type: string;
    name: string;
    address: string;
    details?: string;
    position: [number, number];
};

const MapView = ({ tripData }: MapViewProps) => {
    // Extract all coordinates from hotels
    const hotelMarkers: MarkerType[] = tripData?.hotels?.map((hotel) => ({
        type: "Hotel",
        name: hotel.hotel_name,
        address: hotel.hotel_address,
        position: [
            hotel.geo_coordinates.latitude,
            hotel.geo_coordinates.longitude,
        ] as [number, number],
    })) || [];

    // Extract all coordinates from itinerary activities
    const activityMarkers: MarkerType[] = tripData?.itinerary?.flatMap((day) =>
        day.activities.map((activity) => ({
            type: "Activity",
            name: activity.place_name,
            address: activity.place_address,
            details: activity.place_details,
            position: [
                activity.geo_coordinates.latitude,
                activity.geo_coordinates.longitude,
            ] as [number, number],
        }))
    ) || [];

    const allMarkers = [...hotelMarkers, ...activityMarkers];

    // Default center if no markers (should rarely happen for a generated trip)
    const centerPosition: [number, number] =
        allMarkers.length > 0 ? allMarkers[0].position : [0, 0];

    return (
        <div
            className="w-full rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20"
            style={{ height: "80vh" }}
        >
            <MapContainer
                center={centerPosition}
                zoom={12}
                scrollWheelZoom={true}
                className="w-full h-full"
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {allMarkers.map((marker, index) => (
                    <Marker key={index} position={marker.position}>
                        <Popup>
                            <div className="flex flex-col gap-1">
                                <span className="font-bold text-sm text-primary">
                                    {marker.type}: {marker.name}
                                </span>
                                <span className="text-xs text-gray-600">{marker.address}</span>
                                {marker.details && (
                                    <span className="text-xs text-gray-500 mt-1">{marker.details}</span>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapView;

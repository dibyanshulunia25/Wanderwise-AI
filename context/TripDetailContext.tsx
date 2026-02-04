import { TripInfo } from "@/app/create-new-trip/_components/ChatBox";
import { createContext } from "react";

export type TripContextType = {
    tripInfo: TripInfo | null;
    setTripInfo: React.Dispatch<React.SetStateAction<TripInfo | null>>;
}

export const TripDetailContext = createContext<TripContextType | undefined>(undefined);
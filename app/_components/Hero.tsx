"use client";
import { Button } from "@/components/ui/button"
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@clerk/nextjs"
import { ArrowDown, Globe2, Landmark, Plane, Send } from "lucide-react"
import { useRouter } from "next/navigation";
import { AiFillSchedule } from "react-icons/ai"
import { FaHotel, FaMoneyBill, FaPlaneUp, FaUserSecret } from "react-icons/fa6"


const suggestions = [
    {
        title: "Create New Trip",
        icon: <Globe2 className="text-blue-400 h-5 w-5" />
    },
    {
        title: "Inspire Me Where To Go",
        icon: <Plane className="text-green-500 h-5 w-5" />
    },
    {
        title: "Plan My Next Trip",
        icon: <Landmark className="text-orange-400 h-5 w-5" />
    },
    {
        title: "Discover Hidden Gems",
        icon: <FaUserSecret className="text-red-800 h-5 w-5" />
    },
    {
        title: "Find The Best Deals",
        icon: <FaMoneyBill className="text-green-400 h-5 w-5" />
    },
]

const Hero = () => {

    const {user} = useUser();
    const router = useRouter();

    const onSend = () => {
        if(!user){
            router.push("/sign-in");
            return;
        }
        //Navigate to create trip planner page
    }

    return (
        <div className="mt-24 flex items-center justify-center">
            {/* content */}
            <div className="text-center max-w-3xl w-full">
                <div className="flex flex-col items-center gap-1 justify-center">
                    <h1 className="text-secondary capitalize text-xl md:text-3xl lg:text-5xl font-bold">
                        Hey, I&apos;m your personal <span className="text-primary">Trip Planner</span>
                    </h1>

                    <p className="text-secondary opacity-70 mt-5 text-lg capitalize">
                        Tell me where you want to go and leave the rest to me: <span className="text-primary flex items-center justify-center gap-4 pt-2"><FaPlaneUp />flights | <FaHotel />hotels | <AiFillSchedule />itinerary</span>
                    </p>
                </div>
                {/* input box */}
                <div>
                    <div className="border border-primary/40 rounded-2xl mt-4 p-4 shadow-lg relative">
                        <Textarea placeholder="Create a Trip of your dreams..." className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none" />
                        <Button size={"icon"} className="absolute bottom-4 right-4" onClick={() => onSend()} >
                            <Send className="w-12 h-12" />
                        </Button>
                    </div>
                </div>
                {/* suggestion list */}
                <div className="flex flex-wrap flex-row items-center justify-center gap-4 mt-4 ">
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-center gap-2 border-2 border-primary/20 shadow-lg hover:cursor-pointer hover:bg-primary/40 rounded-full p-2">
                            {suggestion.icon}
                            <p className="text-secondary opacity-70 text-sm capitalize">{suggestion.title}</p>
                        </div>
                    ))}
                </div>
                {/* video section */}
                <div className="mt-4 ">
                    <h2 className="text-secondary text-md md:text-lg lg:text-xl p-4 capitalize cursor-pointer">Not sure where to start? <span className="text-primary font-semibold">Watch a quick video </span> <ArrowDown className="inline text-primary animate-bounce" /></h2>
                    <HeroVideoDialog
                        className="block dark:hidden"
                        animationStyle="from-left"
                        videoSrc="https://www.example.com/dummy-video"
                        thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
                        thumbnailAlt="Dummy Video Thumbnail"
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero

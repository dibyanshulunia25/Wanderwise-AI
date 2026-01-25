import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'


const menuOptions = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Pricing",
        path: "/pricing",
    },
    {
        name: "Contact Us",
        path: "/contact-us",
    },
]
const Header = () => {
    return (
        <div className='flex items-center justify-between'>
            {/* logo */}
            <div className='flex items-center gap-2 hover:cursor-pointer'>
                <Image src="/logo.svg" alt="Logo" width={30} height={30} className='transition-transform duration-700 ease-in-out hover:rotate-360' />
                <h2 className='font-bold text-xl text-secondary'>WanderWise AI</h2>
            </div>
            {/* menu options */}
            <div className='items-center gap-8 hidden md:flex text-secondary'>
                {menuOptions.map((option,index) => (
                    <Link key={index} href={option.path} className='hover:underline hover:text-primary'>
                        <h2 className='font-semibold hover:scale-110 transition-all'>{option.name}</h2>
                    </Link>
                ))}
            </div>
            {/* get started button */}
            <Button className='hover:cursor-pointer'>Get Started</Button>
        </div>
    )
}

export default Header
import { PricingTable } from '@clerk/nextjs'
import { ArrowDown } from 'lucide-react'
import React from 'react'

const page = () => {
    return (
        <div className='mt-20'>
            <h1 className='flex gap-2 items-center justify-center text-center text-3xl  font-bold text-secondary'> <ArrowDown className='animate-bounce'/> Pick Your Subscription Plan For <span className='text-primary'>Wanderwise AI</span> </h1>
            <p className='text-center text-lg text-secondary mb-4 font-semibold'>Your goto AI Travel Assistant</p>
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 1rem' }}>
                <PricingTable />
            </div>
        </div>
    )
}

export default page
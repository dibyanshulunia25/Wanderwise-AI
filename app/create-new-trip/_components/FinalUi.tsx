import { Button } from '@/components/ui/button'
import { Globe2 } from 'lucide-react'
import React from 'react'

const FinalUi = ({viewTrip,disable}:any) => {
  return (
    <div className='flex flex-col items-center justify-center mt-6 p-6 bg-white rounded-2xl'>
        <Globe2 className='text-primary text-4xl animate-bounce' />
        <h2 className='mt-3 text-lg font-semibold text-primary'>
            ✈️ Planning Your Dream Trip
        </h2>
        <p className='capitalize text-gray-500 text-sm text-center mt-1'>
            gathering best destinations, activities and stay options for you.
        </p>
        <Button disabled={disable} onClick={viewTrip} className='mt-4 w-full'>
            View Trip
        </Button>
    </div>
  )
}

export default FinalUi
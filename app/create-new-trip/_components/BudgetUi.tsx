import React from 'react'

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵',
        color: 'bg-green-100 text-green-600'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰',
        color: 'bg-yellow-100 text-yellow-600'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Don\'t worry about cost',
        icon: '💸',
        color: 'bg-purple-100 text-purple-600'
    },
]



const BudgetUi = ({onSelectedOption}:any) => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 mt-2 items-center justify-center'>
            {SelectBudgetOptions.map((item,index)=>(
                <div key={index} className='p-3 border rounded-2xl bg-white hover:border-primary cursor-pointer flex flex-col gap-2 items-center justify-center' onClick={()=>onSelectedOption(item.title + ":" + item.desc)}>
                    <div className={`text-3xl bg-gray-200 p-3 rounded-full ${item.color}`}>{item.icon}</div>
                    <h1 className='font-semibold text-lg mt-2'>{item.title}</h1>
                    <p className='text-sm text-gray-500 text-center'>{item.desc}</p>
                </div>
            ))}
        </div>
    )
}

export default BudgetUi
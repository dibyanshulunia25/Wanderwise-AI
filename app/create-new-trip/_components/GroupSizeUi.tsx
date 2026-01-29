export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveles in exploration',
        icon: '✈️',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two traveles in tandem',
        icon: '🥂',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏡',
        people: '3 to 5 People'

    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: '⛵',
        people: '5 to 10 People'

    },
]

export default function GroupSizeUi({onSelectedOption}:any) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 items-center mt-1">
            {SelectTravelesList.map((item, index) => (
                <div key={index} className="p-3 border rounded-2xl bg-white hover:border-primary cursor-pointer" onClick={() => onSelectedOption(item.title+":"+item.people)}>
                    <h1>{item.icon}</h1>
                    <h1>{item.title}</h1>
                </div>
            ))}
        </div>
    )
}

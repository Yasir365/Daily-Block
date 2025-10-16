import React from 'react'

const WatchSectionList = ({ list, text, heading }: { list?: string[], text: string, heading: string }) => {
    return (
        <div className='flex flex-col gap-6  '>
            <h3 className='text-2xl font-bold text-brand-yellow'>{heading}</h3>
            <span className='flex flex-col gap-2 h-full'>
                <p className='text-xl font-medium text-[#9CA3AF]'>{text}</p>
                {list && list.map((item, index) => (
                    <li
                        key={index}
                        className="flex gap-2 items-start  text-xl font-medium text-[#9CA3AF]"
                    >
                        <span className="inline-block w-1.5 h-1.5 bg-[#9CA3AF] rounded-full flex-shrink-0 mt-3"></span>
                        {item}
                    </li>))}
            </span>
        </div>
    )
}

export default WatchSectionList
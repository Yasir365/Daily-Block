import React from 'react'

type Props = {
    pageName: string,
    pageDescription: string,
    children?: React.ReactNode
}

export const TopHeader = ({ pageName, pageDescription, children }: Props) => {
    return (
        <div className='flex items-center justify-between'>
            <span className='flex flex-col gap-1'>
                <h1 className="font-inter font-bold text-[30px] leading-[36px] text-[#FFFFFF]   align-middle">
                    {pageName}
                </h1>
                <h2 className="font-inter font-normal text-base leading-6 text-[#94A3B8] capitalize align-middle"
                >
                    {pageDescription}
                </h2>
            </span>
            {children}
        </div>
    )
}
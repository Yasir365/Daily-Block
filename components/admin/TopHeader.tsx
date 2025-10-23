import React from 'react'

type Props = {
    pageName: string,
    pageDescription: string,
    children?: React.ReactNode
}

export const TopHeader = ({ pageName, pageDescription, children }: Props) => {
    return (
        <div className="
            flex flex-col sm:flex-row sm:items-center sm:justify-between 
            gap-4 sm:gap-0
        ">
            {/* Page Info */}
            <span className='flex flex-col gap-1'>
                <h1 className="font-inter font-bold text-[24px] sm:text-[30px] leading-[32px] sm:leading-[36px] text-[#FFFFFF]">
                    {pageName}
                </h1>
                <h2 className="font-inter font-normal text-[14px] sm:text-base leading-[20px] sm:leading-6 text-[#94A3B8] capitalize">
                    {pageDescription}
                </h2>
            </span>

            {/* Button or Other Children */}
            <div className="w-full sm:w-auto">
                {children}
            </div>
        </div>
    )
}

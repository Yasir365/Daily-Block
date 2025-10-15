"use client"
import Image from 'next/image'
import React from 'react'
import IconCircle from '../ui/IconCircle'

const Main = () => {
    return (
        <div className='flex flex-col gap-4  mt-2 md:mt-12  '>
            <div className='grid grid-cols-1 md:grid-cols-2  gap-4 items-center'>
                <div className='order-2 md:order-1 flex flex-col gap-8'>
                    <h1 className='text-4xl md:text-6xl font-bold'>
                        Decentralized Finance 101: <br /> Exploring the Power of<br />  Blockchain and AI.
                    </h1>
                    <span className='flex  flex-wrap gap-6 items-center'>
                        <h5 className='text-base md:text-lg leading-tight'>September 25, 2025</h5>
                        <span className='text-base md:text-lg leading-tight text-[#C5C5C5] border-l flex items-center border-[#FFFFFF]/60 pl-4 h-[30px]'>Public</span>
                        <span className="flex gap-2 border-l border-[#FFFFFF]/60 pl-4">

                            <IconCircle
                                src="/svg/coins/x.svg"
                                onClick={() => console.log("GitHub clicked")}
                                bgColor='#72747c'
                                circleSize={30}
                            />
                            <IconCircle
                                src="/svg/icons/reddit.svg"
                                onClick={() => console.log("GitHub clicked")}
                                bgColor='#72747c'
                                circleSize={30}
                            />
                            <IconCircle
                                src="/svg/icons/git.svg"
                                onClick={() => console.log("GitHub clicked")}
                                bgColor='#72747c'
                                circleSize={30}
                            />
                        </span>
                    </span>
                    <h3 className='text-xl md:text-3xl  text-gray-200 font-semibold '>
                        The ByBarter IDO allowlist is still open – don’t miss your chance to join! Apply here:  <a
                            href="https://polkastarter.com/projects/bybarter"
                            target="_blank"
                            className="text-blue-400 underline  break-words"
                        >
                            https://polkastarter.com/projects/bybarter
                        </a>
                    </h3>
                </div>
                <div className="order-1 md:order-2 flex justify-center">
                    <Image src="/svg/watchlist/eth.svg" alt="coin" width={826} height={417} />
                </div>
            </div >

        </div >
    )
}

export default Main
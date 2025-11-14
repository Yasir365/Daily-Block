"use client"
import React from 'react'
import DownloadDiv from './DownloadDiv'
import { useDownloads } from '@/hooks/useUsers';
const files = [
    {
        fileName: "whitepaper.pdf",
        fileUrl: "/files/whitepaper.pdf",
        openInNewTab: true,
    },
    {
        fileName: "prototype.docx",
        fileUrl: "/files/prototype.docx",
        openInNewTab: true,
    },
    {
        fileName: "tokenomics.xlsx",
        fileUrl: "/files/tokenomics.xlsx",
        openInNewTab: false,
    },
    {
        fileName: "presentation.pptx",
        fileUrl: "/files/presentation.pptx",
        openInNewTab: true,
    },
];
const Download = () => {
    const { data = [], isLoading, refetch } = useDownloads();
    console.log(data);
    console.log({ data })
    return (
        <div className='flex flex-col gap-2 w-full'>
            <h1 className='text-3xl font-bold text-brand-muted'>User Downloads</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {files.map((file, index) => (
                    <DownloadDiv
                        key={index}
                        fileName={file.fileName}
                        fileUrl={file.fileUrl}
                        openInNewTab={file.openInNewTab}
                    />
                ))}
            </div>
        </div>
    )
}

export default Download
"use client"
import React from 'react'
import CoinViewLeft from './CoinViewLeft'
import CoinViewContent from './CoinViewMiddle'
import CoinViewRight from './CoinViewRight'
import { Newsletter } from '../news-letter/NewsLetter'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

export interface CoinData {
    _id: string;
    cryptoCoinName?: string;
    coinAbbreviation?: string;
    icoIcon?: string;
    icoImages?: string[];
    additionalDetails?: string;
    sentiment?: any;
    posts?: any[];

    [key: string]: any;
}

const fetchCoin = async (coinId: string) => {
    const res = await fetch(`/api/ico/${coinId}`)
    const data = await res.json()
    if (!res.ok || !data.success) throw new Error(data.error || "Failed to fetch ICO data")
    return data.data
}

const fetchSentiment = async (coinId: string) => {
    const res = await fetch(`/api/community/${coinId}/sentiment`)
    const data = await res.json()
    if (!res.ok) throw new Error("Failed to fetch sentiment")
    return data
}

const fetchPosts = async (coinId: string) => {
    const res = await fetch(`/api/community/${coinId}/posts?sort=latest`)
    const data = await res.json()
    if (!res.ok) throw new Error("Failed to fetch posts")
    return data || []
}

const CoinView = () => {
    const searchParams = useSearchParams();
    const coinId = searchParams.get("coin");

    // Fetch ICO Data
    const {
        data: coinData,
        isLoading: coinLoading,
        isError: coinError,
        error: coinErr,
    } = useQuery<CoinData, Error>({
        queryKey: ["coin", coinId],
        queryFn: () => fetchCoin(coinId!),
        enabled: !!coinId,
    })

    // Fetch Sentiment Data
    const {
        data: sentimentData,
        isLoading: sentimentLoading,
        isError: sentimentError,
        error: sentimentErr,
    } = useQuery({
        queryKey: ["sentiment", coinId],
        queryFn: () => fetchSentiment(coinId!),
        enabled: !!coinId,
    })

    // Fetch Posts Data
    const {
        data: postsData,
        isLoading: postsLoading,
        isError: postsError,
        error: postsErr,
    } = useQuery({
        queryKey: ["posts", coinId],
        queryFn: () => fetchPosts(coinId!),
        enabled: !!coinId,
    })

    const loading = coinLoading || sentimentLoading || postsLoading
    const error = coinError || sentimentError || postsError

    if (loading) return <div className="text-center mt-10">Loading...</div>
    if (error) return <div className="text-center mt-10 text-red-500">{(coinErr || sentimentErr || postsErr)?.message}</div>
    if (!coinData) return <div className="text-center mt-10">Coin not found</div>

    // Merge all data
    const coin: CoinData = {
        ...coinData,
        sentiment: sentimentData,
        posts: postsData,
    }

    return (
        <div>
            <div className="min-h-screen container grid grid-cols-1 md:grid-cols-7 p-12 mx-auto gap-4">
                <CoinViewLeft />
                <CoinViewContent coin={coin} />
                <CoinViewRight coin={coin} queryKey={["posts", coinId as string]} />
            </div>
            <Newsletter />
        </div>
    )
}

export default CoinView

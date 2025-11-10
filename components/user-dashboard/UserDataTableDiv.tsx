"use client"
import { ArrowUpDown } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { cointStatus, ProjectRow } from '../ProjectCard/ProjectRow';
import Link from 'next/link';
import { useIcoProjects } from '@/hooks/useIcoProjects';

const columns = [
  { key: "symbol", label: "Symbol", span: 1 },
  { key: "project", label: "Project", span: 1 },
  { key: "start", label: "Start", span: 1 },
  { key: "end", label: "End", span: 1 },
  { key: "supply", label: "Total Supply", span: 2 },
  { key: "price", label: "Price", span: 2 },
  { key: "totalRaised", label: "Total Raised", span: 2 },
  { key: "launchpad", label: "Launchpad", span: 1 },

];

interface Props {
  title: string;
  status: cointStatus;
}
const UserDataTableDiv = ({ title, status }: Props) => {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const { data: projects = [], isLoading, isError, error } = useIcoProjects(status);


  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h5 className="text-[22px] font-bold">{title}</h5>
        <span className="flex items-center gap-1 text-[#F9A51A] cursor-pointer hover:text-[#F9A51A]/80">
          <Link href="/user/add-coin" className="font-bold flex items-center gap-1.5">
            <Image
              src="/svg/coins/coin.svg"
              alt="coin"
              width={20}
              height={20}
              className="rounded-full invert-[74%] sepia-[78%] saturate-[1918%] hue-rotate-[357deg] brightness-[101%] contrast-[104%]"
            />


            Add New Coin
          </Link>
        </span>
      </div>

      <div className="bg-brand-glass p-6 md:p-8 rounded-2xl shadow-xl">
        {/* --- Table Header --- */}
        <div className="grid grid-cols-12 gap-x-4 items-center p-4 border-b-2 border-gray-700 text-gray-300 font-semibold text-xs uppercase select-none">
          {columns.map((col) => (
            <div
              key={col.key}
              className={`flex items-center gap-1 cursor-pointer group text-left ${col.span === 1 ? "col-span-1" :
                col.span === 2 ? "col-span-2" :
                  col.span === 3 ? "col-span-3" :
                    "col-span-1"
                }`}
              onClick={() => handleSort(col.key)}
            >

              <span className="group-hover:text-white transition">{col.label}</span>
              <ArrowUpDown
                size={14}
                className={`transition ${sortConfig.key === col.key
                  ? "text-blue-400"
                  : "text-gray-600 group-hover:text-gray-400"
                  }`}
              />
            </div>
          ))}
        </div>

        {/* --- Table Rows --- */}
        <div className="divide-y divide-gray-700/50">
          {isLoading ? (
            <p className="text-center text-gray-400 p-4">Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-center text-gray-400 p-4">No ICO projects found.</p>
          ) : (
            projects.map((p, i) => (
              <ProjectRow
                key={i}
                symbol={p.coinAbbreviation || "-------"}
                project={p.cryptoCoinName || "-------"}
                startdate={p.icoStartDate || "------"}
                enddate={p.icoEndDate || "-------"}
                totalsupply={p.totalSupply || "-------"}
                price={p.icoTokenPrice || "-------"}
                fundRaised={p.received ? `$${p.received}` : "$0"}
                launchpad={p.websiteLink || "------"}
                status={p.status || status} // 👈 pass status from API or parent

              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDataTableDiv;

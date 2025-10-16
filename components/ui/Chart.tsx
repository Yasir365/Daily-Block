"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import ChartTooltip from "./ChartToolTip";

// 👇 Import dynamically to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CumulativeFlowChart: React.FC = () => {
    const series = [
        {
            name: "Cumulative Flow",
            data: [
                { x: "12-Jan-2024", y: 0 },
                { x: "02-Feb-2024", y: 5 },
                { x: "18-Mar-2024", y: 12 },
                { x: "01-Apr-2024", y: 8 },
                { x: "20-May-2024", y: 15 },
                { x: "10-Jun-2024", y: 9 },
                { x: "26-Aug-2024", y: 18.07 },
                { x: "15-Sep-2024", y: 13 },
                { x: "05-Nov-2024", y: 22 },
                { x: "20-Dec-2024", y: 16 },
                { x: "07-Feb-2025", y: 40.25 },
                { x: "01-Mar-2025", y: 28 },
                { x: "16-Apr-2025", y: 34.76 },
                { x: "01-May-2025", y: 25 },
                { x: "19-Aug-2025", y: 45 },
                { x: "30-Sep-2025", y: 37 },
                { x: "15-Oct-2025", y: 48 },
            ],
        },
    ];


    const options: ApexOptions = {
        chart: {
            type: "area",
            background: "#000000",
            foreColor: "#cccccc",
            toolbar: { show: false },
            zoom: { enabled: false },
        },
        colors: ["#007BFF"],
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "vertical",
                shadeIntensity: 0.4,
                gradientToColors: ["#007BFF"],
                opacityFrom: 0.8,
                opacityTo: 0.2,
            },
        },
        stroke: {
            curve: "straight",
            width: 3,
            colors: ["#00aaff"],
        },
        markers: {
            size: 6,
            colors: ["#000"],
            strokeColors: "#00aaff",
            strokeWidth: 3,
            hover: { size: 9 },
        },
        grid: {
            borderColor: "rgba(255,255,255,0.1)",
            strokeDashArray: 4,
        },
        xaxis: {
            labels: {
                style: { colors: "#aaa" },
            },
            axisTicks: { show: false },
            axisBorder: { show: false },
        },
        yaxis: {
            labels: {
                style: { colors: "#aaa" },
                formatter: (val) => `$${val}B`,
            },
        },
        tooltip: {
            enabled: true,
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                const date = point.x;
                const value = point.y;
                return `
          <div id="chart-tooltip" style="pointer-events:none">
            ${(
                        // Render the component to string since Apex expects HTML
                        require("react-dom/server").renderToString(
                            <ChartTooltip date={date} value={value} />
                        )
                    )}
          </div>
        `;
            },
        },
        annotations: {
            points: [
                {
                    x: "18-Mar-2024",
                    y: 12,
                    marker: { size: 6, fillColor: "#fff", strokeColor: "#00aaff" },
                    label: {
                        text: "3/18/2024\n$12.00 Bln",
                        borderColor: "#fff",
                        style: {
                            background: "#111",
                            color: "#fff",
                            fontSize: "12px",
                            padding: { left: 8, right: 8, top: 4, bottom: 4 },
                        },
                    },
                },
                {
                    x: "26-Aug-2024",
                    y: 18.07,
                    label: {
                        text: "8/26/2024\n$18.07 Bln",
                        borderColor: "#fff",
                        style: { background: "#111", color: "#fff", fontSize: "12px" },
                    },
                },
                {
                    x: "07-Feb-2025",
                    y: 40.25,
                    label: {
                        text: "2/7/2025\n$40.25 Bln",
                        borderColor: "#fff",
                        style: { background: "#111", color: "#fff", fontSize: "12px" },
                    },
                },
                {
                    x: "16-Apr-2025",
                    y: 34.76,
                    label: {
                        text: "4/16/2025\n$34.76 Bln",
                        borderColor: "#fff",
                        style: { background: "#111", color: "#fff", fontSize: "12px" },
                    },
                },
            ],
        },
    };

    return (
        <div className="w-full h-[500px] bg-black rounded-2xl p-4">
            <ReactApexChart options={options} series={series} type="area" height="100%" />
        </div>
    );
};

export default CumulativeFlowChart;

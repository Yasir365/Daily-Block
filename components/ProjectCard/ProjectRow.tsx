import Link from 'next/link';
import CircularProgress from '../ui/CircularProgressBar';
import Image from 'next/image';
export type cointStatus = "verified" | "pending" | "rejected" | "approved" | ""
export interface ProjectRowProps {
  symbol: string;
  project: string;
  startdate: string;
  enddate: string;
  totalsupply: string;
  price: string;
  launchpad: string;
  fundRaised: string;
  status?: cointStatus;
}

export const ProjectRow = ({
  symbol,
  project,
  startdate,
  enddate,
  totalsupply,
  price,
  fundRaised,
  launchpad,
  status,
}: ProjectRowProps) => {
  const statusClasses =
    status === "verified" || status === "approved"
      ? "bg-green-500 hover:bg-green-600 text-white"
      : status === "pending"
        ? "bg-yellow-500 hover:bg-yellow-600 text-black"
        : "bg-red-500 hover:bg-red-600 text-white";


  return (
    <div className="grid grid-cols-12 items-center p-4 bg-brand-glass/70 rounded-lg mb-2 text-left">
      <div className="col-span-1 text-white font-lato font-semibold">{symbol}</div>
      <div className="col-span-1 text-white font-lato font-semibold truncate">{project}</div>
      <div className="col-span-1 text-white font-lato">{startdate}</div>
      <div className="col-span-1 text-white font-lato">{enddate}</div>
      <div className="col-span-2 text-white font-lato truncate">{totalsupply}</div>
      <div className="col-span-2 text-white font-lato">{price}</div>

      <div className="col-span-2 flex items-center text-white gap-4">
        <span className="flex items-center">
          <CircularProgress value={30} size={45} strokeWidth={6} />
        </span>
        <span className="font-lato font-semibold">{fundRaised}</span>
      </div>

      <div className="col-span-1">
        <Link
          href={"#"}
          className={`${statusClasses} py-2 px-3 rounded-md text-sm font-bold transition`}
        >
          {status}
        </Link>
      </div>
    </div>
  );
};

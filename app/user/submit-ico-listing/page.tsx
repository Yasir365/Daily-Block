import MultiStepForm from "@/components/form/ListingForm";

export default function Page() {
    return (
        <div className="flex flex-col gap-4">
            <div className=" flex flex-col gap-2">
                <h1 className="text-[28px] font-bold font-[var(--font-lato)]">
                    LIST YOUR ICO / Memecoin FOR FREE!</h1>
                <p className="text-[18px]">🚀 Launching a altcoin with an Initial Coin Offering? Boost it with DailyBlock Crypto Marketing! Discover why DailyBlock is your best choice for crypto marketing.</p>
            </div>
            <MultiStepForm />
        </div>
    );
}
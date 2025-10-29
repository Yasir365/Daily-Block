import UserDataTableDiv from "@/components/user-dashboard/UserDataTableDiv";

export default function Page() {
    return (
        <div >
            <UserDataTableDiv title={"Rejected ICO Listings"} status="rejected" />
        </div>
    );
}
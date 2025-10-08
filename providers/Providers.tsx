"use client";

import { HotToastr } from "./HotToastr";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <HotToastr />
        </>
    );
}

"use client";

import { Toaster } from "react-hot-toast";

export function HotToastr() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                style: {
                    background: "#114b45",
                    color: "#fff",
                    borderRadius: "10px",
                    padding: "12px 16px",
                },
                success: {
                    iconTheme: {
                        primary: "#30fa15ff",
                        secondary: "#1f1f1f",
                    },
                },
                error: {
                    style: {
                        background: "#b91c1c",
                        color: "#fff",
                    },
                },
            }}
        />
    );
}

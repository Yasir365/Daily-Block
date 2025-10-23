// utils/notification.tsx
import { notification } from "antd";
import type { NotificationArgsProps } from "antd";

export const showCustomNotification = (options: NotificationArgsProps) => {
    notification.open({
        ...options,
        style: {
            width: 388,
            height: 132,
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #364349",    
            background: "linear-gradient(160.73deg, #121212 0%, #141B1F 100%)",
            boxShadow: "0px 1px 2px 0px #0000000D",
            backdropFilter: "blur(4px)",
            color: "#94A3B8",
            display: "flex",
            alignItems: "center",
            gap: "16px",
        },
        className: "custom-notification",
        duration: 4,
    });
};

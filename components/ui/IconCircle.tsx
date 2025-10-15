import Image from "next/image";

interface IconCircleProps {
    src: string;
    alt?: string;
    size?: number; // icon size (default 20)
    bgColor?: string; // background color
    circleSize?: number; // circle diameter (default 40)
    onClick?: () => void; // click handler
}

const IconCircle = ({
    src,
    alt = "icon",
    size = 20,
    bgColor = "#1A1A1A",
    circleSize = 40,
    onClick,
}: IconCircleProps) => {
    return (
        <span
            onClick={onClick}
            className={`flex items-center justify-center rounded-full transition-all duration-200 ${onClick ? "cursor-pointer hover:opacity-80 hover:scale-105" : ""
                }`}
            style={{
                backgroundColor: bgColor,
                height: `${circleSize}px`,
                width: `${circleSize}px`,
            }}
        >
            <Image
                src={src}
                alt={alt}
                width={size}
                height={size}
                className="object-contain"
            />
        </span>
    );
};

export default IconCircle;

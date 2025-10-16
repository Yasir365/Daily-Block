"use client";

import React, { useState } from "react";
import { Switch } from "antd";

interface SwitchGroupProps {
    options: string[];
    defaultActive?: string[]; // pre-checked switches
    onChange?: (activeSwitches: string[]) => void;
}

const SwitchGroup: React.FC<SwitchGroupProps> = ({
    options,
    defaultActive = [],
    onChange,
}) => {
    const [active, setActive] = useState<string[]>(defaultActive);

    const handleToggle = (label: string, checked: boolean) => {
        const updated = checked
            ? [...active, label]
            : active.filter((item) => item !== label);
        setActive(updated);
        onChange?.(updated);
    };

    return (
        <div className="flex ml-6 items-center gap-10">
            {options.map((label) => (
                <div key={label} className="flex items-center gap-3">
                    <h5 className="text-sm text-white">{label}</h5>
                    <Switch
                        checked={active.includes(label)}
                        onChange={(checked) => handleToggle(label, checked)}
                    />
                </div>
            ))}
        </div>
    );
};

export default SwitchGroup;

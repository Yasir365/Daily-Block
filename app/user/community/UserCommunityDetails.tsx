"use client";
import Image from "next/image";
import { useState } from "react";
import { Pencil } from "lucide-react";

export default function UserCommunityDetails({ community }: { community: any }) {
    console.log({ community })
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(community?.name || "");
    const [newImage, setNewImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>(community?.image || "");
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append("name", newName);
        if (newImage) formData.append("image", newImage);
        formData.append("_id", community._id);

        const res = await fetch(`/api/community/coins`, {
            method: "PUT",
            body: formData,
        });

        if (res.ok) {
            alert("Community updated successfully!");
            setIsEditing(false);
        } else {
            alert("Failed to update community!");
        }
    };

    return (
        <div className="bg-brand-glass p-6 md:p-8 rounded-2xl shadow-xl text-white space-y-8 w-full">
            {/* --- Header --- */}
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-28 h-28 flex items-center justify-center">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border border-gray-600">
                        <Image
                            src={preview || "/placeholder.png"}
                            alt="Community Image"
                            fill
                            className="object-cover"
                        />
                    </div>
                    {isEditing && (
                        <label className="absolute bottom-1 right-1 flex items-center justify-center bg-brand-yellow p-1.5 rounded-full cursor-pointer hover:bg-yellow-400 transition">
                            <Pencil size={16} className="text-black" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>


                <div className="flex flex-col gap-2 text-center md:text-left">
                    {isEditing ? (
                        <input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="bg-transparent border-b border-gray-500 text-lg outline-none focus:border-brand-yellow text-center md:text-left"
                        />
                    ) : (
                        <h2 className="text-2xl font-bold">{community.name}</h2>
                    )}
                    <button
                        onClick={() => (isEditing ? handleUpdate() : setIsEditing(true))}
                        className="bg-brand-yellow text-black px-4 py-1 rounded-lg font-semibold hover:bg-yellow-400 transition w-fit mx-auto md:mx-0"
                    >
                        {isEditing ? "Save Changes" : "Edit Community"}
                    </button>
                </div>
            </div>

            {/* --- ICO Projects Table --- */}
            <div>
                <h3 className="text-xl font-bold mb-4">ICO Projects</h3>
                <div className="bg-brand-black/60 p-4 rounded-2xl">
                    <div className="grid grid-cols-4 gap-x-4 items-center border-b border-gray-700 pb-3 mb-3 text-gray-400 font-semibold uppercase text-xs">
                        <div className="col-span-1">Icon</div>
                        <div className="col-span-3">Crypto Coin Name</div>
                    </div>

                    <div className="divide-y divide-gray-700">
                        {community.icoProjects && community.icoProjects.length > 0 ? (
                            community.icoProjects.map((p: any, i: number) => (
                                <div
                                    key={i}
                                    className="grid grid-cols-4 items-center py-3 hover:bg-brand-glass/30 transition rounded-lg"
                                >
                                    <div className="col-span-1">
                                        <Image
                                            src={p.icoIcon || "/placeholder.png"}
                                            alt={p.cryptoCoinName}
                                            width={40}
                                            height={40}
                                            className="w-10 h-10 rounded-full object-cover border border-gray-600"
                                        />
                                    </div>
                                    <div className="col-span-3 text-white font-medium truncate">
                                        {p.cryptoCoinName}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 text-center py-4">
                                No ICO projects found.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

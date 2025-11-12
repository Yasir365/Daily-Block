import React, { useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";

interface Props {
    control: Control<any>; // the RHF control
    name: string;
}

const MultiImageUpload = ({ control, name }: Props) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={[] as File[]} // ✅ explicitly typed
            render={({ field }) => {
                const [images, setImages] = useState<File[]>(field.value || []);

                // Keep RHF field in sync with images
                useEffect(() => {
                    field.onChange(images);
                }, [images]);

                const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (!e.target.files) return;
                    const selectedFiles = Array.from(e.target.files);
                    setImages((prev) => [...prev, ...selectedFiles]);
                };

                const handleRemoveImage = (index: number) => {
                    setImages((prev) => prev.filter((_, i) => i !== index));
                };

                return (
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-sm">ICO Images</label>

                        {/* Upload Box */}
                        <div className="bg-brand-glass flex items-center justify-end p-2 rounded-xl gap-3">
                            <input
                                type="file"
                                id={name}
                                placeholder="Select ICO images"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <label
                                htmlFor={name}
                                className="bg-brand-yellow text-black font-semibold px-4 py-2 rounded-md cursor-pointer"
                            >
                                Add or Upload Images
                            </label>
                        </div>

                        {/* Preview Grid */}
                        {images.length > 0 && (
                            <div className="grid grid-cols-4 gap-2 mt-2">
                                {images.map((img, index) => (
                                    <div
                                        key={index}
                                        className="relative w-full h-24 bg-gray-800 rounded-lg overflow-hidden"
                                    >
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt={`preview-${index}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                            onClick={() => handleRemoveImage(index)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            }}
        />
    );
};

export default MultiImageUpload;

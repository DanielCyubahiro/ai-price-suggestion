"use client";
import { FormLabel } from "@/components/ui/form";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

interface PhotoUploadProps {
  name: string;
  label: string;
}

export default function PhotoUpload({
  name,
  label
}: PhotoUploadProps) {
  const { setValue, watch, formState: { errors } } = useFormContext();
  const watchedFiles = watch(name);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const error = name.split(".").reduce((o, i) => o?.[i], errors as any);

  useEffect(() => {
    const files = watchedFiles;
    let currentPreviewUrl: string | null = null;

    if (files && files.length > 0) {
      const file = files[0];
      if (file instanceof File) {
        currentPreviewUrl = URL.createObjectURL(file);
        setPhotoPreview(currentPreviewUrl);
      } else {
        setPhotoPreview(null);
      }
    } else {
      setPhotoPreview(null);
    }
    return () => {
      if (currentPreviewUrl) {
        URL.revokeObjectURL(currentPreviewUrl);
      }
    };
  }, [watchedFiles]);

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setValue(name, files && files.length > 0 ? files : null,
      { shouldValidate: true });
  };

  const removePhoto = () => {
    setValue(name, null, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div key={name}
         className="flex flex-col items-center space-y-2">
      <FormLabel className="text-center">
        {label}
      </FormLabel>
      <div
        className="relative w-48 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-black transition-colors"
        onClick={triggerFileInput}
      >
        {photoPreview ? (
          <img
            src={photoPreview}
            alt={label}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <p className="text-gray-400 text-sm mt-1">Upload Photo</p>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handlePhotoUpload}
          className="hidden"
        />
        {photoPreview && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="absolute top-1 right-1 opacity-70 p-1 h-auto"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering file input
              removePhoto();
            }}
          >
            <Trash2 />
          </Button>
        )}
      </div>
      {error && (
        <p className="text-sm font-medium text-destructive">
          {error.message}
        </p>
      )}
    </div>
  );
}
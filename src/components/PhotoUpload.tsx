import React, { useState, useCallback } from "react";
import { Upload, X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoUploadProps {
  onPhotoSelect: (file: File) => void;
  selectedPhoto: File | null;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  onPhotoSelect,
  selectedPhoto,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      onPhotoSelect(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const clearPhoto = () => {
    setPreview(null);
    onPhotoSelect(null as any);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {preview ? (
        <div className="relative bg-white rounded-2xl p-4 shadow-lg">
          <img
            src={preview}
            alt="Загруженное фото"
            className="w-full h-64 object-cover rounded-xl"
          />
          <Button
            onClick={clearPhoto}
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
          <p className="text-sm text-gray-600 mt-3 text-center">
            Фото загружено! Готово для создания историй ✨
          </p>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
            dragActive
              ? "border-primary bg-purple-50 scale-105"
              : "border-gray-300 hover:border-primary hover:bg-gray-50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Camera className="h-8 w-8 text-primary" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Загрузите фото ребенка
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Перетащите изображение или нажмите для выбора
              </p>
            </div>

            <Button className="bg-primary hover:bg-primary/90">
              <Upload className="mr-2 h-4 w-4" />
              Выбрать фото
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;

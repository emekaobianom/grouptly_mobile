import { useState } from "react";
import { uploadData } from "aws-amplify/storage";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";

export const useImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const selectImage = async () => {
    try {
      let selectedFile: File;

      if (Capacitor.isNativePlatform()) {
        const photo = await Camera.getPhoto({
          source: CameraSource.Prompt,
          resultType: CameraResultType.Uri,
          quality: 80,
        });

        const response = await fetch(photo.webPath!);
        const blob = await response.blob();
        selectedFile = new File([blob], "photo.jpg", { type: "image/jpeg" });
      } else {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (event: Event) => {
          const target = event.target as HTMLInputElement;
          if (target.files && target.files.length > 0) {
            handleImage(target.files[0]);
          }
        };
        input.click();
        return;
      }

      handleImage(selectedFile);
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  const handleImage = async (file: File) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const maxSize = 1024;
      let width = image.width;
      let height = image.height;

      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height *= maxSize / width;
          width = maxSize;
        } else {
          width *= maxSize / height;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(image, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) {
          const optimizedFile = new File([blob], file.name, { type: "image/jpeg" });
          setFile(optimizedFile);
          setPreview(URL.createObjectURL(optimizedFile));
        }
      }, "image/jpeg", 0.8);
    };
  };

  const uploadImage = async (customPath?: string): Promise<string | null> => {
    if (!file) {
      console.error("No file selected!");
      return null;
    }

    try {
      const path = customPath || `public/profile-pictures/${Date.now()}-${file.name}`;
      const result = await uploadData({
        path,
        data: file,
        options: { contentType: "image/jpeg" },
        
      }).result;

      console.log("🚀 Upload result:", result);

      // Construct the direct S3 URL
      const bucketName = "amplify-d3v0vo7pzfe19p-ma-grouptlystoragebucket011-rll6dfjwfmo5"; // Replace with your bucket name
      const region = "us-east-1"; // Replace with your region
      const publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${path}`; 
      // 
      setUploadedUrl(publicUrl);      
      console.log("✅ Upload successful!", result);
      return publicUrl;

    } catch (error) {
      console.error("❌ Error uploading file:", error);
      return null;
    }
  };

  return { file, preview, uploadedUrl, selectImage, uploadImage, setFile };
};
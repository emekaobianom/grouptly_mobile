import { useState, useEffect } from "react";
import { uploadData } from "aws-amplify/storage";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";

// Hook for managing image selection, optimization, and upload
export const useImageUpload = (initialUrl?: string) => {
  // State for the selected file (before upload)
  const [file, setFile] = useState<File | null>(null);
  // State for the image preview URL (blob URL or existing URL)
  const [preview, setPreview] = useState<string | null>(initialUrl || null);
  // State for the final uploaded URL (after S3 upload)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  // State to track loading status of operations
  const [loading, setLoading] = useState(false);
  // State to store any errors during operations
  const [error, setError] = useState<string | null>(null);

  // Cleanup effect to revoke blob URLs and prevent memory leaks
  useEffect(() => {
    // Cleanup function runs when preview changes or component unmounts
    return () => {
      // Only revoke if preview is a blob URL (not an S3 URL)
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]); // Dependency on preview ensures cleanup on change

  // Function to select an image from camera or file input
  const selectImage = async () => {
    setLoading(true); // Indicate operation is in progress
    setError(null);   // Clear any previous errors
    try {
      let selectedFile: File; // Variable to hold the selected file

      // Handle native platforms (mobile apps) using Capacitor Camera
      if (Capacitor.isNativePlatform()) {
        // Prompt user to choose camera or gallery
        const photo = await Camera.getPhoto({
          source: CameraSource.Prompt,      // Let user decide source
          resultType: CameraResultType.Uri, // Return as URI
          quality: 80,                      // Compress to 80% quality
        });
        // Fetch the photo data from the URI
        const response = await fetch(photo.webPath!);
        const blob = await response.blob(); // Convert to blob
        // Create a File object from the blob
        selectedFile = new File([blob], "photo.jpg", { type: "image/jpeg" });
      } else {
        // Handle web platform using a file input
        const input = document.createElement("input");
        input.type = "file";           // File input type
        input.accept = "image/*";      // Accept only images
        // Use a Promise to handle the asynchronous file selection
        const filePromise = new Promise<File>((resolve, reject) => {
          input.onchange = (event: Event) => {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files.length > 0) {
              resolve(target.files[0]); // Resolve with selected file
            } else {
              reject(new Error("No file selected")); // Reject if no file
            }
          };
        });
        input.click();           // Trigger file picker dialog
        selectedFile = await filePromise; // Wait for user to select file
      }

      // Process the selected file (resize and set preview)
      await handleImage(selectedFile);
    } catch (err) {
      setError("Failed to select image"); // Set error message
      console.error("Error selecting image:", err); // Log detailed error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to resize and optimize the selected image
  const handleImage = async (selectedFile: File) => {
    // Check file size (5MB limit)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB");
      return;
    }

    const image = new Image(); // Create an Image object for processing
    const previewUrl = URL.createObjectURL(selectedFile); // Generate temporary URL
    image.src = previewUrl; // Set image source to load it

    // When image loads, resize it
    image.onload = () => {
      const canvas = document.createElement("canvas"); // Create a canvas for resizing
      const ctx = canvas.getContext("2d"); // Get 2D drawing context

      const maxSize = 1024; // Maximum dimension (width or height)
      let width = image.width; // Original width
      let height = image.height; // Original height

      // Resize if either dimension exceeds maxSize
      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height *= maxSize / width; // Scale height proportionally
          width = maxSize;
        } else {
          width *= maxSize / height; // Scale width proportionally
          height = maxSize;
        }
      }

      canvas.width = width;  // Set canvas dimensions
      canvas.height = height;
      ctx?.drawImage(image, 0, 0, width, height); // Draw resized image on canvas

      // Convert canvas to a blob and create an optimized file
      canvas.toBlob((blob) => {
        if (blob) {
          const optimizedFile = new File([blob], selectedFile.name, { type: selectedFile.type });
          // Clean up old preview if it’s a blob URL
          if (preview && preview.startsWith("blob:")) {
            URL.revokeObjectURL(preview);
          }
          setFile(optimizedFile); // Set the optimized file
          setPreview(URL.createObjectURL(optimizedFile)); // Set new preview URL
        }
      }, selectedFile.type, 0.8); // Use original type, 80% quality
    };
  };

  // Function to upload the image to AWS S3
  const uploadImage = async (customPath?: string): Promise<string | null> => {
    if (!file) {
      setError("No file selected for upload"); // Error if no file
      return null;
    }

    setLoading(true); // Indicate upload is in progress
    setError(null);   // Clear previous errors
    try {
      // Generate a unique path if not provided
      const path = customPath || `public/profile-pictures/${Date.now()}-${file.name}`;
      // Upload file using Amplify Storage
      const result = await uploadData({
        path,
        data: file,
        options: { contentType: file.type }, // Use file’s actual MIME type
      }).result;

      // Hardcoded S3 details (should ideally come from Amplify config)
      const bucketName = "amplify-d3v0vo7pzfe19p-ma-grouptlystoragebucket011-rll6dfjwfmo5";
      const region = "us-east-1";
      // Construct the public S3 URL
      const publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${path}`;

      setUploadedUrl(publicUrl); // Store the uploaded URL
      console.log(`✅ Uploaded to: ${publicUrl}`); // Log success
      return publicUrl; // Return URL to caller
    } catch (err) {
      setError("Failed to upload image"); // Set error message
      console.error("Error uploading file:", err); // Log detailed error
      return null; // Return null on failure
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to reset all states
  const clearImage = () => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview); // Clean up blob URL
    }
    setFile(null);      // Clear selected file
    setPreview(null);   // Clear preview
    setUploadedUrl(null); // Clear uploaded URL
    setError(null);     // Clear error
  };

  // Return all states and functions for use in components
  return {
    file,           // Selected file (pre-upload)
    preview,        // Current image preview URL
    uploadedUrl,    // Final S3 URL after upload
    loading,        // Loading state for operations
    error,          // Error message if operation fails
    selectImage,    // Function to select a new image
    uploadImage,    // Function to upload the image
    setFile,        // Setter for file (manual override)
    setPreview,     // Setter for preview (e.g., for initial URL)
    clearImage,     // Function to reset all states
  };
};
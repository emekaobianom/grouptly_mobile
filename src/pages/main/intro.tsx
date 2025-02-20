import React from "react";
import { uploadData } from "aws-amplify/storage";

function Intro() {
  const [file, setFile] = React.useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]); // Store selected file
    }
  };

  const handleClick = async () => {
    if (!file) {
      console.error("No file selected!");
      return;
    }

    try {
      // Ensure the correct content type
      const contentType = file.type || "image/jpeg"; // Default to JPEG if unknown

      // Upload file to S3
      const result = await uploadData({
        path: `profile-pictures/${file.name}`,
        data: file,
        options: {
          contentType, // Set correct MIME type
          metadata: { customType: contentType }, // Additional metadata (optional)
        },
      });

      console.log("File uploaded successfully!", result);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      <button onClick={handleClick}>Upload</button>
    </div>
  );
}

export default Intro;

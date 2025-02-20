import React from 'react';
import { uploadData } from 'aws-amplify/storage';

function Intro() {
  const [file, setFile] = React.useState<File | undefined>(undefined);

  interface FileInputEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
  }

  const handleChange = (event: FileInputEvent): void => {
    setFile(event.target.files?.[0]);
  };

  const handleClick = () => {
    if (!file) {
      return;
    }
    uploadData({
      path: `profile-pictures/${file.name}`,
      data: file,
    });
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleClick}>Upload</button>
    </div>
  );
}

export default Intro;

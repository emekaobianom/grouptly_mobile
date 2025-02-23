import React from "react";
import { IonButton, IonCol } from "@ionic/react";

interface ImageUploadComponentProps {
  preview: string | null;
  selectImage: () => Promise<void>;
}

export const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({
  preview,
  selectImage,
}) => {
  return (
    <IonCol size="12" style={{ textAlign: "center" }}>
      {preview && <img src={preview} alt="Preview" width={200} />}
      <br />
      <IonButton color="light" shape="round" onClick={selectImage}>
        Select Image
      </IonButton>
    </IonCol>
  );
};
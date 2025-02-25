import React from "react";
import { IonButton, IonCol, IonText } from "@ionic/react";

interface ImageUploadComponentProps {
  preview: string | null;
  selectImage: () => Promise<void>;
}

export const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({
  preview,
  selectImage,
}) => {
  return (
    <IonCol size="12" style={{ textAlign: "center", cursor: 'pointer'  }} onClick={selectImage}>
      {preview && <img src={preview} alt="Preview" width={200} />}
      <br />
      <IonText color="dark">
        Tap to add image
      </IonText>
    </IonCol>
  );
};
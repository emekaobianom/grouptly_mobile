import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ImageUploadComponent } from "@/components/image/ImageUploadComponent";
import { useImageUpload } from "@/components/image/useImageUpload";

const Intro: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const { preview, selectImage, uploadImage } = useImageUpload();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Upload the image if one is selected
      // const imageUrl = await uploadImage("profile-pictures_how it should be");
      const imageUrl = await uploadImage();
      
      // Update form data with the uploaded image URL
      const finalFormData = {
        ...formData,
        imageUrl: imageUrl || "", // Use empty string if no image was uploaded
      };

      console.log("Submitting form with data:", finalFormData);
      // Your database submission logic here
      // await api.post('/your-endpoint', finalFormData);
      
      // Reset form
      setFormData({ title: "", description: "", imageUrl: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
          <IonTitle>Intro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating">Title</IonLabel>
            <IonInput
              value={formData.title}
              onIonChange={(e) =>
                setFormData({ ...formData, title: e.detail.value! })
              }
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonInput
              value={formData.description}
              onIonChange={(e) =>
                setFormData({ ...formData, description: e.detail.value! })
              }
            />
          </IonItem>
          <ImageUploadComponent preview={preview} selectImage={selectImage} />
          <IonButton
            type="submit"
            style={{ marginTop: "2rem" }}
            color="primary"
            shape="round"
          >
            Submit Form
          </IonButton>
          <IonButton
            style={{ marginTop: "2rem" }}
            color="secondary"
            shape="round"
            routerLink="/main/choose"
          >
            Go to Choose
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Intro;
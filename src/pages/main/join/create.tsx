import React, { useState } from 'react';
import logoPlaceholder from '@/assets/images/logo_placeholder.png';
import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonNavLink,
  IonToolbar,
  IonTitle,
  IonPage,
  IonInput,
  IonItem,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonLabel,
  IonImg,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';

interface MainJoinCreateProps
  extends RouteComponentProps<{
    id: string;
  }> { }
const MainJoinCreate: React.FC<MainJoinCreateProps> = ({ match }) => {

  //image start
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handlePlaceholderClick = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  };
  //image end


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Create Group</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">

        <IonItem lines="none">
          <IonInput label="Group Name (full)" labelPlacement="stacked" placeholder="Enter text" counter={true} maxlength={100}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonInput label="Group Name (abbreviation)" labelPlacement="stacked" placeholder="Enter text" counter={true} maxlength={20}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonTextarea label="Description of group" labelPlacement="stacked" placeholder="Enter text" counter={true} maxlength={200}></IonTextarea>
        </IonItem>

        <IonItem lines="none">
          <IonSelect label="Which Category" labelPlacement="stacked">
            <IonSelectOption value="Professional Networking">Professional Networking</IonSelectOption>
            <IonSelectOption value="Hobby & Interests">Hobby & Interests</IonSelectOption>
            <IonSelectOption value="Education & Learning">Education & Learning</IonSelectOption>
            <IonSelectOption value="Fitness & Wellness">Fitness & Wellness</IonSelectOption>
            <IonSelectOption value="Entrepreneurship & Business">Entrepreneurship & Business</IonSelectOption>
            <IonSelectOption value="Technology & Innovation">Technology & Innovation</IonSelectOption>
            <IonSelectOption value="Arts & Culture">Arts & Culture</IonSelectOption>
            <IonSelectOption value="Parenting & Family">Parenting & Family</IonSelectOption>
            <IonSelectOption value="Travel & Adventure">Travel & Adventure</IonSelectOption>
            <IonSelectOption value="Food & Cooking">Food & Cooking</IonSelectOption>
            <IonSelectOption value="Music & Entertainment">Music & Entertainment</IonSelectOption>
            <IonSelectOption value="Sports & Recreation">Sports & Recreation</IonSelectOption>
            <IonSelectOption value="Health & Support CreateGroup">Health & Support CreateGroup</IonSelectOption>
            <IonSelectOption value="Gaming & Esports">Gaming & Esports</IonSelectOption>
            <IonSelectOption value="Environmental & Sustainability">Environmental & Sustainability</IonSelectOption>
            <IonSelectOption value="Fashion & Beauty">Fashion & Beauty</IonSelectOption>
            <IonSelectOption value="Language & Cultural Exchange">Language & Cultural Exchange</IonSelectOption>
            <IonSelectOption value="Pet Lovers & Animal Welfare">Pet Lovers & Animal Welfare</IonSelectOption>
            <IonSelectOption value="Science & Technology">Science & Technology</IonSelectOption>
            <IonSelectOption value="Religion & Spirituality">Religion & Spirituality</IonSelectOption>
            <IonSelectOption value="Community">Community</IonSelectOption>
            <IonSelectOption value="Association & Union">Association & Union</IonSelectOption>
          </IonSelect>
        </IonItem>

        {/* logo start */}
        <>
          <IonItem lines='none' onClick={handlePlaceholderClick} style={{ cursor: 'pointer' }}>
          <IonLabel position='stacked'>
            Add Logo (white background)
                      </IonLabel>
                      <br />
            <IonImg
              src={selectedImage || logoPlaceholder}
              alt="Image Placeholder"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          </IonItem>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </>
        {/* logo end */}
        <br />
        <IonItem lines="none">
          <IonCheckbox slot="start" id="terms" />
          <IonLabel>
            <small> I agree with the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a></small>
           
          </IonLabel>
        </IonItem>
        <IonButton routerLink='/main/choose' expand='full' >Create Group</IonButton>

      </IonContent>
    </IonPage>
  );
}

export default MainJoinCreate;
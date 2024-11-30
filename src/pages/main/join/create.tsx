import React, { useState, useEffect } from 'react';
import logoPlaceholder from '@/assets/images/logo_placeholder.png';
import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
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
  IonSpinner,
} from '@ionic/react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { addGroupAtom, initializeUserAtom } from '@/store/store';
import { useAtom, useSetAtom } from 'jotai/react';
import { Group } from '@/store/interface';

interface MainJoinCreateProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const MainJoinCreate: React.FC<MainJoinCreateProps> = ({ match }) => {
  const history = useHistory();
  const addGroup = useSetAtom(addGroupAtom);

  // State for form fields
  const [, initializeUser] = useAtom(initializeUserAtom);// Atom to initialize user data
  const [groupName, setGroupName] = useState('');
  const [groupAbbreviation, setGroupAbbreviation] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupCategory, setGroupCategory] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitting, setSubmitting] = useState(false); // Atom to manage submitting state

  // State for image
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Handle form validation
  useEffect(() => {
    const isValid =
      groupName.trim() !== '' &&
      groupAbbreviation.trim() !== '' &&
      groupDescription.trim() !== '' &&
      groupCategory.trim() !== '' &&
      termsAccepted;
    setIsFormValid(isValid);
  }, [groupName, groupAbbreviation, groupDescription, groupCategory, termsAccepted]);

  // Handle image upload
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

  // Handle form submission
  const handleSubmit = async () => {
    if (isFormValid) {
      const formData: Group = {
        long_name: groupName,
        short_name: groupAbbreviation,
        location: "Lagos",
        category: groupCategory,
        logo: "selectedImage"

      };

      setSubmitting(true); // Set the submitting state to true
      try {
        await addGroup(formData);
        await initializeUser(); // Call initialize user atom
        setSubmitting(false);
        history.replace("/main/choose");
      } catch (error) {
        console.error("Failed to initialize create:", error);
        setSubmitting(false); // Reset submitting state in case of an error
      }



    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/main/join" />
          </IonButtons>
          <IonTitle>Create Group</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonItem lines="none">
          <IonInput
            label="Group Name (full)"
            labelPlacement="stacked"
            placeholder="e.g Women And Men's Association Kenya Branch"
            value={groupName}
            onIonChange={(e) => setGroupName(e.detail.value!)}
            counter={true}
            maxlength={100}
          ></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonInput
            label="Group Name (abbreviation)"
            labelPlacement="stacked"
            placeholder="e.g WAMA Kenya"
            value={groupAbbreviation}
            onIonChange={(e) => setGroupAbbreviation(e.detail.value!)}
            counter={true}
            maxlength={20}
          ></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonTextarea
            label="Description of group"
            labelPlacement="stacked"
            placeholder="e.g We always gather to share tips on family growth."
            value={groupDescription}
            onIonChange={(e) => setGroupDescription(e.detail.value!)}
            counter={true}
            maxlength={200}
          ></IonTextarea>
        </IonItem>

        <IonItem lines="none">
          <IonSelect
            label="Which Category is your Group"
            labelPlacement="stacked"
            value={groupCategory}
            onIonChange={(e) => setGroupCategory(e.detail.value!)}
          >
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

        <IonItem lines="none" onClick={handlePlaceholderClick} style={{ cursor: 'pointer' }}>
          <IonLabel position="stacked">Tap to add Logo (white background)</IonLabel>
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

        <IonItem lines="none">
          <IonCheckbox
            slot="start"
            checked={termsAccepted}
            onIonChange={(e) => setTermsAccepted(e.detail.checked)}
          />
          <IonLabel>
            <small>
              I agree with the{' '}
              <a href="#" className="text-blue-600 hover:underline">
                terms and conditions
              </a>
            </small>
          </IonLabel>
        </IonItem>
        
            <IonButton
              expand="full"
              onClick={handleSubmit}
              disabled={!isFormValid || submitting}
            >
              {submitting ? <IonSpinner name="dots"></IonSpinner> : "Create Group"}
            </IonButton>
         
      </IonContent>
    </IonPage>
  );
};

export default MainJoinCreate;

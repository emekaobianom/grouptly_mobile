import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetAtom, useAtomValue } from 'jotai';
import {
  IonPage, IonContent, IonText, IonButton, IonImg, IonItem, IonInput,
  IonSelect, IonSelectOption, IonBackButton, IonButtons, IonHeader,
  IonIcon, IonLabel, IonToolbar
} from '@ionic/react';
import icon from '@/assets/images/icon.png';
import { updateUserAtom, getUserAtom } from '@/store/atoms/userAtoms';
import { ellipsisVerticalSharp } from 'ionicons/icons';
import { useImageUpload } from '@/components/image/useImageUpload'; // Custom hook
import { ImageUploadComponent } from '@/components/image/ImageUploadComponent'; // Assuming this is a component

const MainProfileEdit: React.FC = () => {
  const history = useHistory();
  const updateUser = useSetAtom(updateUserAtom);
  const userData = useAtomValue(getUserAtom);

  // Use the image upload hook
  const { preview, selectImage, uploadImage, setPreview, file, loading: imageLoading } = useImageUpload();

  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    gender: '',
    phone: '',
    image: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Sync form data and initial image with userData
  useEffect(() => {
    if (userData) {
      setFormData({
        firstname: userData.firstname || '',
        middlename: userData.middlename || '',
        lastname: userData.lastname || '',
        gender: userData.gender || '',
        phone: userData.phone || '',
        image: userData.image || ''
      });
      // Set the initial preview to the user's existing image if no new preview is set
      if (userData.image && !preview) {
        setPreview(userData.image);
      }
    }
  }, [userData, setPreview, preview]);

  const validateInputs = () => {
    const nameRegex = /^[A-Za-z]{2,}$/;
    const optionalNameRegex = /^[A-Za-z]{1,}$/;
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    const newErrors: Record<string, string> = {};

    if (!nameRegex.test(formData.firstname)) newErrors.firstname = "First name: 2+ letters only";
    if (formData.middlename && !optionalNameRegex.test(formData.middlename)) newErrors.middlename = "Middle name: 1+ letters only";
    if (!nameRegex.test(formData.lastname)) newErrors.lastname = "Last name: 2+ letters only";
    if (!formData.gender || formData.gender === '') newErrors.gender = "Gender required";
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Valid phone required (e.g., +1234567890)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string) => (e: CustomEvent) => {
    setFormData(prev => ({ ...prev, [field]: e.detail.value || '' }));
  };

  const handleUpdateUser = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      let imageUrl = formData.image; // Default to existing image
      if (file) {
        // If a new file is selected, upload it and get the new URL
        imageUrl = await uploadImage(`public/profile_images/profile_${userData?.id}.jpg`) || imageUrl;
      }

      const updatedFormData = {
        ...formData,
        image: imageUrl // Update the image field with the new or existing URL
      };

      await updateUser({ id: userData?.id ?? "", ...updatedFormData });
      history.push('/main/profile');
    } catch (error) {
      console.error("Failed to update user:", error);
      // Optionally: Add user-facing error feedback here
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref='/main/profile' />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={handleUpdateUser} disabled={loading || imageLoading}>
              <IonText>{loading || imageLoading ? "Updating..." : "Save"}</IonText>
            </IonButton>
            <IonButton>
              <IonIcon icon={ellipsisVerticalSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonText color="dark">
          <h3 className="bold-text">Update Profile</h3>
        </IonText>

        <IonInput
          label="First Name"
          labelPlacement="end"
          fill="outline"
          placeholder="e.g. John"
          value={formData.firstname}
          onIonChange={handleInputChange("firstname")}
          className="ion-margin-bottom"
        />
        {errors.firstname && (
          <IonText className="ion-padding" color="danger">
            <small>{errors.firstname}</small>
          </IonText>
        )}

        <IonInput
          label="Middle Name"
          labelPlacement="end"
          fill="outline"
          placeholder="e.g. Dorothy"
          value={formData.middlename}
          onIonChange={handleInputChange("middlename")}
          className="ion-margin-bottom"
        />
        {errors.middlename && (
          <IonText className="ion-padding" color="danger">
            <small>{errors.middlename}</small>
          </IonText>
        )}

        <IonInput
          label="Last Name"
          labelPlacement="end"
          fill="outline"
          placeholder="e.g. Max"
          value={formData.lastname}
          onIonChange={handleInputChange("lastname")}
          className="ion-margin-bottom"
        />
        {errors.lastname && (
          <IonText className="ion-padding" color="danger">
            <small>{errors.lastname}</small>
          </IonText>
        )}

        <IonSelect
          interface="popover"
          label="Gender"
          labelPlacement="end"
          fill="outline"
          value={formData.gender}
          onIonChange={handleInputChange("gender")}
          className="ion-margin-bottom"
        >
          <IonSelectOption value="male">Male</IonSelectOption>
          <IonSelectOption value="female">Female</IonSelectOption>
        </IonSelect>
        {errors.gender && (
          <IonText className="ion-padding" color="danger">
            <small>{errors.gender}</small>
          </IonText>
        )}

        <IonInput
          label="Phone"
          labelPlacement="end"
          fill="outline"
          placeholder="+1234567890"
          value={formData.phone}
          onIonChange={handleInputChange("phone")}
          className="ion-margin-bottom"
        />
        {errors.phone && (
          <IonText className="ion-padding" color="danger">
            <small>{errors.phone}</small>
          </IonText>
        )}

        <IonItem>
          <ImageUploadComponent
            preview={preview || formData.image || icon} // Priority: preview > userData.image > fallback
            selectImage={selectImage}
          />
          <div slot="end">
            <IonLabel>Picture</IonLabel>
          </div>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default MainProfileEdit;
import './main.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetAtom, useAtomValue } from 'jotai';
import {
  IonPage, IonContent, IonText, IonButton, IonImg, IonItem, IonInput,
  IonSelect, IonSelectOption, IonBackButton, IonButtons, IonHeader,
  IonIcon, IonLabel, IonToolbar, IonList, IonPopover, IonLoading
} from '@ionic/react';
import icon from '@/assets/images/icon.png';
import { updateUserAtom, getUserAtom } from '@/store/atoms/userAtoms';
import { ellipsisVerticalSharp } from 'ionicons/icons';
import { useImageUpload } from '@/components/image/useImageUpload';
import { ImageUploadComponent } from '@/components/image/ImageUploadComponent';

const MainProfileEdit: React.FC = () => {
  const history = useHistory();
  const updateUser = useSetAtom(updateUserAtom);
  const userData = useAtomValue(getUserAtom);
  const { preview, selectImage, uploadImage, setPreview, file, loading: imageLoading } = useImageUpload();

  const [formData, setFormData] = useState<Record<string, string>>({
    firstname: '',
    middlename: '',
    lastname: '',
    gender: '',
    phone: '',
    image: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

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
      if (userData.image && !preview) {
        setPreview(userData.image);
      }
      // Validate initial data on load
      Object.keys(formData).forEach((field) => {
        if (field !== 'image') {
          const error = validateField(field, formData[field]);
          setErrors((prev) => ({ ...prev, [field]: error }));
        }
      });
    }
  }, [userData, setPreview, preview]);

  // Validation function for a single field
  const validateField = (field: string, value: string) => {
    const nameRegex = /^[A-Za-z]+$/; // Only alphabets
    const phoneRegex = /^\+?[0-9]{0,20}$/; // Optional + followed by 0-20 digits

    switch (field) {
      case 'firstname':
        return nameRegex.test(value) ? '' : 'First name: letters only';
      case 'middlename':
        return nameRegex.test(value) ? '' : 'Middle name: letters only';
      case 'lastname':
        return nameRegex.test(value) ? '' : 'Last name: letters only';
      case 'gender':
        return value && value !== '' ? '' : 'Gender required';
      case 'phone':
        return phoneRegex.test(value) ? '' : 'Phone: numbers only, max 20 digits (optional +)';
      default:
        return '';
    }
  };

  // Full form validation for submission
  const validateInputs = () => {
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((field) => {
      if (field !== 'image') { // Skip image validation
        const error = validateField(field, formData[field]);
        if (error) newErrors[field] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string) => (e: CustomEvent) => {
    const value = e.detail.value || '';
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Validate the field in real-time and update errors
    const error = validateField(field, value);
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const handleUpdateUser = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setShowLoading(true);

    try {
      let imageUrl = formData.image;
      if (file) {
        imageUrl = await uploadImage(`public/profile_images/profile_${userData?.id}.jpg`) || imageUrl;
      }

      const updatedFormData = { ...formData, image: imageUrl };
      await updateUser({ id: userData?.id ?? "", ...updatedFormData });
      history.goBack();
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setLoading(false);
      setShowLoading(false);
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
            <IonButton id="side-menu-profile-edit-button">
              <IonIcon icon={ellipsisVerticalSharp} />
            </IonButton>
            <IonPopover trigger="side-menu-profile-edit-button" dismissOnSelect={true} side="bottom" alignment="start">
              <IonContent>
                <IonList>
                  <IonItem button={true} detail={false}>Help</IonItem>
                </IonList>
              </IonContent>
            </IonPopover>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonText color="dark">
          <h3 className="bold-text">Update Profile</h3>
        </IonText>

        <div style={{ marginTop: "40px" }}>
          <IonItem lines="none">
            <IonInput
              className="custom"
              label="First Name"
              labelPlacement="stacked"
              value={formData.firstname}
              onIonChange={handleInputChange("firstname")}
              counter={true}
              maxlength={20} // Match phone's max length for consistency
              helperText={errors.firstname || ''} // Show error or empty string
            />
          </IonItem>

          <IonItem lines="none">
            <IonInput
              label="Middle Name"
              labelPlacement="stacked"
              value={formData.middlename}
              placeholder="e.g. Sean"
              onIonChange={handleInputChange("middlename")}
              counter={true}
              maxlength={20}
              helperText={errors.middlename || ''}
            />
          </IonItem>

          <IonItem lines="none">
            <IonInput
              label="Last Name"
              labelPlacement="stacked"
              value={formData.lastname}
              placeholder="e.g. Max"
              onIonChange={handleInputChange("lastname")}
              counter={true}
              maxlength={20}
              helperText={errors.lastname || ''}
            />
          </IonItem>

          <IonItem lines="none">
            <IonSelect
              interface="popover"
              label="Gender"
              labelPlacement="stacked"
              value={formData.gender}
              onIonChange={handleInputChange("gender")}
            >
              <IonSelectOption value="male">Male</IonSelectOption>
              <IonSelectOption value="female">Female</IonSelectOption>
            </IonSelect>
            {errors.gender ? (
              <IonText color="danger" style={{ fontSize: '12px', marginTop: '4px' }}>
                {errors.gender}
              </IonText>
            ) : null}
          </IonItem>

          <IonItem lines="none">
            <IonInput
              label="Phone"
              labelPlacement="stacked"
              value={formData.phone}
              placeholder="+1234567890"
              onIonChange={handleInputChange("phone")}
              counter={true}
              maxlength={20} // Updated to match new requirement
              helperText={errors.phone || ''}
            />
          </IonItem>

          <IonItem className="ion-no-padding">
            <div slot="start">
              <small className="ion-padding">Profile Picture</small>
              <br />
              <ImageUploadComponent
                preview={preview || formData.image || icon}
                selectImage={selectImage}
              />
            </div>
          </IonItem>
        </div>

        <IonLoading
          isOpen={showLoading}
          message={'Saving profile...'}
          spinner="crescent"
        />
      </IonContent>
    </IonPage>
  );
};

export default MainProfileEdit;
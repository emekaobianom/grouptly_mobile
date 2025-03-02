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

// Define the MainProfileEdit functional component
const MainProfileEdit: React.FC = () => {
  // Hook to programmatically navigate the app using React Router
  const history = useHistory();
  // Jotai setters and getters for user data management
  const updateUser = useSetAtom(updateUserAtom);
  const userData = useAtomValue(getUserAtom);
  // Custom hook for managing image uploads, providing preview, file selection, and upload functionality
  const { preview, selectImage, uploadImage, setPreview, file, loading: imageLoading } = useImageUpload();

  // State to manage form data (user's input fields)
  const [formData, setFormData] = useState<Record<string, string>>({
    firstname: '',
    middlename: '',
    lastname: '',
    gender: '',
    phone: '',
    image: '',
  });
  // State to manage form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  // State to manage general loading state for form submission
  const [loading, setLoading] = useState(false);
  // State to control the visibility of the loading spinner
  const [showLoading, setShowLoading] = useState(false);

  //------
  // UseEffect to initialize form data with user data when available
  useEffect(() => {
    if (userData) {
      // Populate form data with existing user data or empty strings
      setFormData({
        firstname: userData.firstname || '',
        middlename: userData.middlename || '',
        lastname: userData.lastname || '',
        gender: userData.gender || '',
        phone: userData.phone || '',
        image: userData.image || ''
      });
      // Set the image preview if available and not already set
      if (userData.image && !preview) {
        setPreview(userData.image);
      }
      // Validate initial form data on component load
      Object.keys(formData).forEach((field) => {
        if (field !== 'image') {
          const error = validateField(field, formData[field]);
          setErrors((prev) => ({ ...prev, [field]: error }));
        }
      });
    }
  }, [userData, setPreview, preview]);

  // Validation function for individual form fields
  const validateField = (field: string, value: string) => {
    const nameRegex = /^[A-Za-z]+$/; // Regex to allow only alphabets
    const phoneRegex = /^\+?[0-9]{0,20}$/; // Regex for phone: optional + followed by up to 20 digits

    // Switch case to handle validation for each field
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

  // Function to validate the entire form before submission
  const validateInputs = () => {
    const newErrors: Record<string, string> = {};
    // Validate each field except the image
    Object.keys(formData).forEach((field) => {
      if (field !== 'image') {
        const error = validateField(field, formData[field]);
        if (error) newErrors[field] = error;
      }
    });
    // Update the errors state with any validation messages
    setErrors(newErrors);
    // Return true if there are no errors (form is valid)
    return Object.keys(newErrors).length === 0;
  };

  // Handler for input changes in the form fields
  const handleInputChange = (field: string) => (e: CustomEvent) => {
    console.log("new input");
    const value = e.detail.value || '';
    // Update the form data state with the new value
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Validate the changed field in real-time and update errors
    const error = validateField(field, value);
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  // Function to handle user profile update
  const handleUpdateUser = async () => {
    // Validate form inputs; if invalid, stop the process
    if (!validateInputs()) return;

    // Set loading states to indicate the update is in progress
    setLoading(true);
    setShowLoading(true);

    try {
      // Use existing image URL unless a new image is uploaded
      let imageUrl = formData.image;
      if (file) {
        // Upload the new image if a file is selected
        imageUrl = await uploadImage(`public/profile_images/profile_${userData?.id}.jpg`) || imageUrl;
      }

      // Create updated form data including the image URL
      const updatedFormData = { ...formData, image: imageUrl };
      // Update user data in the global state using Jotai
      await updateUser({ id: userData?.id ?? "", ...updatedFormData });
      // Navigate back to the previous page after successful update
      history.goBack();
    } catch (error) {
      // Log any errors that occur during the update process
      console.error("Failed to update user:", error);
    } finally {
      // Reset loading states after the process completes
      setLoading(false);
      setShowLoading(false);
    }
  };

  // JSX to render the profile edit page
  return (
    // Ionic page component as the root element
    <IonPage>
      {/* Header section with back button, save button, and menu */}
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            {/* Back button to navigate to the profile page */}
            <IonBackButton defaultHref='/main/profile' />
          </IonButtons>
          <IonButtons slot="end">
            {/* Save button to trigger the profile update */}
            <IonButton onClick={handleUpdateUser} disabled={loading || imageLoading}>
              <IonText>{loading || imageLoading ? "Updating..." : "Save"}</IonText>
            </IonButton>
            {/* Menu button with a popover for additional options */}
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

      {/* Main content area with form inputs */}
      <IonContent className="ion-padding">
        <IonText color="dark">
          <h3 className="bold-text">Update Profile</h3>
        </IonText>

        {/* Form section with input fields for user data */}
        <div style={{ marginTop: "40px" }}>
          {/* First Name input */}
          <IonItem lines="none">
            <IonInput
              className="custom"
              label="First Name"
              labelPlacement="stacked"
              value={formData.firstname}
              onIonInput={handleInputChange("firstname")}
              counter={true}
              maxlength={20}
              helperText={errors.firstname || ''}
            />
          </IonItem>

          {/* Middle Name input */}
          <IonItem lines="none">
            <IonInput
              label="Middle Name"
              labelPlacement="stacked"
              value={formData.middlename}
              placeholder="e.g. Sean"
              onIonInput={handleInputChange("middlename")}
              counter={true}
              maxlength={20}
              helperText={errors.middlename || ''}
            />
          </IonItem>

          {/* Last Name input */}
          <IonItem lines="none">
            <IonInput
              label="Last Name"
              labelPlacement="stacked"
              value={formData.lastname}
              placeholder="e.g. Max"
              onIonInput={handleInputChange("lastname")}
              counter={true}
              maxlength={20}
              helperText={errors.lastname || ''}
            />
          </IonItem>

          {/* Gender selection dropdown */}
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
            {/* Display error message for gender if validation fails */}
            {errors.gender ? (
              <IonText color="danger" style={{ fontSize: '12px', marginTop: '4px' }}>
                {errors.gender}
              </IonText>
            ) : null}
          </IonItem>

          {/* Phone input */}
          <IonItem lines="none">
            <IonInput
              label="Phone"
              labelPlacement="stacked"
              value={formData.phone}
              placeholder="+1234567890"
              onIonInput={handleInputChange("phone")}
              counter={true}
              maxlength={20}
              helperText={errors.phone || ''}
            />
          </IonItem>

          {/* Profile picture upload section */}
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

        {/* Loading spinner displayed during profile update */}
        <IonLoading
          isOpen={showLoading}
          message={'Saving profile...'}
          spinner="crescent"
        />
      </IonContent>
    </IonPage>
  );
};

// Export the component as the default export
export default MainProfileEdit;
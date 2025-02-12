import React, { useState, useEffect } from 'react';
import logoPlaceholder from '@/assets/images/logo_placeholder.png';
import icon from '@/assets/images/icon.png';
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
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
} from '@ionic/react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useAtom, useAtomValue, useSetAtom } from 'jotai/react';
import { Group, MemberForm } from '@/store/interface';
import { getGroupAtom } from '@/store/atoms/groupAtoms';
import { addMemberAtom } from '@/store/atoms/memberAtoms';
import { initializeUserAtom, userAtom } from '@/store/atoms/userAtoms';

interface MainJoinRequestProps extends RouteComponentProps<{ id: string }> { }

const MainJoinRequest: React.FC<MainJoinRequestProps> = ({ match }) => {
  const history = useHistory();
  const addMember = useSetAtom(addMemberAtom);

  // State management for user and group data
  const [, initializeUser] = useAtom(initializeUserAtom);
  const [user] = useAtom(userAtom);
  const getGroup = useAtomValue(getGroupAtom);
  const [group, setGroup] = useState<Group | null>(null);

  // State for form fields
  const [userFirstname, setUserFirstname] = useState('');
  const [userMiddlename, setUserMiddlename] = useState('');
  const [userLastname, setUserLastname] = useState('');
  const [userGender, setUserGender] = useState('male');
  const [userPhone, setUserPhone] = useState('');
  const [userImageUrl, setUserImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // State for image upload
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserFirstname(user.firstname);
      setUserMiddlename(user.middlename ?? "");
      setUserLastname(user.lastname);
      // setUserGender(user.gender);
      setUserPhone(user.phone ?? "");
      setUserImageUrl(user.image ?? "");
    }
  }, []);

  // Fetch group on mount
  useEffect(() => {
    const fetchedGroup: any = getGroup(match.params.id);
    setGroup(fetchedGroup);
  }, [match.params.id, getGroup]);

  // Form validation logic
  useEffect(() => {
    const isValid =
      userFirstname.trim() !== '' &&
      userMiddlename.trim() !== '' &&
      userLastname.trim() !== '' &&
      userGender.trim() !== '' &&
      userPhone.trim() !== '' &&
      termsAccepted;

    setIsFormValid(isValid);
  }, [userFirstname, userMiddlename, userLastname, userGender, userPhone, termsAccepted]);

  // Handle image selection
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
    if (isFormValid && group) {
      const formData: MemberForm = {
        userId: user?.id ?? "",
        groupId: group?.id ?? "",
        firstname: userFirstname,
        middlename: userMiddlename,
        lastname: userLastname,
        gender: userGender,
        phone: userPhone,
        image_url: userImageUrl,
        status: group.super_admin_user_id === user?.id ? 'active' : 'pending',
      };

      setSubmitting(true);
      try {
        await addMember(formData);
        await initializeUser(user ? user.id : "");
        setSubmitting(false);
        history.replace("/main/choose");
      } catch (error) {
        console.error("Failed to submit:", error);
        setSubmitting(false);
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
          <IonTitle>Request to Join</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <IonCol size="12" className="ion-text-center">
              <IonAvatar style={{ margin: '0 auto', width: '15rem', height: '15rem' }}>
                <IonImg
                  src={group?.logo === 'default_logo' ? icon : group?.logo || logoPlaceholder}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                  alt="Group logo"
                />
              </IonAvatar>
            </IonCol>
          </IonRow>

          <IonRow>
            {/* <IonCol size="6">
              <IonCard className="member-card">
                <IonCardContent>
                  <IonAvatar className="member-avatar">
                    <img src={user?.image || logoPlaceholder} alt={user ? memberFullname(user) : ''} />
                  </IonAvatar>
                  <IonLabel className="member-name">{user ? memberFullname(user) : 'Guest'}</IonLabel>
                </IonCardContent>
              </IonCard>
            </IonCol> */}
            <IonCol size="12" class='ion-text-center'>
              <h4>{group?.long_name || 'Your Group'}</h4>
              <small>{group?.location || 'Unknown Location'}</small>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Form fields */}
        <IonItem lines="none">
          <IonInput
            label="First Name"
            labelPlacement="stacked"
            value={userFirstname}
            onIonChange={(e) => setUserFirstname(e.detail.value!)}
            counter={true}
            maxlength={50}
          />
        </IonItem>

        <IonItem lines="none">
          <IonInput
            label="Middle Name"
            labelPlacement="stacked"
            value={userMiddlename}
            onIonChange={(e) => setUserMiddlename(e.detail.value!)}
            counter={true}
            maxlength={50}
          />
        </IonItem>

        <IonItem lines="none">
          <IonInput
            label="Last Name"
            labelPlacement="stacked"
            value={userLastname}
            onIonChange={(e) => setUserLastname(e.detail.value!)}
            counter={true}
            maxlength={50}
          />
        </IonItem>


        <IonItem lines="none">
          <IonLabel position="stacked">Gender</IonLabel>
          <IonSelect
            value={userGender}
            onIonChange={(e) => setUserGender(e.detail.value)}
            placeholder="Select your gender"
            interface="popover" // This makes the modal a popover
          >
            <IonSelectOption value="male">Male</IonSelectOption>
            <IonSelectOption value="female">Female</IonSelectOption>
            <IonSelectOption value="other">Other</IonSelectOption>
          </IonSelect>
        </IonItem>


        <IonItem lines="none">
          <IonInput
            label="Phone"
            labelPlacement="stacked"
            value={userPhone}
            type='number'
            onIonChange={(e) => setUserPhone(e.detail.value!)}
            counter={true}
            maxlength={15}
          />
        </IonItem>

        {/* Image Upload */}
        <IonItem lines="none" onClick={handlePlaceholderClick} style={{ cursor: 'pointer' }}>
          <IonLabel position="stacked">Tap to add profile (white background)</IonLabel>
          <IonImg
            src={selectedImage || logoPlaceholder}
            alt="Image Placeholder"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
        </IonItem>
          {/* Description */}
          <IonItem lines="none">
          <IonTextarea
            label="Any more info"
            labelPlacement="stacked"
            value={description}
            onIonChange={(e) => setDescription(e.detail.value!)}
          />
        </IonItem>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />

        {/* Terms Acceptance */}
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

      

        {/* Submit Button */}
        <IonButton
          expand="full"
          disabled={!isFormValid}
          onClick={handleSubmit}
          className={submitting ? 'disabled-button' : ''}
        >
          {submitting ? <IonSpinner name="dots" /> : group?.super_admin_user_id === user?.id ? 'Join' : 'Submit Request'}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MainJoinRequest;

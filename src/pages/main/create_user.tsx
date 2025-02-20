import {
  IonContent,
  IonPage,
  IonButton,
  IonText,
  IonCol,
  IonRow,
  IonGrid,
  IonImg,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import icon from '@/assets/images/icon.png';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import React from 'react';
import { logoutUserAtom, initializeUserAtom, createUserAtom } from '@/store/atoms/userAtoms';
import { useAuthenticator } from '@aws-amplify/ui-react';

const CreateUser: React.FC = () => {
  const history = useHistory();
  const { user: signedInUser, signOut } = useAuthenticator((context) => [context.user]);

  const logoutUser = useSetAtom(logoutUserAtom);
  const initializeUser = useSetAtom(initializeUserAtom);
  const createUser = useSetAtom(createUserAtom);
  const [loading, setLoading] = useState(false);
  const [userFirstname, setUserFirstname] = useState('');
  const [userLastname, setUserLastname] = useState('');
  const [userMiddlename, setUserMiddlename] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [errors, setErrors] = useState<any>({});

  const validateInputs = () => {
    let newErrors: any = {};
    const nameRegex = /^[A-Za-z]{2,}$/;
    const phoneRegex = /^\+[1-9]\d{1,14}$/; // E.164 format

    if (!nameRegex.test(userFirstname)) newErrors.firstname = "First name must be at least 2 letters and contain only alphabets.";
    if (!nameRegex.test(userMiddlename)) newErrors.middlename = "Middle name must be at least 2 letters and contain only alphabets.";
    if (!nameRegex.test(userLastname)) newErrors.lastname = "Last name must be at least 2 letters and contain only alphabets.";
    if (!userGender) newErrors.gender = "Gender is required.";
    if (!phoneRegex.test(userPhone)) newErrors.phone = "Enter a valid phone number (e.g. +1234567890).";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateUser = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const userData: any = {
        id: signedInUser.userId,
        firstname: userFirstname,
        middlename: userMiddlename,
        lastname: userLastname,
        gender: userGender,
        phone: userPhone,
      };
      await createUser(userData);
      history.replace('/main/choose');
    } catch (error) {
      console.error("Failed to create user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid style={{ height: '100%' }}>
          <IonRow style={{ justifyContent: 'space-between', height: '100%' }}>
            <IonCol size="auto">
              <IonText color="dark" className="ion-margin-bottom">
                <h6 className="bold-text">Grouptly™</h6>
              </IonText>
              <IonText color="dark">
                <h3 className="bold-text">Create User</h3>
                <p className="bold-text ion-no-margin">Login and get connected to your group</p>
              </IonText>
            </IonCol>

            <IonCol size="12" style={{ textAlign: 'center' }}>
              <IonImg src={icon} style={{ margin: '0 auto', width: '15rem', height: '15rem' }} alt="Grouptly Icon" />
            </IonCol>

            <IonCol size="12">
              <IonItem lines="none">
                <IonInput label="First Name" labelPlacement="stacked" value={userFirstname} onIonChange={(e) => setUserFirstname(e.detail.value!)} />
              </IonItem>
              {errors.firstname && <IonText color="danger">{errors.firstname}</IonText>}
              
              <IonItem lines="none">
                <IonInput label="Middle Name" labelPlacement="stacked" value={userMiddlename} onIonChange={(e) => setUserMiddlename(e.detail.value!)} />
              </IonItem>
              {errors.middlename && <IonText color="danger">{errors.middlename}</IonText>}
              
              <IonItem lines="none">
                <IonInput label="Last Name" labelPlacement="stacked" value={userLastname} onIonChange={(e) => setUserLastname(e.detail.value!)} />
              </IonItem>
              {errors.lastname && <IonText color="danger">{errors.lastname}</IonText>}
              
              <IonItem lines="none">
                <IonSelect label="Gender" value={userGender} onIonChange={(e) => setUserGender(e.detail.value!)}>
                  <IonSelectOption value="male">Male</IonSelectOption>
                  <IonSelectOption value="female">Female</IonSelectOption>
                </IonSelect>
              </IonItem>
              {errors.gender && <IonText color="danger">{errors.gender}</IonText>}
              
              <IonItem lines="none">
                <IonInput label="Phone Number" labelPlacement="stacked" value={userPhone} onIonChange={(e) => setUserPhone(e.detail.value!)} />
              </IonItem>
              {errors.phone && <IonText color="danger">{errors.phone}</IonText>}
            </IonCol>

            <IonCol size="12" style={{ textAlign: 'center' }}>
              <IonButton style={{ marginTop: '2rem' }} color="primary" shape="round" onClick={handleCreateUser} disabled={loading}>
                {loading ? "Creating..." : "Create User"}
              </IonButton>
              <IonButton style={{ marginTop: '2rem' }} color="light" shape="round" onClick={signOut}>
                Log Out
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CreateUser;

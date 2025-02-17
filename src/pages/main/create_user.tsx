import {
  IonContent,
  IonPage,
  IonButton,
  IonText,
  IonCol,
  IonRow,
  IonGrid,
  IonImg
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import icon from '@/assets/images/icon.png';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import React from 'react';
import { logoutUserAtom, initializeUserAtom } from '@/store/atoms/userAtoms';

const CreateUser: React.FC = () => {
  const history = useHistory();
  // Access Jotai atoms correctly
  const logoutUser = useSetAtom(logoutUserAtom);
  const initializeUser = useSetAtom(initializeUserAtom);
  const [loading, setLoading] = useState(false);

    // Handle the login button click
    const handleLogin = async (userId: string) => {
      setLoading(true); // Set the loading state to true
      try {
        await initializeUser(userId); // Call initialize user atom
        // history.replace('/main/choose');
      } catch (error) {
        console.error("Failed to initialize user:", error);
        setLoading(false); // Reset loading state in case of an error
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
                <p className="bold-text ion-no-margin">
                  Login and get connected to your group
                </p>
              </IonText>
            </IonCol>

            <IonCol size="12" style={{ textAlign: 'center' }}>
              <IonImg
                src={icon}
                style={{ margin: '0 auto', width: '15rem', height: '15rem' }}
                alt="Grouptly Icon"
              />
            </IonCol>

            <IonCol size="12" style={{ textAlign: 'center' }}>
              <IonButton
                style={{ marginTop: '2rem' }}
                color="light"
                shape="round"
                routerLink='/main/choose'
                
              >
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

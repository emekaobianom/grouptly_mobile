import {
  IonContent,
  IonPage,
  IonButton,
  IonText,
  IonCol,
  IonRow,
  IonGrid,
  IonImg,
  IonIcon,
  IonSpinner
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import icon from '@/assets/images/icon.png';
import { logoGoogle, logoFacebook } from 'ionicons/icons';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import React from 'react';
import { logoutUserAtom, initializeUserAtom, userAtom } from '@/store/atoms/userAtoms';
import { client } from '@/store';
import { useAuthenticator } from '@aws-amplify/ui-react';

const CreateUser: React.FC = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const history = useHistory();

  // Access Jotai atoms    
  const [, logoutUser] = useAtom(logoutUserAtom);// Atom to initialize user data
  const [, initializeUser] = useAtom(initializeUserAtom);// Atom to initialize user data
  const [loading, setLoading] = useState(false); // Atom to manage loading state

  // Monitor the user state
  useEffect(() => { //run once on startup
    
  }, []);

  
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

              {loading ? <IonSpinner name="dots"></IonSpinner> :
                <>
          
                </>
              }
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CreateUser;

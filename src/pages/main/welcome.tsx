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

const Welcome: React.FC = () => {
  const { user:signedInUser } = useAuthenticator((context) => [context.user]);
  const [user] = useAtom(userAtom);
  const history = useHistory();

  // Access Jotai atoms    
  const [, logoutUser] = useAtom(logoutUserAtom);// Atom to initialize user data
  const [, initializeUser] = useAtom(initializeUserAtom);// Atom to initialize user data
  const [loading, setLoading] = useState(false); // Atom to manage loading state

  // Monitor the user state
  useEffect(() => { //run once on startup    
    // const initialize = async () => {
    //   console.log("user in welcome ",signedInUser.userId)
    //   logoutUser();
    //   await handleLogin(signedInUser.userId);

    //   console.log("user in welcome ",user)

    //   if(user){
    //     history.replace('/main/choose');
    //   }else if(user === null){
    //     history.replace('/main/create_user');
    //   }
    // };
    // initialize();
  }, []);


  // Handle the login button click
  const handleLogin = async (userId: string) => {
    setLoading(true); // Set the loading state to true
    try {
      await initializeUser(userId); // Call initialize user atom      
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
                <h3 className="bold-text">Welcome</h3>
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
                  <IonButton
                    style={{ marginBottom: 16 }}
                    expand="block"
                    color="secondary"
                    shape="round"
                    onClick={() => handleLogin("1")}
                  >
                    <IonIcon slot="start" icon={logoGoogle} />
                    Login with Test User 1
                  </IonButton>
                  <IonButton
                    style={{ marginBottom: 16 }}
                    expand="block"
                    color="secondary"
                    shape="round"
                    onClick={() => handleLogin("3")}
                  >
                    <IonIcon slot="start" icon={logoGoogle} />
                    Login with Test User 2
                  </IonButton>
                  <IonButton
                    style={{ marginBottom: 16 }}
                    expand="block"
                    color="secondary"
                    shape="round"
                    onClick={() => handleLogin("3")}
                  >
                    <IonIcon slot="start" icon={logoGoogle} />
                    Login with Test User 3
                  </IonButton>
                </>
              }
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;

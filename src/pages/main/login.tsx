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
import { initializeUserAtom, logoutUserAtom, setUserAtom, userAtom } from '@/store/store'; // Import the setUser atom
import { useEffect, useState } from 'react';
import React from 'react';

const Login: React.FC = () => {
  const history = useHistory();

  // Access Jotai atoms    
  const [, logoutUser] = useAtom(logoutUserAtom);// Atom to initialize user data
  const [, initializeUser] = useAtom(initializeUserAtom);// Atom to initialize user data
  const [user] = useAtom(userAtom); // Atom containing user data
  const [loading, setLoading] = useState(false); // Atom to manage loading state

  // Monitor the user state
  useEffect(() => { //run once on startup
    logoutUser()
  }, []);

  // Handle the login button click
  const handleLogin = async (userId:string) => {
    setLoading(true); // Set the loading state to true
    try {
      await initializeUser(userId); // Call initialize user atom
      history.replace('/main/choose');
    } catch (error) {
      console.error("Failed to initialize user:", error);
      setLoading(false); // Reset loading state in case of an error
    }
  };

  const handleNext = () => {
    history.replace('/main/signup');
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
                <h3 className="bold-text">Login</h3>
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
                    onClick={()=>handleLogin("1")}
                  >
                    <IonIcon slot="start" icon={logoGoogle} />
                    Login with Test User 1
                  </IonButton>
                  <IonButton
                    style={{ marginBottom: 16 }}
                    expand="block"
                    color="secondary"
                    shape="round"
                    onClick={()=>handleLogin("2")}
                  >
                    <IonIcon slot="start" icon={logoGoogle} />
                    Login with Test User 2
                  </IonButton>
                  <IonButton
                    style={{ marginBottom: 16 }}
                    expand="block"
                    color="secondary"
                    shape="round"
                    onClick={()=>handleLogin("3")}
                  >
                    <IonIcon slot="start" icon={logoGoogle} />
                    Login with Test User 3
                  </IonButton>
                {/* <hr />
                  <IonButton
                    style={{ marginBottom: 16 }}
                    expand="block"
                    color="tertiary"
                    shape="round"
                    onClick={()=>handleLogin("googletestid")}
                  >
                    <IonIcon slot="start" icon={logoGoogle} />
                    Login with Google
                  </IonButton>
                  <IonButton
                    style={{ marginBottom: 16 }}
                    expand="block"
                    color="tertiary"
                    shape="round"
                    onClick={()=>handleLogin("facebooktestid")}
                  >
                    <IonIcon slot="start" icon={logoFacebook} />
                    Login with Facebook
                  </IonButton> */}
                  <IonButton
                    style={{ marginTop: '2rem' }}
                    color="light"
                    shape="round"
                    onClick={handleNext}
                  >
                    I don't have an account
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

export default Login;

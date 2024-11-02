import {
  IonContent,
  IonPage,
  IonButton,
  IonText,
  IonCol,
  IonRow,
  IonGrid,
  IonImg,
  IonIcon
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import icon from '@/assets/images/icon.png';
import { logoGoogle, logoFacebook } from 'ionicons/icons';
import { useSetAtom } from 'jotai';
import { setUserAtom, UserStatus } from '@/store/store'; // Import the setUser atom

const Login: React.FC = () => {
  const setUser = useSetAtom(setUserAtom); // Correctly use useSetAtom for a writable atom
  const history = useHistory();

  const handleLogin = async () => {
    setUser({
      id: '1',
      firstname: 'Emeka',
      lastname: 'Obianom',
      middlename: 'Sunday',
      role: 'Chairman',
      phone: '09098943967',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      groups: [{ id: 'g3', user_status: UserStatus.Active }
        , { id: 'g4', user_status: UserStatus.Active }
        , { id: 'g2', user_status: UserStatus.Pending }]
    });
    history.push('/main/welcome');
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
              <IonButton
                style={{ marginBottom: 16 }}
                expand="block"
                color="tertiary"
                shape="round"
                onClick={handleLogin}
              >
                <IonIcon slot="start" icon={logoGoogle} />
                Login with Google
              </IonButton>
              <IonButton
                style={{ marginBottom: 16 }}
                expand="block"
                color="tertiary"
                shape="round"
                onClick={handleLogin}
              >
                <IonIcon slot="start" icon={logoFacebook} />
                Login with Facebook
              </IonButton>
              <IonButton
                style={{ marginTop: '2rem' }}
                color="light"
                shape="round"
                onClick={handleNext}
              >
                I don't have an account
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;

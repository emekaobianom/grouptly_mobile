import { IonContent, IonPage, IonButton, IonText, IonCol, IonRow, IonGrid, IonImg, IonIcon, IonRouterLink } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import icon from '@/assets/images/icon.png';
import { logoGoogle, logoFacebook } from 'ionicons/icons';

const Login: React.FC = () => {
  const history = useHistory();

  const handleNext = async () => {
    // await storeData('firstAppVisit', 'false');
    history.replace('/main/signup');
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid style={{ height: '100%' }}>
          <IonRow style={{ justifyContent: 'space-between', height: '100%' }}>
            <IonCol size="auto">
              <IonText color="dark" className='ion-margin-bottom'>
                <h6 className="bold-text">Grouptly™</h6>
              </IonText>
              <IonText color="dark">
                <h3 className="bold-text">Login</h3>
                <p className="bold-text ion-no-margin">Login and get connected to your group</p>
              </IonText>
            </IonCol>

            <IonCol size="12" style={{ textAlign: 'center' }}>
              <IonImg
                src={icon}
                style={{
                  margin: '0 auto',
                  width: '15rem',
                  height: '15rem'
                }}
                alt="Grouptly Icon"
              />
            </IonCol>

            <IonCol size="12" style={{ textAlign: 'center' }}>
              <IonButton style={{marginBottom:16}} expand="block" color="tertiary" shape='round'  onClick={()=>{history.push('/main/choose')}}>
                <IonIcon slot='start' icon={logoGoogle} />
                Login with Google
              </IonButton>
              <IonButton style={{marginBottom:16}} expand="block" color="tertiary" shape='round'>
                <IonIcon slot='start' icon={logoFacebook} />
                Login with Facebook
              </IonButton>
              <hr />
              <IonButton expand="block" style={{}} color="light" shape='round'>
                Login with email
              </IonButton>
              <IonButton style={{marginTop:"2rem"}} color="light" shape='round'  onClick={()=>{history.push('/main/signup')}}>
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

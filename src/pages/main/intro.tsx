import { IonContent, IonPage, IonButton, IonText, IonCol, IonRow, IonGrid, IonImg } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import icon from '@/assets/images/icon.png';

const Intro: React.FC = () => {
  const history = useHistory();

  const handleNext = async () => {
    // await storeData('firstAppVisit', 'false');
    //history.replace('/signup');
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid style={{ height: '100%' }}>
          <IonRow style={{ justifyContent: 'space-between', height: '100%' }}>
            <IonCol size="auto">
              <IonText color="dark">
                <h6 className="bold-text">Grouptly™</h6>
              </IonText>
            </IonCol>

            <IonCol size="12" style={{ textAlign: 'center' }}>
              <h2 className="text-slate-600">Welcome to</h2>
              <h1 className="font-black">Grouptly</h1>
              <p className="">Now your groups are at your fingertips.</p>
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
              <p className="small-text">
                By clicking on Next, you agree to Grouptly's Terms and Conditions of Use.
              </p>
              <IonButton expand="block" color="tertiary" shape='round'  onClick={()=>{history.push('/main/signup')}}>
              Next
              </IonButton>
            </IonCol>

          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Intro;

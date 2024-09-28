import { IonContent, IonPage, IonButton, IonText, IonCol, IonRow, IonGrid, IonImg } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const Welcome: React.FC = () => {
  
  const history = useHistory();

  // const handleNext = async () => {
  //   // await storeData('firstAppVisit', 'false');
  //   history.replace('/signup');
  // };

  useEffect(() => {

    const timer = setTimeout(() => {
      // Pass the state object with openMenu set to true
      history.push('/member/dashboard?openMenu=true');
    }, 1000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
    
  }, []);

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
              <IonImg
                src="https://png.pngtree.com/template/20191005/ourmid/pngtree-logo-people-group-team-image_314502.jpg"
                style={{
                  margin: '0 auto',
                  width: '15rem',
                  height: '15rem'
                }}
                alt="Grouptly Icon"
              />
              <h2>Welcome to Ancopen Youth</h2>
              <h5>Emeka Obianom</h5>
            </IonCol>          
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;

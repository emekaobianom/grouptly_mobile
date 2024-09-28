import { IonContent, IonPage, IonButton, IonText, IonCol, IonRow, IonGrid, IonImg, IonRouterLink, IonCardTitle, IonCard, IonCardContent, IonCardHeader, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { logoFacebook, people } from 'ionicons/icons';

const Choose: React.FC = () => {
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
              <IonText color="dark" className='ion-margin-bottom'>
                <h6 className="bold-text">Grouptly™</h6>
              </IonText>
              <IonText color="dark">
                <h3 className="bold-text">Choose</h3>
                <p className="bold-text ion-no-margin">Tap to enter your group</p>
              </IonText>
            </IonCol>

            <IonCol size="12">
              <IonCard routerLink="/main/welcome">
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol size='auto'>
                        <IonIcon icon={people} style={{ color: 'black', fontSize: '24px' }} /> {/* Icon */}

                      </IonCol>
                      <IonCol>
                        <p> sdfdsfdfs</p>
                        <IonText color="success">
                          <small>Active</small>
                        </IonText>
                      </IonCol>
                    </IonRow>
                  </IonGrid>



                </IonCardContent>
              </IonCard>
              <IonCard routerLink="/main/welcome">
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol size='auto'>
                        <IonIcon icon={people} style={{ color: 'black', fontSize: '24px' }} /> {/* Icon */}

                      </IonCol>
                      <IonCol>
                        <p> sdfdsfdfs</p>
                        <IonText color="success">
                          <small>Active</small>
                        </IonText>
                      </IonCol>
                    </IonRow>
                  </IonGrid>



                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" style={{ textAlign: 'center' }}>
              <IonButton expand="block" color="light" shape='round' routerLink='/main/join'>
                Join or Create Group
              </IonButton>
              <IonButton style={{marginTop:"2rem"}} color="light" shape='round'  onClick={()=>{history.push('/main/login')}}>
              LogOut
              </IonButton>
            </IonCol>

          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Choose;

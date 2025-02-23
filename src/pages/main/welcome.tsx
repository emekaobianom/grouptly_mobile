
import { userAtom } from '@/store/atoms/userAtoms';
import {
  IonContent,
  IonPage,
  IonText,
  IonCol,
  IonRow,
  IonGrid,
  IonImg,
  IonButton,
  IonAvatar,
} from '@ionic/react';
import firework from '@/assets/images/firework.png';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Welcome: React.FC = () => {  
  const [user] = useAtom(userAtom);
  const history = useHistory();

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid style={{ height: '100%', paddingTop: '4rem' }}> 
          <IonRow style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <IonCol size="12" style={{ textAlign: 'center' }}>
              {/* <IonAvatar style={{ margin: '0 auto', width: '15rem', height: '15rem' }}>
                <IonImg
                  // src={(user?.image?user?.image : userIcon)} // Optional chaining to handle undefined user
                  src={firework} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  alt={user?.fullname} // Optional chaining for fullname
                />
              </IonAvatar> */}
               <IonImg
                  src={firework}                    
                  style={{ margin: '0 auto', width: '10rem', height: 'auto' }}
                  alt={user?.fullname} // Optional chaining for fullname
                />
              <h4>Welcome to Grouptly™</h4>
              <h2>{user?.fullname}</h2> {/* Display fullname with optional chaining */}
              <IonButton size="large" color="tertiary" shape="round" fill="solid" onClick={() => history.replace('/main/choose')}>
                Enter
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;

import { userAtom } from '@/store/store';
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
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Welcome: React.FC = () => {
  const [user] = useAtom(userAtom); // Use destructuring to get the user atom
  const history = useHistory();

  // Check if user data is available; if not, redirect
  useEffect(() => {
    if (!user) {
      history.replace('/main/login'); // Redirect to login if no user
    }
  }, [user]);

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid style={{ height: '100%', paddingTop: '4rem' }}> 
          <IonRow style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <IonCol size="12" style={{ textAlign: 'center' }}>
              <IonAvatar style={{ margin: '0 auto', width: '15rem', height: '15rem' }}>
                <IonImg
                  src={user?.image} // Optional chaining to handle undefined user
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                  alt={user?.fullname} // Optional chaining for fullname
                />
              </IonAvatar>
              <h4>Welcome to Grouptly™</h4>
              <h2>{user?.fullname}</h2> {/* Display fullname with optional chaining */}
              <IonButton size="large" color="tertiary" shape="round" fill="solid" onClick={() => history.push('/main/choose')}>
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

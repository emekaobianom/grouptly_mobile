import {
  IonContent,
  IonPage,
  IonText,
  IonCol,
  IonRow,
  IonGrid,
  IonImg,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getItem } from '@/utils/storage';

const Welcome: React.FC = () => {
  const history = useHistory();
  const [group, setGroup] = useState<any>(null);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const selectedGroup = await getItem("selectedGroup");
        setGroup(selectedGroup);
      } catch (error) {
        console.error("Error fetching group:", error);
      }
    };

    fetchGroup();
    
    const timer = setTimeout(() => {
      // Pass the state object with openMenu set to true
      history.push('/member/dashboard?openMenu=true');
    }, 1000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [history]);

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        {/* Fixed Header */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            padding: '1rem',
            background: 'transparent',
          }}
        >
          <IonText color="dark">
            <h6 className="bold-text">Grouptly™</h6>
          </IonText>
        </div>

        {/* Main Content */}
        <IonGrid style={{ height: '100%', paddingTop: '4rem' }}> {/* Added padding to avoid overlap */}
          <IonRow style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <IonCol size="12" style={{ textAlign: 'center' }}>
              <IonImg
                src={group?.logo || ""}
                style={{
                  margin: '0 auto',
                  width: '15rem',
                  height: 'auto',
                  objectFit: 'contain',
                }}
                alt="Grouptly Icon"
              />
              <h2>Welcome to {group?.long_name || "your group"}</h2> {/* Display group name */}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;

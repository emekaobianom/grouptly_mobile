import {
  IonContent,
  IonPage,
  IonButton,
  IonText,
  IonCol,
  IonRow,
  IonGrid,
  IonIcon,
  IonCard,
  IonCardContent,
  IonImg,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { people } from 'ionicons/icons'; // Keep as fallback icon
import { useState, useEffect } from 'react';
import { getItem, setItem, removeItem } from '@/utils/storage';
import { groupsData } from '@/data/group_placeholder';

const Choose: React.FC = () => {
  const history = useHistory();

  // Sample structure for groupsData:
  // {
  //   long_name: "Creative Minds Collective",
  //   short_name: "CMC",
  //   location: "New York, NY",
  //   category: "Art & Culture",
  //   status: "Active",
  //   logo: "https://via.placeholder.com/150?text=CMC"
  // }

  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    // Corrected logic to take only the first three groups
    const fetchedGroups = groupsData.slice(0, 3).map(group => ({
      ...group,
    }));
    setGroups(fetchedGroups);
  }, []); // The empty dependency array makes it run only once on component mount

  const handleGroupClick = (group:any)=>{
    setItem("selectedGroup",group);
    history.push('/main/welcome')
  }

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
                <h3 className="bold-text">Choose</h3>
                <p className="bold-text ion-no-margin">
                  Tap to enter your group
                </p>
              </IonText>
            </IonCol>

            <IonCol size="12">
              {groups.map((group, index) => (
                <IonCard onClick={()=>handleGroupClick(group)} style={{ cursor: 'pointer' }} key={index}>
                  <IonCardContent>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="auto">
                          {group.logo ? (
                            <IonImg
                              src={group.logo}
                              style={{                                
                                width: '50px', // Or any fixed width you want, like '15rem'
                                height: 'auto',
                                objectFit: 'contain', // or 'cover' depending on your needs
                           borderRadius: '50%' }}
                            />
                          ) : (
                            <IonIcon
                              icon={people}
                              style={{ color: 'black', fontSize: '24px' }}
                            />
                          )}
                        </IonCol>
                        <IonCol>
                          <p className="bold-text">{group.long_name}</p>
                          
                          <IonText color="medium">
                            <small>{group.location}</small>
                          </IonText>
                          <IonText color="success">
                             <small>( {group.status} )</small>
                          </IonText>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              ))}
            </IonCol>

            <IonCol size="12" style={{ textAlign: 'center' }}>
              <IonButton
                expand="block"
                color="light"
                shape="round"
                routerLink="/main/join"
              >
                Join or Create Group
              </IonButton>
              <IonButton
                style={{ marginTop: '2rem' }}
                color="light"
                shape="round"
                onClick={() => {
                  history.push('/main/login');
                }}
              >
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

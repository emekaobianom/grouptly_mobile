import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonImg,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonSearchbar,
    IonTitle,
    IonToolbar,
    RefresherEventDetail,
    IonCard,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
  } from '@ionic/react';
  import { useState } from 'react';
  import { add, chevronForward, people } from 'ionicons/icons';
  import { RouteComponentProps } from 'react-router';
import { groupsData } from '@/data/group_placeholder';
  
  const MainJoin: React.FC<RouteComponentProps> = ({ match }) => {
    const [isScrolled, setIsScrolled] = useState(false);
  
    // Sample group data
    const groups = groupsData;
  
    const handleScroll = (event: any) => {
      const scrollTop = event.detail.scrollTop;
      setIsScrolled(scrollTop > 50);
    };
  
    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
      setTimeout(() => {
        event.detail.complete();
      }, 2000);
    };
  
    const handleGroupClick = (group: any) => {
      // Navigate to group details or perform other actions
      console.log('Group clicked:', group);
    };
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>Join Group</IonTitle>
            <IonButtons slot="end">
              <IonButton routerLink="/main/join/create" shape="round" fill="outline">
                <IonIcon icon={add} slot="start" />
                Create Group
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar />
          </IonToolbar>
        </IonHeader>
  
        <IonContent scrollEvents={true} onIonScroll={handleScroll}>
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent />
          </IonRefresher>
  
          {/* Map through groups to display a list of cards */}
          {groups.map((group, index) => (
            <IonCard
              onClick={() => handleGroupClick(group)}
              style={{ cursor: 'pointer' }}
              key={index}
            >
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol size="auto">
                      {group.logo ? (
                        <IonImg
                          src={group.logo}
                          style={{
                            width: '50px',
                            height: 'auto',
                            objectFit: 'contain',
                            borderRadius: '50%',
                          }}
                        />
                      ) : (
                        <IonIcon icon={people} style={{ color: 'black', fontSize: '24px' }} />
                      )}
                    </IonCol>
                    <IonCol>
                      <p className="bold-text">{group.long_name}</p>
                      <IonText color="medium">
                        <small>{group.location}</small>
                      </IonText>
                      <IonText color="success">
                        <small>({group.status})</small>
                      </IonText>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          ))}
  
          <div style={{ marginBottom: 80 }}></div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default MainJoin;
  
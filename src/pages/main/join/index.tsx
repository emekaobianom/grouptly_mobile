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
  IonAlert,
} from '@ionic/react';
import { useState } from 'react';
import { add, checkmarkCircle, chevronForward, people } from 'ionicons/icons';
import { RouteComponentProps, useHistory } from 'react-router';
import { groupsData } from '@/data/group_placeholder';

const MainJoin: React.FC<RouteComponentProps> = ({ match }) => {
  const history = useHistory();
  const [isScrolled, setIsScrolled] = useState(false);
  const [alertOrangeIsOpen,setAlertOrangeIsOpen] = useState(false);
  const [alertGreenIsOpen,setAlertGreenIsOpen] = useState(false);

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
    if (group.status == "Active") {
      setAlertGreenIsOpen(true);
    } else if(group.status == "Not-Active") {
      setAlertOrangeIsOpen(true);
    }
    else{
      history.push(`/main/join/request/${group.id}`);
    }
    
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref='/main/choose' />
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
                  </IonCol>
                  <IonCol size="auto">
                    {(group.status === 'Active') && (
                      <IonIcon
                        icon={checkmarkCircle}
                        style={{ color: 'green', fontSize: '24px' }}
                      />
                    )}
                    {(group.status === 'Not-Active') && (
                      <IonIcon
                        icon={checkmarkCircle}
                        style={{ color: 'orange', fontSize: '24px' }}
                      />
                    )}
                    {(group.status === '') && (
                      <></>
                    )}
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        ))}

        <div style={{ marginBottom: 80 }}></div>
      </IonContent>
      <IonAlert
        isOpen={alertGreenIsOpen}
        header="Group Green"
        subHeader="Your are already a member"
        message="You can't request to join again."
        buttons={['Okay']}
        onDidDismiss={() => setAlertGreenIsOpen(false)}
      ></IonAlert>
      <IonAlert
        isOpen={alertOrangeIsOpen}
        header="Group Not Green"
        subHeader="Your Request is still pending"
        message="Once the group admin accepts you then you can enter this group."
        buttons={['Okay']}
        onDidDismiss={() => setAlertOrangeIsOpen(false)}
      ></IonAlert>
    </IonPage>
  );
};

export default MainJoin;

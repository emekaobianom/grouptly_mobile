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
  IonChip,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { add, checkmarkCircle, closeCircle, handLeft, people, timer } from 'ionicons/icons';
import { RouteComponentProps, useHistory } from 'react-router';
import { GroupsWithMembersAtom, initializeGroupsAtom, userAtom } from '@/store/store';
import { useAtom } from 'jotai';
import { Group, Member, UserStatus } from '@/store/interface';
import icon from '@/assets/images/icon.png';
import { forEach } from 'cypress/types/lodash';

const MainJoin: React.FC<RouteComponentProps> = ({ match }) => {
  const [user] = useAtom(userAtom);
  const history = useHistory();
  const [isScrolled, setIsScrolled] = useState(false);
  const [alertOrangeIsOpen, setAlertOrangeIsOpen] = useState(false);
  const [alertGreenIsOpen, setAlertGreenIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query

  const [, initializeGroups] = useAtom(initializeGroupsAtom);

  useEffect(() => {
    initializeGroups(); // Trigger initialization only once
  }, [initializeGroups]);

  // Sample group data
  const [groups] = useAtom(GroupsWithMembersAtom);

  const handleScroll = (event: any) => {
    const scrollTop = event.detail.scrollTop;
    setIsScrolled(scrollTop > 50);
  };

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  const handleGroupClick = (group: Group, user_status: string) => {
    if (user_status === (UserStatus.Active || UserStatus.Rejected || UserStatus.Suspended)) {
      setAlertGreenIsOpen(true);
    } else if (user_status === UserStatus.Pending) {
      setAlertOrangeIsOpen(true);
    } else {
      history.push(`/main/join/request/${group.id}`);
    }
  };

  // Filter groups based on the search query
  const filteredGroups = groups.filter((group: Group) =>
    group.long_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader className='header'>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/main/choose" />
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
          <IonSearchbar
            value={searchQuery}
            onIonInput={e => setSearchQuery((e.target as EventTarget & { value: string }).value)}
            placeholder="Search groups"
          />
        </IonToolbar>
      </IonHeader>

      <IonContent scrollEvents={true} onIonScroll={handleScroll}>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {/* Map through filtered groups to display a list of cards */}
        {filteredGroups.map((group, index) => {

          let user_status: string = "";
          user?.memberships.map((m: Member) => {
            if (m.group.id == group.id) {
              user_status = m.status;
            }
          }
          );

          return (
            <IonCard
              onClick={() => handleGroupClick(group, user_status)}
              style={{ cursor: 'pointer' }}
              key={index}
            >
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol size="auto">
                      {group.logo ? (
                        <IonImg
                          src={(() => ((group.logo == "default_logo") ? icon : group.logo))()}
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
                        <small>{group.location}</small><br />
                      </IonText>
                      {(group.super_admin_user_id == user?.id) ? <IonChip color="secondary">You are super Admin</IonChip> : ""}

                    </IonCol>
                    <IonCol size="auto">
                      {(user_status === UserStatus.Active) && (
                        <IonIcon
                          icon={checkmarkCircle}
                          style={{ color: 'slate', fontSize: '24px' }}
                        />
                      )}
                      {(user_status === UserStatus.Pending) && (
                        <IonIcon
                          icon={timer}
                          style={{ color: 'slate', fontSize: '24px' }}
                        />
                      )}
                      {(user_status === UserStatus.Suspended) && (
                        <IonIcon
                          icon={handLeft}
                          style={{ color: 'slate', fontSize: '24px' }}
                        />
                      )}
                      {(user_status === UserStatus.Rejected) && (
                        <IonIcon
                          icon={closeCircle}
                          style={{ color: 'darkred', fontSize: '24px' }}
                        />
                      )}
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          )
        }
        )}

        <div style={{ marginBottom: 80 }}></div>
      </IonContent>
      <IonAlert
        isOpen={alertGreenIsOpen}
        header="Group Green"
        subHeader="You are already a member"
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

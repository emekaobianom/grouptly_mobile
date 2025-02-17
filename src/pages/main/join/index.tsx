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
  IonActionSheet,
  IonLabel,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { add, checkmarkCircle, closeCircle, ellipsisVertical, handLeft, people, personCircleOutline, timer } from 'ionicons/icons';
import { RouteComponentProps, useHistory } from 'react-router';
import { useAtom, useSetAtom } from 'jotai';
import { Group, Member, UserStatus } from '@/store/interface';
import icon from '@/assets/images/icon.png';
import { initializeGroupsAtom } from '@/store/atoms/groupAtoms';
import { deleteGroupAtom, GroupsWithMembersAtom } from '@/store/atoms/memberAtoms';
import { userAtom } from '@/store/atoms/userAtoms';

const MainJoin: React.FC<RouteComponentProps> = ({ match }) => {
  const [user] = useAtom(userAtom);
  const history = useHistory();
  const [actionSheetIsOpen, setActionSheetIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [alertOrangeIsOpen, setAlertOrangeIsOpen] = useState(false);
  const [alertGreenIsOpen, setAlertGreenIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query

  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [deleting, setDeleting] = useState(false);
  const deleteGroup = useSetAtom(deleteGroupAtom);

  const [, initializeGroups] = useAtom(initializeGroupsAtom);

  useEffect(() => {
    initializeGroups(); // Trigger initialization only once
  }, []);

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

  const openActionSheet = (group: Group) => {
    setSelectedGroup(group); // Set the selected group
    setActionSheetIsOpen(true); // Open the ActionSheet
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
            if (m.group?.id == group.id) {
              user_status = m.status;
            }
          });

          return (
            <IonCard
             className='my-card'
              style={{ cursor: 'pointer' }}
              key={index}
            >
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <>
                      <IonCol size="auto"
                        onClick={() => handleGroupClick(group, user_status)}>
                        {group.logo &&
                          <IonImg
                            src={(() => ((group.logo == "default_logo") ? icon : group.logo))()}
                            style={{
                              width: '50px',
                              height: 'auto',
                              objectFit: 'contain',
                              borderRadius: '50%',
                            }}
                          />}
                      </IonCol>
                      <IonCol onClick={() => handleGroupClick(group, user_status)}>
                        <p className="bold-text">{group.long_name}</p>
                        <IonText color="medium">
                          <small>{group.location}</small><br />
                        </IonText>
                        {(group.super_admin_user_id == user?.id) &&
                          <IonChip color="dark">
                            <IonIcon icon={personCircleOutline} />
                            <IonLabel>Admin</IonLabel>
                          </IonChip>
                        }

                      </IonCol>
                    </>
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
                    {
                      (user?.id == group.super_admin_user_id)
                      && <IonCol size="auto">
                        <IonButton fill="clear" onClick={() => group && openActionSheet(group)}>
                          <IonIcon icon={ellipsisVertical} />
                        </IonButton>
                      </IonCol>
                    }
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
      <IonActionSheet
        isOpen={actionSheetIsOpen}
        onDidDismiss={() => setActionSheetIsOpen(false)}
        header={
          deleting
            ? "Leaving group..."
            : selectedGroup?.long_name || "Unknown Group"
        }
        buttons={[
          {
            text: 'Delete this Group',
            role: 'destructive',
            data: { action: 'delete' },
            handler: async () => {
              if (!selectedGroup || !user) return; // Ensure all required fields are defined
              setDeleting(true); // Set the submitting state to true              
              try {
                await deleteGroup(selectedGroup.id || "");
                ///delete this group visually at this point
                // Update the visual state by filtering out the deleted group
                groups.filter(group => group.id !== selectedGroup.id);
                setDeleting(false);
              } catch (error) {
                console.error("Failed to leave group:", error);
                setDeleting(false); // Reset submitting state in case of an error
              }
              return;
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
            data: { action: 'cancel' },
          },
        ]}
      />
    </IonPage>
  );
};

export default MainJoin;

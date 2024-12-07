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
  IonAlert,
  IonHeader,
  IonToolbar,
  IonActionSheet,
  IonSpinner,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { checkmarkCircle, closeCircle, ellipsisVertical, handLeft, timer } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { initializeSelectedGroupAtom, initializeUserAtom, removeMemberAtom, userAtom } from '@/store/store';
import { useAtom, useSetAtom } from 'jotai';
import UserAvatar from '@/components/member/userAvatar';
import { Member, UserStatus, User } from '@/store/interface';
import logoPlaceholder from '@/assets/images/logo_placeholder.png';
import icon from '@/assets/images/icon.png';

const Choose: React.FC = () => {

  const history = useHistory();
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [actionSheetIsOpen, setActionSheetIsOpen] = useState(false);
  const [selectedMembership, setSelectedMember] = useState<Member | null>(null); // Track selected group for ActionSheet

  const [user] = useAtom(userAtom);
  const [, initializeUser] = useAtom(initializeUserAtom);// Atom to initialize user data
  const [, initializeSelectedGroup] = useAtom(initializeSelectedGroupAtom);// Atom to initialize user data

  const removeMember = useSetAtom(removeMemberAtom);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false); // Atom to manage submitting state

  useEffect(() => {
    if (!user) {
      setLoading(false);
      history.replace('/main/login');
    }
  }, [user, history, setLoading]);

  const handleLogOut = async () => {
    setLoading(true);
    try {
      history.replace('/main/login');
    } catch (error) {
      console.error('Failed to log out:', error);
      setLoading(false);
      setAlertIsOpen(true);
    }
  };

  const handleGroupClick = (membership: Member) => {
    initializeSelectedGroup(String(membership.groupId))
    if (membership.status === UserStatus.Active) {
      history.push('/member/dashboard?openMenu=true');
    } else {
      setAlertIsOpen(true);
    }
  };

  const openActionSheet = (member: Member) => {
    setSelectedMember(member); // Set the selected group
    setActionSheetIsOpen(true); // Open the ActionSheet
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <UserAvatar />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid style={{ height: '100%' }}>
          <IonRow style={{ justifyContent: 'space-between', height: '100%' }}>
            <IonCol size="auto">
              <IonText color="dark">
                <h3 className="bold-text">Choose</h3>
                <p className="bold-text ion-no-margin">Tap to enter your group</p>
              </IonText>
            </IonCol>

            <IonCol size="12">
              {user?.memberships && user.memberships.length > 0 ? (
                user.memberships.map((membership: Member) => (
                  <IonCard key={membership.id} style={{ cursor: 'pointer' }}>
                    <IonCardContent className="ion-no-padding">
                      <IonGrid>
                        <IonRow>
                          <IonCol>
                            <IonRow onClick={() => membership.group && handleGroupClick(membership)}>
                              <IonCol size="auto">
                                {membership.group?.logo ? (
                                  <IonImg
                                    src={(() =>
                                      membership.group?.logo === "default_logo" ? icon : membership.group.logo)()}
                                    style={{
                                      width: '50px',
                                      height: 'auto',
                                      objectFit: 'contain',
                                      borderRadius: '50%',
                                    }}
                                  />
                                ) : (
                                  <IonIcon
                                    icon={logoPlaceholder}
                                    className="status-icon"
                                    style={{ color: 'black', fontSize: '18px' }}
                                  />
                                )}
                              </IonCol>
                              <IonCol>
                                <p className="bold-text">{membership.group?.long_name || 'Unknown Group'}</p>
                                <IonText color="medium">
                                  <small>{membership.group?.location || 'Unknown Location'}</small>
                                </IonText>
                                <br />
                                {membership.status === UserStatus.Active && (
                                  <IonIcon icon={checkmarkCircle} style={{ color: 'green', fontSize: '18px' }} />
                                )}
                                {membership.status === UserStatus.Pending && (
                                  <IonIcon icon={timer} style={{ color: 'orange', fontSize: '18px' }} />
                                )}
                                {membership.status === UserStatus.Suspended && (
                                  <IonIcon icon={handLeft} style={{ color: 'blue', fontSize: '18px' }} />
                                )}
                                {membership.status === UserStatus.Rejected && (
                                  <IonIcon icon={closeCircle} style={{ color: 'darkred', fontSize: '18px' }} />
                                )}
                              </IonCol>
                            </IonRow>
                          </IonCol>
                          <IonCol size="auto">
                            <IonButton fill="clear" onClick={() => membership.group && openActionSheet(membership)}>
                              <IonIcon icon={ellipsisVertical} />
                            </IonButton>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                ))
              ) : (
                <IonText>No groups available</IonText>
              )}

            </IonCol>

            <IonCol size="12" style={{ textAlign: 'center' }}>
              <IonButton expand="block" color="light" shape="round" routerLink="/main/join">
                Join or Create Group
              </IonButton>
              <IonButton
                style={{ marginTop: '2rem' }}
                color="light"
                shape="round"
                routerLink="/main/login"
                onClick={handleLogOut}
              >
                Log Out
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonAlert
        isOpen={alertIsOpen}
        header="Group Not Active"
        subHeader="Your Request is still pending"
        message="Once the group admin accepts you, you can enter this group."
        buttons={['Okay']}
        onDidDismiss={() => setAlertIsOpen(false)}
      />

<IonActionSheet
  isOpen={actionSheetIsOpen}
  onDidDismiss={() => setActionSheetIsOpen(false)}
  header={
    deleting
      ? "Leaving group..."
      : selectedMembership?.group?.long_name || "Unknown Group"
  }
  buttons={[
    {
      text: 'Leave this Group',
      role: 'destructive',
      data: { action: 'delete' },
      handler: async () => {
        if (!selectedMembership || !selectedMembership.group || !user) return; // Ensure all required fields are defined
        setDeleting(true); // Set the submitting state to true              
        try {
          console.log("Membership ID:", selectedMembership.id);
          await removeMember(selectedMembership.id);
          await initializeUser(user.id); // Call initialize user atom
          setDeleting(false);
          history.replace("/main/choose");
        } catch (error) {
          console.error("Failed to leave group:", error);
          setDeleting(false); // Reset submitting state in case of an error
        }
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

export default Choose;

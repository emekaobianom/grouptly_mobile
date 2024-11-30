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
import { checkmarkCircle, closeCircle, ellipsisVertical, handLeft, people, timer } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { setItem } from '@/utils/storage';
import { initializeUserAtom, removeUserGroupAtom, userAtom } from '@/store/store';
import { useAtom, useSetAtom } from 'jotai';
import UserAvatar from '@/components/member/userAvatar';
import { UserGroup, UserStatus } from '@/store/interface';
import logoPlaceholder from '@/assets/images/logo_placeholder.png';

const Choose: React.FC = () => {

  const history = useHistory();
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [actionSheetIsOpen, setActionSheetIsOpen] = useState(false);
  const [selectedUserGroup, setSelectedUserGroup] = useState<UserGroup | null>(null); // Track selected group for ActionSheet

  const [user] = useAtom(userAtom);
  const [, initializeUser] = useAtom(initializeUserAtom);// Atom to initialize user data
  const removeUserGroup = useSetAtom(removeUserGroupAtom);
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

  const handleGroupClick = (usergroup: UserGroup) => {
    setItem('selectedGroup', usergroup.group);
    if (usergroup.user_status === UserStatus.Active) {
      history.push('/member/dashboard?openMenu=true');
    } else {
      setAlertIsOpen(true);
    }
  };

  const openActionSheet = (usergroup: UserGroup) => {
    setSelectedUserGroup(usergroup); // Set the selected group
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
              {user?.groups && user.groups.length > 0 ? (
                user.groups.map((usergroup) => (
                  <IonCard key={usergroup.id} style={{ cursor: 'pointer' }}>
                    <IonCardContent className="ion-no-padding">
                      <IonGrid>
                        <IonRow>
                          <IonCol>
                            <IonRow onClick={() => handleGroupClick(usergroup)}>
                              <IonCol size="auto">
                                {usergroup.group.logo ? (
                                  <IonImg
                                    src={usergroup.group.logo}
                                    style={{
                                      width: '50px',
                                      height: 'auto',
                                      objectFit: 'contain',
                                      borderRadius: '50%',
                                    }}
                                    onIonImgDidLoad={() => {
                                      console.log('Image loaded successfully');
                                    }}
                                    onIonError={(e: any) => {
                                      console.log('Failed to load image, setting fallback');
                                      e.currentTarget.src = logoPlaceholder; // Replace with fallback
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
                                <p className="bold-text">{usergroup.group.long_name}</p>
                                <IonText color="medium">
                                  <small>{usergroup.group.location}</small>
                                </IonText>
                                <br />
                                {usergroup.user_status === UserStatus.Active && (
                                  <IonIcon icon={checkmarkCircle} style={{ color: 'green', fontSize: '18px' }} />
                                )}
                                {usergroup.user_status === UserStatus.Pending && (
                                  <IonIcon icon={timer} style={{ color: 'orange', fontSize: '18px' }} />
                                )}
                                {usergroup.user_status === UserStatus.Suspended && (
                                  <IonIcon icon={handLeft} style={{ color: 'blue', fontSize: '18px' }} />
                                )}
                                {usergroup.user_status === UserStatus.Rejected && (
                                  <IonIcon icon={closeCircle} style={{ color: 'darkred', fontSize: '18px' }} />
                                )}
                              </IonCol>
                            </IonRow>
                          </IonCol>
                          <IonCol size="auto">
                            <IonButton fill="clear" onClick={() => openActionSheet(usergroup)}>
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
        onDidDismiss={() => setActionSheetIsOpen(false)

        }header={deleting ? "Deleting..." : selectedUserGroup?.group.long_name} 
        buttons={[
          {
            text: 'Delete',
            role: 'destructive',
            data: { action: 'delete' },
            handler: async() => {
              if(selectedUserGroup==null)return;
              setDeleting(true); // Set the submitting state to true              
              try { console.log("id ",selectedUserGroup)
                await removeUserGroup(selectedUserGroup.id);
                await initializeUser(); // Call initialize user atom
                setDeleting(false);
                history.replace("/main/choose");
              } catch (error) {
                console.error("Failed to initialize create:", error);
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

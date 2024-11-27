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
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { checkmarkCircle, closeCircle, handLeft, people, timer } from 'ionicons/icons';
import { useState, useEffect, useMemo } from 'react';
import { setItem } from '@/utils/storage';
import { userGroupsAtom, Group, UserStatus, logoutUserAtom, userAtom, loadingAtom } from '@/store/store';
import { useAtom } from 'jotai';
import UserAvatar from '@/components/member/userAvatar';

const Choose: React.FC = () => {
  const history = useHistory();
  const [alertIsOpen, setAlertIsOpen] = useState(false);


  // Access Jotai atoms    
  const [user] = useAtom(userAtom); // Atom containing user data
  const [loading, setLoading] = useAtom(loadingAtom); // Atom to manage loading state
  const [userGroups] = useAtom(userGroupsAtom);

  console.log(userGroups);

  // Monitor the user state
  useEffect(() => {
    if (!user) {
      history.replace('/main/login');
    }
  }, [user, setLoading]);

  // Handle the login button click
  const handleLogOut = async () => {
    setLoading(true); // Set the loading state to true
    try {
      history.replace('/main/login');
      //await logoutUser(); // Call initialize user atom
    } catch (error) {
      console.error("Failed to initialize user:", error);
      setLoading(false); // Reset loading state in case of an error
    }
  };


  // Handle group selection
  const handleGroupClick = (group: Group) => {
    setItem('selectedGroup', group); // Save selected group in storage
    if (group.user_status === UserStatus.Active) {
      // Redirect if group is active
      history.push('/member/dashboard?openMenu=true');
    } else {
      // Show alert if group is inactive
      setAlertIsOpen(true);
    }
  };

  return (
    <IonPage>
      {/* Header */}
      <IonHeader className='header'>
        <IonToolbar class='toolbar'>
          <UserAvatar />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid style={{ height: '100%' }}>
          <IonRow style={{ justifyContent: 'space-between', height: '100%' }}>
            {/* Header Section */}
            <IonCol size="auto">
              <IonText color="dark">
                <h3 className="bold-text">Choose</h3>
                <p className="bold-text ion-no-margin">
                  Tap to enter your group
                </p>
              </IonText>
            </IonCol>

            {/* Display List of User's Groups */}
            <IonCol size="12">
              {userGroups.map((group) => (
                <IonCard
                  onClick={() => handleGroupClick(group)}
                  style={{ cursor: 'pointer' }}
                  key={group.id}
                >
                  <IonCardContent>
                    <IonGrid>
                      <IonRow>
                        {/* Display Group Logo or Default Icon */}
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
                            <IonIcon
                              icon={people}
                              className="status-icon"
                              style={{ color: 'black', fontSize: '24px' }}
                            />
                          )}
                        </IonCol>

                        {/* Group Name and Location */}
                        <IonCol>
                          <p className="bold-text">{group.long_name}</p>
                          <IonText color="medium">
                            <small>{group.location}</small>
                          </IonText>
                        </IonCol>

                        {/* Status Indicator */}
                        <IonCol size="auto">
                          {(group.user_status === UserStatus.Active) && (
                            <IonIcon
                              icon={checkmarkCircle}
                              style={{ color: 'slate', fontSize: '24px' }}
                            />
                          )}
                          {(group.user_status === UserStatus.Pending) && (
                            <IonIcon
                              icon={timer}
                              style={{ color: 'slate', fontSize: '24px' }}
                            />
                          )}
                          {(group.user_status === UserStatus.Suspended) && (
                            <IonIcon
                              icon={handLeft}
                              style={{ color: 'slate', fontSize: '24px' }}
                            />
                          )}
                          {(group.user_status === UserStatus.Rejected) && (
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
              ))}
            </IonCol>

            {/* Action Buttons */}
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
                routerLink="/main/login"
                onClick={handleLogOut}
              >
                Log Out
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      {/* Alert for Inactive Group Status */}
      <IonAlert
        isOpen={alertIsOpen}
        header="Group Not Active"
        subHeader="Your Request is still pending"
        message="Once the group admin accepts you, you can enter this group."
        buttons={['Okay']}
        onDidDismiss={() => setAlertIsOpen(false)}
      />
    </IonPage>
  );
};

export default Choose;

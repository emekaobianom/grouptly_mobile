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
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { checkmarkCircle, people } from 'ionicons/icons';
import { useState, useEffect, useMemo } from 'react';
import { setItem } from '@/utils/storage';
import { userGroupsAtom, Group } from '@/store/store';
import { useAtom } from 'jotai';

const Choose: React.FC = () => {
  const history = useHistory();
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  
// Access user's groups from the atom
  const [userGroups] = useAtom(userGroupsAtom); 

  // Handle group selection
  const handleGroupClick = (group: Group) => {
    setItem('selectedGroup', group); // Save selected group in storage
    if (group.status === 'Active') {
      // Redirect if group is active
      history.push('/member/dashboard?openMenu=true');
    } else {
      // Show alert if group is inactive
      setAlertIsOpen(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid style={{ height: '100%' }}>
          <IonRow style={{ justifyContent: 'space-between', height: '100%' }}>
            {/* Header Section */}
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
                          <IonIcon
                            icon={checkmarkCircle}
                            className={`status-icon ${group.status === 'Active' ? 'status-active' : 'status-inactive'}`}
                          />
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

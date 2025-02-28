import React, { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonText,
  IonButton,
  IonPopover,
  IonItem,
  IonList,
  IonAlert,
  IonLabel,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { chevronForward, ellipsisVertical, heart } from 'ionicons/icons';
import { inboxItemsData } from '@/data/inbox_placeholder';

// Adjust the type for a single donation item to reflect the actual data
interface InboxItem {
  id: number; // Change this from string to number to match your data,
  name: string;
  message: string;
  note: string;
  time: string;
  unread: boolean,
}

interface MemberInboxDetailProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const MemberInboxDetail: React.FC<MemberInboxDetailProps> = ({ match }) => {
  const [item, setItem] = useState<InboxItem | null>(null);

  const [showAlert, setShowAlert] = useState(false); // State to control the alert visibility

  const handleAlert = () => {
    setShowAlert(true); // Show the alert when the button is clicked
  };

  useEffect(() => {
    // Convert match.params.id to a number, since donationsItemsData uses numeric ids
    const id = Number(match.params.id);
    const foundItem = inboxItemsData.find((data) => data.id === id);
    setItem(foundItem || null);
  }, [match.params.id]);

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref='/member/inbox' />
          </IonButtons>
          {item ? (
            <IonTitle>{item.name}</IonTitle>
          ) : (
            <IonTitle>Inbox</IonTitle>
          )}

          <IonButtons slot="end">
            <IonButton id="click-trigger" >
              <IonIcon icon={ellipsisVertical} />
            </IonButton>
            <IonPopover trigger="click-trigger" dismissOnSelect={true}>
              <IonContent class="ion-padding">
                <IonList lines="none">
                  <IonItem>
                    <IonLabel onClick={handleAlert}>
                      Delete
                    </IonLabel>
                  </IonItem>
                </IonList>

              </IonContent>
            </IonPopover>

          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">
        {/* Only render the card if `item` is not null */}
        {item ? (
          <IonCard key={item.id} className="ion-margin-bottom">
            <IonCardContent>
              <div className="card-text-icon">
                <IonText>{item.message}</IonText>
                <IonIcon style={{ fontSize: 60 }} icon={heart} />
              </div>
            </IonCardContent>
          </IonCard>
        ) : (
          <IonText>No item found</IonText>
        )}
        {/* IonAlert component */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => { setShowAlert(false) }} // Hide alert when dismissed
          message={'Delete this Inbox?'}
          buttons={['CANCEL', 'DELETE']} // Button to dismiss the alert
        />
      </IonContent>
    </IonPage>
  );
};

export default MemberInboxDetail;

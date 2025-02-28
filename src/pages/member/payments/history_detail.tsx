import React, { useEffect, useState } from 'react';
import {
  IonButtons,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonCard,
  IonCardContent,
  IonIcon,
  IonText,
  IonButton,
  IonPopover,
  IonItem,
  IonList,
  IonAlert,
  IonLabel,
  IonBackButton,
} from '@ionic/react';
import { RouteComponentProps, useHistory } from 'react-router-dom'; // Import useHistory
import { arrowBack, ellipsisVertical, heart } from 'ionicons/icons';
import { inboxItemsData } from '@/data/inbox_placeholder';

// Adjust the type for a single donation item to reflect the actual data
interface InboxItem {
  id: number;
  name: string;
  message: string;
  note: string;
  time: string;
  unread: boolean;
}

interface MemberPaymentsHistoryDetailProps extends RouteComponentProps<{ id: string }> {}

const MemberPaymentsHistoryDetail: React.FC<MemberPaymentsHistoryDetailProps> = ({ match }) => {
  const [item, setItem] = useState<InboxItem | null>(null);
  const [showAlert, setShowAlert] = useState(false); // State to control the alert visibility
  const history = useHistory(); // Initialize useHistory to control manual navigation

  const handleAlert = () => {
    setShowAlert(true); // Show the alert when the button is clicked
  };

  const handleBack = () => {
    history.replace("/member/payments/history"); // Manually navigate back
    
  };

  useEffect(() => {
    const id = Number(match.params.id);
    const foundItem = inboxItemsData.find((data) => data.id === id);
    setItem(foundItem || null);
  }, [match.params.id]);

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref='/member/payments/history'  />            
          </IonButtons>
          {item ? <IonTitle>{item.name}</IonTitle> : <IonTitle>Transaction</IonTitle>}

          <IonButtons slot="end">
            <IonButton id="click-trigger">
              <IonIcon icon={ellipsisVertical} />
            </IonButton>
            <IonPopover trigger="click-trigger" dismissOnSelect={true}>
              <IonContent class="ion-padding">
                <IonList lines="none">
                  <IonItem>
                    <IonLabel onClick={handleAlert}>Delete</IonLabel>
                  </IonItem>
                </IonList>
              </IonContent>
            </IonPopover>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">
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
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          message={'Delete this Inbox?'}
          buttons={['CANCEL', 'DELETE']}
        />
      </IonContent>
    </IonPage>
  );
};

export default MemberPaymentsHistoryDetail;

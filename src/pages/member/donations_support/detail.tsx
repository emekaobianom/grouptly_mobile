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
import { donationsItemsData } from '@/data/donations_placeholder';

// Adjust the type for a single donation item to reflect the actual data
interface DonationItem {
  id: number; // Change this from string to number to match your data
  title: string;
  reason: string;
}

interface MemberDonationsSupportDetailProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const MemberDonationsSupportDetail: React.FC<MemberDonationsSupportDetailProps> = ({ match }) => {
  const [item, setItem] = useState<DonationItem | null>(null);

  const [showAlert, setShowAlert] = useState(false); // State to control the alert visibility

  const handleAlert = () => {
    setShowAlert(true); // Show the alert when the button is clicked
  };

  useEffect(() => {
    // Convert match.params.id to a number, since donationsItemsData uses numeric ids
    const id = Number(match.params.id);
    const foundItem = donationsItemsData.find((data) => data.id === id);
    setItem(foundItem || null);
  }, [match.params.id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Donation</IonTitle>
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
            <IonCardHeader className="card-header">
              <IonCardTitle>{item.title}</IonCardTitle>
              {/* <IonIcon icon={chevronForward} /> */}
            </IonCardHeader>
            <IonCardContent>
              <div className="card-text-icon">
                <IonText>{item.reason}</IonText>
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
          message={'Delete this Donation?'}
          buttons={['CANCEL', 'DELETE']} // Button to dismiss the alert
        />
      </IonContent>
    </IonPage>
  );
};

export default MemberDonationsSupportDetail;

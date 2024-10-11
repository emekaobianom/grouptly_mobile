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
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { chevronForward, ellipsisVertical, heart } from 'ionicons/icons';
import { donationsItemsData } from '@/data/donations_placeholder';

interface DonationItem {
  id: number;
  title: string;
  reason: string;
}

interface AdminDonationsSupportDetailProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const AdminDonationsSupportDetail: React.FC<AdminDonationsSupportDetailProps> = ({ match }) => {
  const history = useHistory();
  const [item, setItem] = useState<DonationItem | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleAlert = () => setShowAlert(true);

  useEffect(() => {
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
            <IonButton id="click-trigger">
              <IonIcon icon={ellipsisVertical} />
            </IonButton>
            <IonPopover trigger="click-trigger" dismissOnSelect={true}>
              <IonList class="ion-padding-none">
                <IonItem onClick={() => { if (item) { history.push(`/admin/donations-support/edit/${item.id}`) } }}>
                  <IonLabel>Edit</IonLabel>
                </IonItem>
                <IonItem onClick={handleAlert}>
                  <IonLabel>Delete</IonLabel>
                </IonItem>
              </IonList>
            </IonPopover>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">
        {item ? (
          <IonCard className="ion-margin-bottom">
            <IonCardHeader className="card-header">
              <IonCardTitle>{item.title}</IonCardTitle>
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
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          message={'Delete this Donation?'}
          buttons={[
            'CANCEL',
            {
              text: 'DELETE',
              handler: () => {
                // Add delete logic here
                console.log('Donation deleted');
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default AdminDonationsSupportDetail;

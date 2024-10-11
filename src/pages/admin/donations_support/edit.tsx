import React, { useEffect, useState } from 'react';
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonIcon,
  IonText,
  IonInput,
  IonItem,
  IonTextarea,
} from '@ionic/react';
import { close, ellipsisVertical } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router-dom';
import { donationsItemsData } from '@/data/donations_placeholder';

interface DonationItem {
  id: number; // Change this from string to number to match your data
  title: string;
  reason: string;
}

interface AdminDonationsSupportEditProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const AdminDonationsSupportEdit: React.FC<AdminDonationsSupportEditProps> = ({ history,match }) => {
  const handleClose = () => {
    history.goBack(); // Or any custom navigation logic, like closing a modal
  };
  const [item, setItem] = useState<DonationItem | null>(null);

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
            {/* Custom close button with 'close' icon */}
            <IonButton onClick={handleClose}>
              <IonIcon icon={close} size="large" />
            </IonButton>
          </IonButtons>
          {/* <IonTitle>Edit Donations & Support</IonTitle> */}
          <IonButtons slot="end">
            {/* Custom close button with 'close' icon */}
            <IonButton onClick={handleClose}>
              <IonText color={'tertiary'} >Update</IonText>
            </IonButton>
            {/* <IonButton onClick={handleClose}>
              <IonIcon icon={ellipsisVertical} />
            </IonButton> */}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonText>
          <h1>Edit Donations & Support</h1>
        </IonText>
        <IonInput label="Title"
          labelPlacement="stacked"
          counter={true} maxlength={50}
          value={item && item.title}
          placeholder="e.g Mark John's wedding support"
        ></IonInput>

        <IonTextarea
          rows={8}
          label="Purpose" labelPlacement="stacked"
          placeholder="Enter a convincing reason for this donation"
          value={item && item.reason}
          counter={true}
          maxlength={300}
          counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}
        ></IonTextarea>


      </IonContent>
    </IonPage>
  );
};

export default AdminDonationsSupportEdit;

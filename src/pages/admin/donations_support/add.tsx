import React from 'react';
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

interface AdminDonationsSupportAddProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const AdminDonationsSupportAdd: React.FC<AdminDonationsSupportAddProps> = ({ history }) => {
  const handleClose = () => {
    history.goBack(); // Or any custom navigation logic, like closing a modal
  };

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
          {/* <IonTitle>Add Donations & Support</IonTitle> */}
          <IonButtons slot="end">
            {/* Custom close button with 'close' icon */}
            <IonButton onClick={handleClose}>
              <IonText color={'tertiary'} >Save</IonText>
            </IonButton>
            {/* <IonButton onClick={handleClose}>
              <IonIcon icon={ellipsisVertical} />
            </IonButton> */}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonText>
          <h1>Add Donations & Support</h1>
        </IonText>
        <IonInput label="Title"
          labelPlacement="stacked"
          counter={true} maxlength={50}
          placeholder="e.g Mark John's wedding support"
        ></IonInput>

        <IonTextarea
          rows={8}
          label="Purpose" labelPlacement="stacked"
          placeholder="Enter a convincing reason for this donation"
          counter={true}
          maxlength={300}
          counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}
        ></IonTextarea>


      </IonContent>
    </IonPage>
  );
};

export default AdminDonationsSupportAdd;

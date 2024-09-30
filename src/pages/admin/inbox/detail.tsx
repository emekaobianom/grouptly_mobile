import React from 'react';
import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonNavLink,
  IonToolbar,
  IonTitle,
  IonPage,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';

interface AdminInboxDetailProps
  extends RouteComponentProps<{
    id: string;
  }> {}
const AdminInboxDetail: React.FC<AdminInboxDetailProps> = ({match}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>New Member {match.params.id}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <h1>Page Two</h1>
        
      </IonContent>
    </IonPage>
  );
}

export default AdminInboxDetail;
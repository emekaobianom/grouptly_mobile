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

interface MainJoinDetailProps
  extends RouteComponentProps<{
    id: string;
  }> {}
const MainJoinDetail: React.FC<MainJoinDetailProps> = ({match}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Page Two {match.params.id}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <h1>Page Two</h1>
        
      </IonContent>
    </IonPage>
  );
}

export default MainJoinDetail;
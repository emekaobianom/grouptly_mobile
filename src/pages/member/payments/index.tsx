import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, IonRow, IonCol, IonText, IonButton } from '@ionic/react';
import './payments.css'; // Assuming you want custom styles for this page
import SideMenuBtn from '@/components/sideMenuBtn';

const MemberPayments: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Payments</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Amount to pay section */}
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <div className="amount-to-pay-container">
                <p>Amount to pay</p>
                <h2>₦25,600</h2>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* To Pay and History Tabs */}
        <IonGrid className="tabs-container">
          <IonRow>
            <IonCol className="ion-text-center">
              <IonText>To Pay</IonText>
            </IonCol>
            <IonCol className="ion-text-center">
              <IonButton color="medium" size="small" fill="outline">History</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Donation Card */}
        <IonCard className="donation-card">
          <IonCardHeader>
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <IonCardSubtitle>
                    <span role="img" aria-label="donation">❤️ Donation</span>
                  </IonCardSubtitle>
                </IonCol>
                <IonCol size="6" className="ion-text-right">
                  <IonText color="medium">Created 8 Nov/23</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardHeader>

          <IonGrid className="ion-padding-start ion-padding-end">
            <IonRow>
              <IonCol size="12">
                <IonCardTitle>Purchase of Generator</IonCardTitle>
                <IonText>
                  <h1>₦2,500,000</h1>
                </IonText>
                <IonButton fill="clear" color="primary" className="pledge-button">
                  Pledge →
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
      </IonContent>
      <SideMenuBtn />
    </IonPage>
  );
};

export default MemberPayments;

import { IonAvatar, IonBackButton, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRouterOutlet, IonRow, IonTabBar, IonTabButton, IonTabs, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import MemberPaymentsHistory from './history';
import './payments.css';
import MemberPaymentsHistoryDetail from './history_detail';
import SideMenuBtn from '@/components/sideMenuBtn';
import { time, wallet } from 'ionicons/icons';
import UserAvatar from '@/components/main/userAvatar';

const MemberPayments: React.FC<RouteComponentProps> = ({ match }) => {

  return (
    <>     

      <IonPage>
        <IonHeader>
        <IonToolbar>
            <IonTitle>To Pay</IonTitle>
            <UserAvatar/>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">

          <IonCard style={{ height: "200px" }}>
            <IonCardContent>
              <IonRow>
                <IonCol size='12' className='ion-align-items-end'>
                  <IonLabel className="item-amount">Amount to Pay</IonLabel>
                  <IonText color="medium">
                    <p>Donation Pledge (you have paid ₦10,000)</p>
                  </IonText>
                  <IonLabel className="item-left-to-pay">₦15,000 Left to Pay</IonLabel>
                </IonCol>
                <IonCol size='12' className='ion-align-items-end'>
                  <IonButton shape="round" routerLink='/member/payments/history'>
                    <IonIcon slot="start" icon={time} />
                    History
                  </IonButton>
                </IonCol>
              </IonRow>

            </IonCardContent>
          </IonCard>


          <IonCard className="pay-card">
            <IonCardContent>
              <IonLabel className="item-amount">₦25,000</IonLabel>
              <IonText color="medium">
                <p>Donation Pledge (you have paid ₦10,000)</p>
              </IonText>
              <IonLabel className="item-left-to-pay">₦15,000 Left to Pay</IonLabel>
              <IonText color="secondary">
                <p>PAY-ITEM-ID : MEET8823</p>
              </IonText>
            </IonCardContent>
          </IonCard>

          <IonCard className="pay-card">
            <IonCardContent>
              <IonLabel className="item-amount">₦25,000</IonLabel>
              <IonText color="medium">
                <p>Donation Pledge (you have paid ₦10,000)</p>
              </IonText>
              <IonLabel className="item-left-to-pay">₦15,000 Left to Pay</IonLabel>
              <IonText color="secondary">
                <p>PAY-ITEM-ID : MEET8823</p>
              </IonText>
            </IonCardContent>
          </IonCard>

          <IonCard className="pay-card">
            <IonCardContent>
              <IonText color="medium">
                <p>Building Fund 2024</p>
              </IonText>
              <IonLabel className="item-left-to-pay">₦15,000</IonLabel>
              <IonText color="secondary">
                <p>PAY-ITEM-ID : MEET4523</p>
              </IonText>
            </IonCardContent>
          </IonCard>
        </IonContent>
        <SideMenuBtn />
      </IonPage>
    </>
  );
};

export default MemberPayments;



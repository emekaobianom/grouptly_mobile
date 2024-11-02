import { IonContent, IonPage, IonRefresher, IonRefresherContent, IonList, IonItem, IonLabel, IonText, IonNote, IonIcon, IonRouterOutlet, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonAvatar, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { calendar, chevronForward, heart } from 'ionicons/icons';
import { Route, RouteComponentProps } from 'react-router';
import './donations.css';
import SideMenuBtn from '../../../components/sideMenuBtn';
import { donationsItemsData } from '@/data/donations_placeholder';
import MemberDonationsSupportDetail from './detail';
import UserAvatar from '@/components/member/userAvatar';

const MemberDonationsSupport: React.FC<RouteComponentProps> = ({ match }) => {

  // Handle pull-to-refresh event
  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  const donationsItems = donationsItemsData;

  const renderDonationsSupportItem = (item: any) => (
    <IonCard routerLink={`/member/donations-support/detail/${item.id}`} key={item.id} className='ion-margin-bottom'>
      
      <IonCardContent>
        <div className='card-text-icon'>
          <div>
            <IonText style={{ fontSize: 16 }}>
              {item.title}
            </IonText>
            <br />
            <IonText style={{ fontSize: 30 }}>
              N{item.amount}
            </IonText>
            <br />
            <IonText>
              {item.reason}
            </IonText>
          </div>
          <div className='card-icon-right'>
            <IonIcon className="ion-margin-bottom" icon={chevronForward} />
            <IonIcon style={{ fontSize: 30 }} icon={heart} />
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );

  return (
    <>
      <IonRouterOutlet>
        <Route path={`${match.url}/detail/:id`} component={MemberDonationsSupportDetail} exact />
      </IonRouterOutlet>

      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Donations & Support</IonTitle>
            <UserAvatar/>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent />
          </IonRefresher>

          <div className='ion-padding'>
            {donationsItems.map(renderDonationsSupportItem)}
          </div>

          {/* Spacer for bottom padding */}
          <div style={{ marginBottom: 80 }}></div>
        </IonContent>

        <SideMenuBtn />
      </IonPage>
    </>
  );
};

export default MemberDonationsSupport;

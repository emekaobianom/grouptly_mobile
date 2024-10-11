import { IonContent, IonPage, IonRefresher, IonRefresherContent, IonList, IonItem, IonLabel, IonText, IonNote, IonIcon, IonRouterOutlet, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonAvatar, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { calendar, chevronForward, heart } from 'ionicons/icons';
import { Route, RouteComponentProps } from 'react-router';
import './donations.css';
import SideMenuBtn from '../../../components/sideMenuBtn';
import { donationsItemsData } from '@/data/donations_placeholder';
import MemberDonationsSupportDetail from './detail';

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
    <IonCardHeader className="card-header">
      <IonCardTitle>{item.title}</IonCardTitle>
      <IonIcon icon={chevronForward} />
    </IonCardHeader>
    <IonCardContent>
      <div className='card-text-icon'>
        <IonText>
          {item.reason}
        </IonText>
        <IonIcon style={{ fontSize: 60 }} icon={heart} />
      </div>
    </IonCardContent>
  </IonCard>
  );

  return (
    <>
      <IonRouterOutlet>
        <Route path={`${match.url}/detail/:id`} component={MemberDonationsSupportDetail} exact/>
      </IonRouterOutlet>

      <IonPage>
      <IonHeader>
       <IonToolbar>
            <IonTitle>Donations & Support</IonTitle>
            <IonAvatar slot='end' className='ion-padding'>
              <img src="https://randomuser.me/api/portraits/men/9.jpg" alt="me" />
            </IonAvatar>
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

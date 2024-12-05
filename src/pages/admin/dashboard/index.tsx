import React, { useEffect } from 'react';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonPage,
  IonButton,
  IonIcon,
  IonAvatar,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCardContent,
  IonLabel,
} from '@ionic/react';
import './dashboard.css';
import { calendarOutline, cardOutline, chevronForward, heartOutline, informationCircleOutline, mailOutline, newspaperOutline, people } from 'ionicons/icons';
import UserAdminAvatar from '@/components/admin/userAvatar';

const AdminDashboard: React.FC = () => {
  const buttons = [
    { name: 'Inbox', path: '/admin/inbox', icon: mailOutline },
    { name: 'Events', path: '/admin/events', icon: calendarOutline },
    { name: "Members", path: "/admin/members", icon: people },
    { name: 'Donations', path: '/admin/donations', icon: heartOutline },
    { name: 'Payments', path: '/admin/payments', icon: cardOutline },
    { name: 'About', path: '/admin/about', icon: informationCircleOutline },
    { name: 'News', path: '/admin/news', icon: newspaperOutline },
  ];
  

  
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }

  return (
    <IonPage>
      {/* Header */}
      <IonHeader className='header'>
        <IonToolbar class='toolbar'>
          <UserAdminAvatar/>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

       <IonButton
          fill="outline"
          shape="round"
          color="dark"
          routerLink="/member/dashboard?openMenu=true"
          style={{ margin: '16px' }}
        >
          <IonIcon icon={chevronForward} slot="start" />
          My Account
        </IonButton>

        {/* test */}
        <IonGrid className='ion-margin-bottom'>
          {buttons.map((button, index) => (
            <IonRow key={index}>
              {/* Display 2 columns per row */}
              {buttons.slice(index * 2, index * 2 + 2).map((btn, colIndex) => (
                <IonCol size="6" key={colIndex} style={{ padding: '4px' }}>
                  <IonCard button routerLink={btn.path} style={{ margin: '0', textAlign: 'center' }}>
                    <IonCardContent>
                      <IonLabel>
                        <h2 style={{ fontSize: '1.2em', marginBottom: '8px' }}>{btn.name}</h2>
                        {/* Icon below the name */}
                        <IonIcon icon={btn.icon} style={{ fontSize: '2em' }} />
                      </IonLabel>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          ))}
        </IonGrid>

        <div style={{ marginBottom: 80 }}></div>
      </IonContent>

      {/* <SideMenuBtn /> */}
    </IonPage>
  );
};

export default AdminDashboard;

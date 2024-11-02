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
import { useHistory, useLocation } from 'react-router-dom';
import { menuController } from '@ionic/core/components';
import SideMenuBtn from '../../../components/sideMenuBtn';
import './dashboard.css';
import { calendarOutline, cardOutline, chevronForward, heartOutline, informationCircleOutline, mailOutline, newspaperOutline } from 'ionicons/icons';

const AdminDashboard: React.FC = () => {
  const buttons = [
    { name: 'Inbox', path: '/admin/inbox', icon: mailOutline },
    { name: 'Events', path: '/admin/events', icon: calendarOutline },
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
          <p  slot='end'>Admin</p>
          <IonAvatar slot='end' className='ion-padding'>
            <img src="https://randomuser.me/api/portraits/men/9.jpg" alt="me" />
          </IonAvatar>
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

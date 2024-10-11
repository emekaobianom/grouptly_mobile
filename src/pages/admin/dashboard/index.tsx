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
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { menuController } from '@ionic/core/components';
import SideMenuBtn from '../../../components/sideMenuBtn';
import './dashboard.css';

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  // Extract the query parameter
  const searchParams = new URLSearchParams(location.search);
  const openMenu = searchParams.get('openMenu'); // Gets the 'openMenu' query parameter

  useEffect(() => {
    if (openMenu) {
      // Remove the 'openMenu' parameter from the URL only after component has mounted
      searchParams.delete('openMenu');
      history.replace({
        pathname: location.pathname,
        search: searchParams.toString(),
      });

      openMenuManually();
    }
  }, [openMenu, history, location.pathname, searchParams]);

  async function openMenuManually() {
    await menuController.open('main-menu');
  }

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {/* Full width card for attendance */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Attendance</IonCardTitle>
          </IonCardHeader>
          <div className="card-content">
            <h2>Total Attendance: 45</h2>
          </div>
        </IonCard>

        {/* Two side-by-side cards for debt and payment */}
        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol size="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Debt Owed</IonCardTitle>
                </IonCardHeader>
                <div className="card-content">
                  <h2>$500</h2>
                </div>
              </IonCard>
            </IonCol>

            <IonCol size="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Amount Paid This Year</IonCardTitle>
                </IonCardHeader>
                <div className="card-content">
                  <h2>$300</h2>
                </div>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Full width card for News and Events */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>News & Upcoming Events</IonCardTitle>
          </IonCardHeader>
          <div className="card-content">
            <h2>Club Meeting on Friday</h2>
            <p>Stay tuned for more updates on upcoming events!</p>
          </div>
        </IonCard>

        <div style={{ marginBottom: 80 }}></div>
      </IonContent>

      <SideMenuBtn />
    </IonPage>
  );
};

export default AdminDashboard;

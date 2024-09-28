import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonAvatar, IonFooter, IonItem, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import './dashboard.css';
import { useHistory } from 'react-router-dom';
import { menuController } from '@ionic/core/components';
import { useLocation } from 'react-router-dom';
import SideMenuBtn from '@/components/sideMenuBtn';


const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  // Using URLSearchParams to extract the query parameter
  const searchParams = new URLSearchParams(location.search);
  const openMenu = searchParams.get('openMenu'); // Gets the 'openMenu' query parameter

  // Once we get the openMenu parameter, remove it from the URL
  if (openMenu) {
    // Remove the 'openMenu' parameter from the URL
    searchParams.delete('openMenu');
    history.replace({
      pathname: location.pathname,
      search: searchParams.toString() // This will update the URL without 'openMenu'
    });
  }

  useEffect(() => {
    if (openMenu) {
      openMenuManually();
    }
  }, [openMenu]); // Added dependency array

  async function openMenuManually() {
    /**
     * Open the menu by menu-id
     * We refer to the menu using an ID
     * because multiple "start" menus exist.
     */
    await menuController.open('main-menu');
  }

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }

  return (
    <>

      <IonPage>
        {/* Header with User Image */}
        {/* <IonHeader>
          <IonToolbar>
            <IonTitle>Dashboaord</IonTitle>
            <IonAvatar slot="end" className="user-avatar">
              <img src="https://via.placeholder.com/100" alt="User" />
            </IonAvatar>
          </IonToolbar>
        </IonHeader> */}

        {/* Content */}
        <IonContent className="ion-padding">
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent></IonRefresherContent>
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
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>News & Upcoming Events</IonCardTitle>
            </IonCardHeader>
            <div className="card-content">
              <h2>Club Meeting on Friday</h2>
              <p>Stay tuned for more updates on upcoming events!</p>
            </div>
          </IonCard>
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
      {/* <BottomTabs/> */}
    </>
  );
};

export default AdminDashboard;



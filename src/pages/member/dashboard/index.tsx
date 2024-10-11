import React, { useEffect, useState } from 'react';
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
  IonImg,
  IonIcon,
  IonCardContent,
  IonText,
  useIonViewWillEnter,
  IonAvatar,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { menuController } from '@ionic/core/components';
import SideMenuBtn from '../../../components/sideMenuBtn';
import './dashboard.css';
import { getItem } from '@/utils/storage';
import { arrowForwardOutline, calendar, chevronForward } from 'ionicons/icons';

const MemberDashboard: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [group, setGroup] = useState<any>(null);

  // Extract the query parameter
  const searchParams = new URLSearchParams(location.search);
  const openMenu = searchParams.get('openMenu'); // Gets the 'openMenu' query parameter

  useEffect(() => {

    // Function to get selected group asynchronously
    const fetchGroup = async () => {
      try {
        const selectedGroup = await getItem("selectedGroup"); // Await if getItem is async
        setGroup(selectedGroup);
      } catch (error) {
        console.error("Error fetching group:", error);
      }
    };

    fetchGroup();

  }, []);


  useIonViewWillEnter(() => {
    if (openMenu) {
      // Remove the 'openMenu' parameter from the URL only after component has mounted
      searchParams.delete('openMenu');
      history.replace({
        pathname: location.pathname,
        search: searchParams.toString(),
      });

      openMenuManually();
    }
  });


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
    <IonPage className='dashboard'>
      {/* Header */}
      <IonHeader className='header'>
        <IonToolbar class='toolbar'>
          <IonAvatar slot='end' className='ion-padding'>
            <img src="https://randomuser.me/api/portraits/men/9.jpg" alt="me" />
          </IonAvatar>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {/* photo */}
        <IonRow style={{ marginTop: "20px" }} className="ion-justify-content-center ion-align-items-center">
          <IonCol size="auto">
            <div style={{ width: 150, height: 150 }} className="circle-image-container">
              <IonImg
                src="https://c8.alamy.com/comp/PG95YW/young-african-american-man-holding-canadian-passport-doing-ok-sign-with-fingers-excellent-symbol-PG95YW.jpg"  // Replace with your image URL
                alt="Circular"
                className="circle-image"
              />
            </div>
          </IonCol>
          <IonCol size="auto">
            Emeka Obianom <br /><small>(Member)</small>
          </IonCol>
        </IonRow>


        {/* Full width card for attendance */}
        <IonCard routerLink='/member/dashboard' >
          <IonCardHeader className="card-header">
            <IonCardTitle>Attendance</IonCardTitle>
            <IonIcon icon={chevronForward} />
          </IonCardHeader>
          <IonCardContent>
            <div className='card-text-icon'>
              <IonText>
                Share starts between Fit and your other apps,
                like your calories, heart rate and body measurements
              </IonText>
              <IonIcon style={{ fontSize: 60 }} icon={calendar} />
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader className="card-header">
            <IonCardTitle>Attendance</IonCardTitle>
            <IonIcon icon={chevronForward} />
          </IonCardHeader>
          <IonCardContent>
            <div className='card-text-icon'>
              <IonText>
                Share starts between Fit and your other apps,
                like your calories, heart rate and body measurements
              </IonText>
              <IonIcon style={{ fontSize: 60 }} icon={calendar} />
            </div>
          </IonCardContent>
        </IonCard>

        <IonRow class='ion-padding'>
          <IonText>NEWS</IonText>
        </IonRow>

        <IonCard>
          <IonCardHeader className="card-header">
            <IonCardTitle>Attendance</IonCardTitle>
            <IonIcon icon={chevronForward} />
          </IonCardHeader>
          <IonCardContent>
            <div className='card-text-icon'>
              <IonText>
                Share starts between Fit and your other apps,
                like your calories, heart rate and body measurements
              </IonText>
              <IonIcon style={{ fontSize: 60 }} icon={calendar} />
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader className="card-header">
            <IonCardTitle>Attendance</IonCardTitle>
            <IonIcon icon={chevronForward} />
          </IonCardHeader>
          <IonCardContent>
            <div className='card-text-icon'>
              <IonText>
                Share starts between Fit and your other apps,
                like your calories, heart rate and body measurements
              </IonText>
              <IonIcon style={{ fontSize: 60 }} icon={calendar} />
            </div>
          </IonCardContent>
        </IonCard>

        <div style={{ marginBottom: 80 }}></div>
      </IonContent>

      <SideMenuBtn />
    </IonPage>
  );
};

export default MemberDashboard;

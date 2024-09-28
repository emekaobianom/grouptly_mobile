import {
  IonTabs,
  IonRouterOutlet,
  IonTabButton,
  IonTabBar,
  IonLabel,
  IonIcon,
  IonContent,
  IonHeader,
  IonMenu,
  IonTitle,
  IonToolbar,
  IonMenuToggle,
  IonMenuButton,
  IonButton,
  IonList,
  IonItem,
  IonFab,
  IonFabButton,
} from '@ionic/react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { calendar, home, mail, wallet, person, grid } from 'ionicons/icons';


const AdminIndex: React.FC = () => {
  const history = useHistory();

  const handleNext = async () => {
    // await storeData('firstAppVisit', 'false');
    //history.replace('/signup');
  };

  return (
    <>
      <IonMenu type="overlay"  contentId="member">
        <IonContent className="">
          {/* Big picture (using an image element) */}
          <img
            src="https://png.pngtree.com/template/20191005/ourmid/pngtree-logo-people-group-team-image_314502.jpg"  // Use your actual image URL here
            alt="Big Picture"
            style={{ width: '100%', height: 'auto', aspectRatio: '1/1' }}  // This makes the height equal to width
          />

          {/* Links with icons */}
          <IonList>
            <IonMenuToggle>
              <IonItem button onClick={()=>{history.replace("/welcome")}}>
                <IonIcon icon={home} slot="start" />
                <IonLabel>Dashboard</IonLabel>
              </IonItem>
              <IonItem button routerLink="/member/inbox">
                <IonIcon icon={mail} slot="start" />
                <IonLabel>Inbox</IonLabel>
              </IonItem>
              <IonItem button routerLink="/member/payments">
                <IonIcon icon={wallet} slot="start" />
                <IonLabel>Payments</IonLabel>
              </IonItem>
              <IonItem button routerLink="/member/meetings">
                <IonIcon icon={calendar} slot="start" />
                <IonLabel>Meetings</IonLabel>
              </IonItem>
              <IonItem button routerLink="/member/profile">
                <IonIcon icon={person} slot="start" />
                <IonLabel>Profile</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>

         
        </IonContent>
      </IonMenu>
    </>
  );
};

export default AdminIndex;

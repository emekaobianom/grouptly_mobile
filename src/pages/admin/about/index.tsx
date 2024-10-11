import { IonContent, IonPage, IonButton, IonText, IonCol, IonRow, IonGrid, IonImg, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import SideMenuBtn from '../../../components/sideMenuBtn';
import { IonReactRouter } from '@ionic/react-router';
import { playCircle, radio, library, search } from 'ionicons/icons';

const AdminAbout: React.FC = () => {
  const history = useHistory();

  const handleNext = async () => {
    // await storeData('firstAppVisit', 'false');
    //history.replace('/signup');
  };

  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/contact-us" />
          {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
          {/* <Route path="/contact-us" render={() => <HomePage />} exact={true} /> */}
          {/* <Route path="/constitution" render={() => <RadioPage />} exact={true} /> */}
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={playCircle} />
            <IonLabel>Listen now</IonLabel>
          </IonTabButton>

          <IonTabButton tab="radio" href="/radio">
            <IonIcon icon={radio} />
            <IonLabel>Radio</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default AdminAbout;

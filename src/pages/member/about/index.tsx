import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { Redirect, Route, RouteComponentProps, useHistory } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { book, call } from 'ionicons/icons';
import MemberConstitution from './constitution';
import MemberContactUs from './contact_us';

const MemberAbout: React.FC<RouteComponentProps> = ({ match }) => {
  const history = useHistory();

  const handleNext = async () => {
    // await storeData('firstAppVisit', 'false');
    //history.replace('/signup');
  };

  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
        <Redirect exact path={`${match.url}`} to={`${match.url}/contact-us`} />
          <Route path={`${match.url}/contact-us`} component={MemberContactUs} exact={true} />
          <Route path={`${match.url}/constitution`} component={MemberConstitution} exact={true} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="contact-us" href={`${match.url}/contact-us`}>
            <IonIcon icon={call} />
            <IonLabel>Contact Us</IonLabel>
          </IonTabButton>

          <IonTabButton tab="constitution" href={`${match.url}/constitution`} >
            <IonIcon icon={book} />
            <IonLabel>Constitution</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default MemberAbout;

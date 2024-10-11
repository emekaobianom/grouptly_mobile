import { IonContent, IonPage, IonRefresher, IonRefresherContent, IonList, IonItem, IonLabel, IonText, IonNote, IonIcon, IonRouterOutlet, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { useState } from 'react';
import { addCircleOutline, calendar, chevronForward, heart, pencil } from 'ionicons/icons';
import { Route, RouteComponentProps, useHistory } from 'react-router';

import './donations.css';
import SideMenuBtn from '../../../components/sideMenuBtn';
import AnimatedHeader from '@/components/AnimatedHeader';
import { donationsItemsData } from '@/data/donations_placeholder';
import AdminDonationsSupportDetail from './detail';
import AdminDonationsSupportAdd from './add';
import AdminDonationsSupportEdit from './edit';

const AdminDonationsSupport: React.FC<RouteComponentProps> = ({ match }) => {
  const history = useHistory();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to manage the header size
  const handleScroll = (event: any) => {
    const scrollTop = event.detail.scrollTop;
    setIsScrolled(scrollTop > 50);
  };

  // Handle pull-to-refresh event
  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  const donationsItems = donationsItemsData;

  const renderDonationsSupportItem = (item: any) => (
    <IonCard routerLink={`/admin/donations-support/detail/${item.id}`} key={item.id} className='ion-margin-bottom'>
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
      {/* Router Outlet needs to be inside IonPage for nested navigation */}
      <IonRouterOutlet>
        <Route path={`${match.url}/add`} component={AdminDonationsSupportAdd} exact />
        <Route path={`${match.url}/detail/:id`} component={AdminDonationsSupportDetail} exact/>
        <Route path={`${match.url}/edit/:id`} component={AdminDonationsSupportEdit} exact/>
      </IonRouterOutlet>

      <IonPage>
        <AnimatedHeader isScrolled={isScrolled} title="Donations & Support">
        {/* Custom content for this page */}
        <IonIcon onClick={() => history.push(`${match.url}/add`)} icon={addCircleOutline}  style={{ width: 30, height: 30 , marginRight:"1rem"}} />
        {/* <IonIcon icon={pencil}  style={{ width: 30, height: 30, marginRight:"1rem" }} /> */}
      </AnimatedHeader>

        <IonContent scrollEvents onIonScroll={handleScroll}>
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

export default AdminDonationsSupport;

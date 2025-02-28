import { IonContent, IonPage, IonRefresher, IonRefresherContent, IonList, IonItem, IonLabel, IonText, IonNote, IonIcon, IonRouterOutlet, IonHeader, IonAvatar, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { chevronForward } from 'ionicons/icons';
import { Route, RouteComponentProps } from 'react-router';
import MemberInboxDetail from './detail';
import './inbox.css';
import { inboxItemsData } from '@/data/inbox_placeholder';
import SideMenuBtn from '../../../components/sideMenuBtn';
import UserAvatar from '@/components/main/userAvatar';

const MemberInbox: React.FC<RouteComponentProps> = ({ match }) => {

  // Handle pull-to-refresh event
  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  const inboxItems = inboxItemsData;

  const renderInboxItem = (item: any) => (
    <IonItem key={item.id} button detail={false} routerLink={`/member/inbox/${item.id}`}>
      <div className="unread-indicator-wrapper" slot="start">
        {item.unread && <div className="unread-indicator"></div>}
      </div>
      <IonLabel>
        <strong>{item.name}</strong>
        <IonText>{item.message}</IonText>
        <br />
        <IonNote color="medium" className="ion-text-wrap">{item.note}</IonNote>
      </IonLabel>
      <div className="metadata-end-wrapper" slot="end">
        <IonNote color="medium">{item.time}</IonNote>
        <IonIcon color="medium" icon={chevronForward}></IonIcon>
      </div>
    </IonItem>
  );

  return (
    <>
      {/* <IonRouterOutlet>        
      <Route path={`/member/inbox/:id`} component={MemberInboxDetail} />
      </IonRouterOutlet> */}

      <IonPage>
       <IonHeader>
       <IonToolbar>
            <IonTitle>Inbox</IonTitle>
            <UserAvatar/>
          </IonToolbar>
       </IonHeader>

        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent />
          </IonRefresher>

          <IonList inset>
            {inboxItems.map(renderInboxItem)}
          </IonList>

          {/* Spacer for bottom padding */}
          <div style={{ marginBottom: 80 }}></div>
        </IonContent>

        <SideMenuBtn />
      </IonPage>
    </>
  );
};

export default MemberInbox;

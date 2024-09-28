


import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonPage, IonRefresher, IonRefresherContent, IonRouterOutlet, IonText, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react';
import { useState } from 'react';
import './ScrollHeader.css';  // Optional for additional styling
import SideMenuBtn from '../../../components/sideMenuBtn';
import { chevronForward } from 'ionicons/icons';
import { Route, RouteComponentProps } from 'react-router';
import MemberInboxDetail from './detail';

const MemberInbox: React.FC<RouteComponentProps> = ({match}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (event: any) => {
    const scrollTop = event.detail.scrollTop;
    // Shrink the header and title once scrolled past 50px
    if (scrollTop > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }

  return (<>
    <IonRouterOutlet>
       <Route path={`${match.url}/:id`} component={MemberInboxDetail}/>
      </IonRouterOutlet>
    <IonPage>

      <IonHeader className={isScrolled ? 'small-header' : 'large-header'}>
        <IonToolbar className="custom-toolbar">
          <IonTitle className={isScrolled ? 'small-title' : 'large-title'}>
            Inbox
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollEvents={true} onIonScroll={handleScroll}>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList inset={true}>
          <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
            <div className="unread-indicator-wrapper" slot="start"></div>
            <IonLabel>
              <strong>Ionitron</strong>
              <IonText>I have become sentient</IonText>
              <br />
              <IonNote color="medium" className="ion-text-wrap">
                That is all.
              </IonNote>
            </IonLabel>
            <div className="metadata-end-wrapper" slot="end">
              <IonNote color="medium">03:44</IonNote>
              <IonIcon color="medium" icon={chevronForward}></IonIcon>
            </div>
          </IonItem>
          <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
            <div className="unread-indicator-wrapper" slot="start"></div>
            <IonLabel>
              <strong>Ionitron</strong>
              <IonText>I have become sentient</IonText>
              <br />
              <IonNote color="medium" className="ion-text-wrap">
                That is all.
              </IonNote>
            </IonLabel>
            <div className="metadata-end-wrapper" slot="end">
              <IonNote color="medium">03:44</IonNote>
              <IonIcon color="medium" icon={chevronForward}></IonIcon>
            </div>
          </IonItem>

          <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
            <div className="unread-indicator-wrapper" slot="start"></div>
            <IonLabel>
              <strong>Ionitron</strong>
              <IonText>I have become sentient</IonText>
              <br />
              <IonNote color="medium" className="ion-text-wrap">
                That is all.
              </IonNote>
            </IonLabel>
            <div className="metadata-end-wrapper" slot="end">
              <IonNote color="medium">03:44</IonNote>
              <IonIcon color="medium" icon={chevronForward}></IonIcon>
            </div>
          </IonItem>
          <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
            <div className="unread-indicator-wrapper" slot="start">
              <div className="unread-indicator"></div>
            </div>
            <IonLabel>
              <strong>Rick Astley</strong>
              <IonText>Never Gonna Give You Up</IonText>
              <br />
              <IonNote color="medium" className="ion-text-wrap">
                Never gonna give you up Never gonna let you down Never gonna run...
              </IonNote>
            </IonLabel>
            <div className="metadata-end-wrapper" slot="end">
              <IonNote color="medium">06:11</IonNote>
              <IonIcon color="medium" icon={chevronForward}></IonIcon>
            </div>
          </IonItem>
          <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
            <div className="unread-indicator-wrapper" slot="start"></div>
            <IonLabel>
              <strong>Ionitron</strong>
              <IonText>I have become sentient</IonText>
              <br />
              <IonNote color="medium" className="ion-text-wrap">
                That is all.
              </IonNote>
            </IonLabel>
            <div className="metadata-end-wrapper" slot="end">
              <IonNote color="medium">03:44</IonNote>
              <IonIcon color="medium" icon={chevronForward}></IonIcon>
            </div>
          </IonItem>
          <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
            <div className="unread-indicator-wrapper" slot="start"></div>
            <IonLabel>
              <strong>Ionitron</strong>
              <IonText>I have become sentient</IonText>
              <br />
              <IonNote color="medium" className="ion-text-wrap">
                That is all.
              </IonNote>
            </IonLabel>
            <div className="metadata-end-wrapper" slot="end">
              <IonNote color="medium">03:44</IonNote>
              <IonIcon color="medium" icon={chevronForward}></IonIcon>
            </div>
          </IonItem>
          <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
            <div className="unread-indicator-wrapper" slot="start"></div>
            <IonLabel>
              <strong>Ionitron</strong>
              <IonText>I have become sentient</IonText>
              <br />
              <IonNote color="medium" className="ion-text-wrap">
                That is all.
              </IonNote>
            </IonLabel>
            <div className="metadata-end-wrapper" slot="end">
              <IonNote color="medium">03:44</IonNote>
              <IonIcon color="medium" icon={chevronForward}></IonIcon>
            </div>
          </IonItem>
          <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
            <div className="unread-indicator-wrapper" slot="start"></div>
            <IonLabel>
              <strong>Ionitron</strong>
              <IonText>I have become sentient</IonText>
              <br />
              <IonNote color="medium" className="ion-text-wrap">
                That is all.
              </IonNote>
            </IonLabel>
            <div className="metadata-end-wrapper" slot="end">
              <IonNote color="medium">03:44</IonNote>
              <IonIcon color="medium" icon={chevronForward}></IonIcon>
            </div>
          </IonItem>
          <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
            <div className="unread-indicator-wrapper" slot="start"></div>
            <IonLabel>
              <strong>Ionitron</strong>
              <IonText>I have become sentient</IonText>
              <br />
              <IonNote color="medium" className="ion-text-wrap">
                That is all.
              </IonNote>
            </IonLabel>
            <div className="metadata-end-wrapper" slot="end">
              <IonNote color="medium">03:44</IonNote>
              <IonIcon color="medium" icon={chevronForward}></IonIcon>
            </div>
          </IonItem>
          <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
            <div className="unread-indicator-wrapper" slot="start"></div>
            <IonLabel>
              <strong>Ionitron</strong>
              <IonText>I have become sentient</IonText>
              <br />
              <IonNote color="medium" className="ion-text-wrap">
                That is all.
              </IonNote>
            </IonLabel>
            <div className="metadata-end-wrapper" slot="end">
              <IonNote color="medium">03:44</IonNote>
              <IonIcon color="medium" icon={chevronForward}></IonIcon>
            </div>
          </IonItem>
          <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
            <div className="unread-indicator-wrapper" slot="start"></div>
            <IonLabel>
              <strong>Ionitron</strong>
              <IonText>I have become sentient</IonText>
              <br />
              <IonNote color="medium" className="ion-text-wrap">
                That is all.
              </IonNote>
            </IonLabel>
            <div className="metadata-end-wrapper" slot="end">
              <IonNote color="medium">03:44</IonNote>
              <IonIcon color="medium" icon={chevronForward}></IonIcon>
            </div>
          </IonItem>
          <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
            <div className="unread-indicator-wrapper" slot="start"></div>
            <IonLabel>
              <strong>Ionitron</strong>
              <IonText>I have become sentient</IonText>
              <br />
              <IonNote color="medium" className="ion-text-wrap">
                That is all.
              </IonNote>
            </IonLabel>
            <div className="metadata-end-wrapper" slot="end">
              <IonNote color="medium">03:44</IonNote>
              <IonIcon color="medium" icon={chevronForward}></IonIcon>
            </div>
          </IonItem>
          <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
            <div className="unread-indicator-wrapper" slot="start"></div>
            <IonLabel>
              <strong>Ionitron</strong>
              <IonText>I have become sentient</IonText>
              <br />
              <IonNote color="medium" className="ion-text-wrap">
                That is all.
              </IonNote>
            </IonLabel>
            <div className="metadata-end-wrapper" slot="end">
              <IonNote color="medium">03:44</IonNote>
              <IonIcon color="medium" icon={chevronForward}></IonIcon>
            </div>
          </IonItem>
          <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
            <div className="unread-indicator-wrapper" slot="start"></div>
            <IonLabel>
              <strong>Ionitron</strong>
              <IonText>I have become sentient</IonText>
              <br />
              <IonNote color="medium" className="ion-text-wrap">
                That is all.
              </IonNote>
            </IonLabel>
            <div className="metadata-end-wrapper" slot="end">
              <IonNote color="medium">03:44</IonNote>
              <IonIcon color="medium" icon={chevronForward}></IonIcon>
            </div>
          </IonItem>
        </IonList>

        <div style={{ marginBottom: 80 }}></div>
      </IonContent>
      <SideMenuBtn />
    </IonPage>
  </>
  );
};

export default MemberInbox;

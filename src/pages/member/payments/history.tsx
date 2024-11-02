import {
  IonContent, IonPage, IonRefresher, IonRefresherContent, IonList, IonItem, IonLabel, IonText, IonNote,
  IonIcon, IonHeader, IonAvatar, IonTitle, IonToolbar, IonBackButton, IonButtons, IonButton
} from '@ionic/react';
import { useState } from 'react';
import { chevronForward } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';
import './history.css';
import { inboxItemsData } from '@/data/inbox_placeholder';
import SideMenuBtn from '../../../components/sideMenuBtn';

const PAGE_SIZE = 10;  // Number of items to load per page

const MemberPaymentsHistory: React.FC<RouteComponentProps> = ({ match }) => {
  const [page, setPage] = useState(1);  // Current page
  const [inboxItems, setInboxItems] = useState(inboxItemsData.slice(0, PAGE_SIZE)); // Initial paginated items
  const [isLoading, setIsLoading] = useState(false);

  // Handle pull-to-refresh event
  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      event.detail.complete(); // Complete the refresher action
    }, 1000); // Shortened the timeout to avoid long delays
  };

  // Load more items (next page)
  const loadMoreItems = () => {
    setIsLoading(true);
    const nextPage = page + 1;
    const newItems = inboxItemsData.slice(0, nextPage * PAGE_SIZE); // Fetch next batch of items

    // Simulate a short delay for loading
    setTimeout(() => {
      setInboxItems(newItems);
      setPage(nextPage); // Update current page
      setIsLoading(false);
    }, 1000); // Simulate loading delay
  };

  const renderInboxItem = (item: any) => (
    <IonItem key={item.id} button detail={true} routerLink={`/member/payments/history/${item.id}`}>
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
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref='/member/payments' />
            </IonButtons>
            <IonTitle>History</IonTitle>
            <IonAvatar slot='end' className='ion-padding'>
              {/* Lazy loading the image to optimize performance */}
              <img src="https://randomuser.me/api/portraits/men/9.jpg" alt="me" loading="lazy" />
            </IonAvatar>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent />
          </IonRefresher>

          {/* Display the current page of items */}
          <IonList inset>
            {inboxItems.map(renderInboxItem)}
          </IonList>

          {/* Load More Button */}
          {inboxItems.length < inboxItemsData.length && (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <IonButton
                onClick={loadMoreItems}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </IonButton>
            </div>
          )}

          {/* Spacer for bottom padding */}
          <div style={{ marginBottom: 80 }}></div>
        </IonContent>

        <SideMenuBtn />
      </IonPage>
    </>
  );
};

export default MemberPaymentsHistory;

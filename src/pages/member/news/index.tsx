
import "./news.css";
import React from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonAvatar, IonText, IonHeader, IonRefresher, IonRefresherContent, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import SideMenuBtn from "@/components/sideMenuBtn";
import { useHistory } from "react-router";

interface DateType {
  monthDay: string;
  day: string;
}

interface EventType {
  date: DateType;
  title: string;
  description: string;
  category: string;
  user: string;
  userRole: string;
  userImg: string;
}

interface NewsCardProps {
  event: EventType;
}

const NewsCard: React.FC<NewsCardProps> = ({ event }) => (
  <div className="news-card">
    <IonGrid>
      <IonRow>
        {/* Date Section */}
        <IonCol size="2" className="ion-text-center">
          <IonText color="medium">
            <p>{event.date.monthDay}</p>
            <h1>{event.date.day}</h1>
          </IonText>
        </IonCol>

        {/* Event Details */}
        <IonCol size="10">
          <IonText color="primary">
            <h6>{event.category.toUpperCase()}</h6>
          </IonText>
          <h2>{event.title}</h2>
          <p>{event.description}</p>

          {/* User Info */}
          <IonRow className="ion-align-items-center">
            <IonAvatar>
              <img src={event.userImg} alt={event.user} />
            </IonAvatar>
            <IonCol className="ion-padding">
              <IonText>{event.user}</IonText>
              <br/>
              <small>{event.userRole}</small>
            </IonCol>
          </IonRow>
        </IonCol>
      </IonRow>
    </IonGrid>
  </div>
);

const MemberNews: React.FC = () => {
  const events: EventType[] = [
    {
      date: { monthDay: 'Jul-24', day: '01' },
      title: '3rd Annual Meeting',
      description: 'In this coming meeting we shall discuss the way forward on our new building and other pending issues of the previous meetings.',
      category: 'Meeting',
      user: 'Emeka Obianom Sunday',
      userRole: 'PRO',
      userImg: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
    {
      date: { monthDay: 'Aug-24', day: '12' },
      title: 'Quarterly Financial Report',
      description: 'We will be reviewing the quarterly financial report and addressing any discrepancies found.',
      category: 'Finance',
      user: 'Sophia Lee',
      userRole: 'PRO',
      userImg: 'https://randomuser.me/api/portraits/women/12.jpg',
    },
    
    {
      date: { monthDay: 'Mar-24', day: '12' },
      title: 'Annually Financial Report',
      description: 'We will be reviewing the quarterly financial report and addressing any discrepancies found.',
      category: 'Finance',
      user: 'Sophia Lee',
      userRole: 'PRO',
      userImg: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    
    {
      date: { monthDay: 'Oct-24', day: '12' },
      title: '4th Financial Report',
      description: 'We will be reviewing the quarterly financial report and addressing any discrepancies found.',
      category: 'Finance',
      user: 'Sophia Lee',
      userRole: 'PRO',
      userImg: 'https://randomuser.me/api/portraits/women/19.jpg',
    },
  ];
  
  const history = useHistory();
  // Handle pull-to-refresh event
  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  return (
    <>

      <IonPage>
       <IonHeader>
       <IonToolbar>
            <IonTitle>News</IonTitle>
            <IonAvatar slot='end' className='ion-padding'>
              <img src="https://randomuser.me/api/portraits/men/9.jpg" alt="me" />
            </IonAvatar>
          </IonToolbar>
       </IonHeader>

        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent />
          </IonRefresher>
        {/* <h1 className="ion-padding">News</h1> */}
        {events.map((event, index) => (
          <NewsCard key={index} event={event} />
        ))}
      </IonContent>
      <SideMenuBtn />
    </IonPage>
    </>
  );
};

export default MemberNews;

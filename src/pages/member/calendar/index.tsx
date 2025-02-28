import React from 'react';
import { IonContent, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonPage, IonAvatar, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import './calendar.css';
import SideMenuBtn from '@/components/sideMenuBtn';
import UserAvatar from '@/components/main/userAvatar';

// Define types for day details
interface Day {
  day: string;
  date: string;
  bgColor: string;
  title: string;
  description: string;
}

const MemberCalendar: React.FC = () => {
  // Define the static data for each day
  const days: Day[] = [
    { day: 'Tuesday', date: '13 DEC', bgColor: '#c5c2e7', title: 'Meeting', description: 'We shall be having a meeting on this date.' },
    { day: 'Wednesday', date: '14 DEC', bgColor: '#d9b0b5', title: 'App Update', description: 'There will be an app update and meeting.' },
    { day: 'Thursday', date: '15 DEC', bgColor: '#9ec6c4', title: 'Web Update', description: 'There will be a web update session.' }
  ];

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
          <IonTitle>Calendar</IonTitle>
          <UserAvatar/>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Card for each day */}
        {days.map(({ day, date, bgColor, title, description }) => (
          <IonCard key={date} className="day-card" style={{ backgroundColor: bgColor }}>
            <IonCardContent>
              <IonGrid>
                <IonRow className="day-header">
                  <IonCol>{day}</IonCol>
                </IonRow>
                <IonRow className="date-row">
                  <IonCol size="4" className="date-col">
                    <div className="date-text">{date.split(' ')[0]}</div>
                    <div className="month-text">{date.split(' ')[1]}</div>
                  </IonCol>
                  <IonCol size="8" className="body">
                    <h2>{title}</h2>
                    <p>{description}</p>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
      <SideMenuBtn />
    </IonPage>
  );
};

export default MemberCalendar;

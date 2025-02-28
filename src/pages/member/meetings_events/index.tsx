import React, { useState } from 'react';
import { IonPage, IonHeader, IonContent, IonSearchbar, IonGrid, IonRow, IonCol, IonAvatar, IonCard, IonCardContent, IonItem, IonLabel, IonToolbar, IonSegment, IonSegmentButton, IonText, IonTitle, IonImg } from '@ionic/react';
import './event.css';
import { eventsData, EventType } from '@/data/events_placeholder';
import { useHistory } from 'react-router';
import SideMenuBtn from '@/components/sideMenuBtn';
import UserAvatar from '@/components/main/userAvatar';

// Main Events Component
const MemberMeetingsEvents: React.FC = () => {
  const [segment, setSegment] = useState<'events' | 'meetings'>('meetings'); // State for segment
  const [searchText, setSearchText] = useState(''); // State for search text
  const history = useHistory();

  // Function to get records with roles other than 'event'
  function getEventByCategory(events: EventType[], category: string) {
    return events.filter((event) => event.category === category);
  }

  function getEventByNotCategory(events: EventType[], category: string) {
    return events.filter((event) => event.category !== category);
  }

  const meetings = getEventByCategory(eventsData, "meeting");
  const otherEventsNotMeeting = getEventByNotCategory(eventsData, "meeting");

  // Handle pull-to-refresh event
  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  // Filter events based on search input
  const filteredEvents = otherEventsNotMeeting.filter(event =>
    event.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // Event Section
  const eventSection = () => (
    <>
      <IonSearchbar
        value={searchText}
        onIonInput={e => setSearchText(e.detail.value!)}
        placeholder="Search by event"
      />
      <IonGrid>
        {filteredEvents.map((event, index) => (
          <IonRow key={index}>
            {/* Date Section */}
            <IonCol size="2" className="ion-text-center">
              <IonText color="medium">
                <p>{event.date.monthDay}</p>
                <h1>{event.date.day}</h1>
              </IonText>
            </IonCol>

            {/* Event Details */}
            <IonCol size="10">
              <IonItem
                button
                onClick={() => { history.push(`/member/meetings-events/detail/${event.id}`) }}
              >
                <IonLabel>
                  <IonText color="primary">
                    <h6>{event.category.toUpperCase()}</h6>
                  </IonText>
                  <h2>{event.title}</h2>
                  <p>{event.description}</p>
                </IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
        ))}
      </IonGrid>
    </>
  );

  // Meeting Section
  const meetingSection = () => (
    <IonGrid>
      {meetings.map((event, index) => (
        <IonRow key={index}>
          {/* Date Section */}
          <IonCol size="2" className="ion-text-center">
            <IonText color="medium">
              <p>{event.date.monthDay}</p>
              <h1>{event.date.day}</h1>
            </IonText>
          </IonCol>

          {/* Event Details */}
          <IonCol size="10">
            <IonItem
              button
              onClick={() => { history.push(`/member/meetings-events/detail/${event.id}`) }}
            >
              <IonLabel>
                <IonText color="primary">
                  <h6>{event.category.toUpperCase()}</h6>
                </IonText>
                <h2>{event.title}</h2>
                <p>{event.description}</p>
              </IonLabel>
            </IonItem>
          </IonCol>
        </IonRow>
      ))}
    </IonGrid>
  );

  return (
    <>
      <IonPage>
        <IonHeader>
        <IonToolbar>
            <IonTitle>Events</IonTitle>
            <UserAvatar/>
          </IonToolbar>
          <IonToolbar>
            <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as 'events' | 'meetings')}>
              <IonSegmentButton value="meetings">
                <IonLabel>Meetings</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="events">
                <IonLabel>Events</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          {/* Render based on the selected segment */}
          {segment === 'events' ? eventSection() : meetingSection()}
        </IonContent>

        <SideMenuBtn />
      </IonPage>
    </>
  );
};

export default MemberMeetingsEvents;

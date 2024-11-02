import React, { useEffect, useState } from 'react';
import {
  IonButtons,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonText,
  IonAvatar,
  IonGrid,
  IonCol,
  IonRow,
  IonBackButton,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { EventType, eventsData } from '@/data/events_placeholder';
import { people, wallet } from 'ionicons/icons';

interface MemberMeetingsEventsPaymentsProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const MemberMeetingsEventsPayments: React.FC<MemberMeetingsEventsPaymentsProps> = ({ match }) => {
  const [event, setEvent] = useState<EventType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundEvent = eventsData.find((data) => data.id === match.params.id);
    setEvent(foundEvent || null);
    setIsLoading(false);

    return () => {
      setEvent(null);
    };
  }, [match.params.id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
          <IonBackButton defaultHref={`/member/meetings-events/detail/${match.params.id}`} /> {/* Reuse the back button */}
          </IonButtons>
          <IonTitle>Payments</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {!event ? (
          <IonText color="danger">Event not found</IonText>
        ) : (
          <div className="news-card">
           
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MemberMeetingsEventsPayments;

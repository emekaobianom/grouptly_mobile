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
  IonCard,
  IonCardContent,
  IonImg,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { EventType, eventsData } from '@/data/events_placeholder';
import { checkmarkCircle, people, wallet } from 'ionicons/icons';
import { MemberType, membersData } from '@/data/members_placeholder';

interface MemberMeetingsEventsAttendanceProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const MemberMeetingsEventsAttendance: React.FC<MemberMeetingsEventsAttendanceProps> = ({ match }) => {
  const [event, setEvent] = useState<EventType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [membersThatAttended, setMembersThatAttended] = useState<MemberType[]>([]);

  useEffect(() => {
    const foundEvent = eventsData.find((data) => data.id === match.params.id);
    setEvent(foundEvent || null);
    setIsLoading(false);

    const members = membersData.slice(0, 15);

    setMembersThatAttended(members);

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
          <IonTitle>Attendance</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          {membersThatAttended.map((member) => (
            <IonCard key={member.id} className="ion-margin-bottom">
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol size="auto">
                      <IonImg
                        src={member.image}
                        style={{
                          width: '50px',
                          height: 'auto',
                          objectFit: 'contain',
                          borderRadius: '50%',
                        }}
                      />
                    </IonCol>
                    <IonCol>
                      <p className="bold-text">{member.name}</p>
                      <IonText color="medium">
                        <small>{member.role}</small>
                      </IonText>
                    </IonCol>
                    <IonCol size="auto">
                      <IonIcon
                        icon={checkmarkCircle}
                        style={{ color: 'gray', fontSize: '24px' }}
                      />
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MemberMeetingsEventsAttendance;

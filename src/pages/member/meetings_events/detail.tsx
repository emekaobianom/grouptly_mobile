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

interface MemberMeetingsEventsDetailProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const MemberMeetingsEventsDetail: React.FC<MemberMeetingsEventsDetailProps> = ({ match }) => {
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
            <IonBackButton defaultHref="/member/meetings-events" /> {/* Reuse the back button */}
          </IonButtons>
          <IonTitle>{event ? event.title : 'Event'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {!event ? (
          <IonText color="danger">Event not found</IonText>
        ) : (
          <div className="news-card">
            <IonGrid>
              <IonRow>
                {/* Date Section */}
                <IonCol size="2" className="ion-text-center">
                  <IonText color="medium">
                    <p>{event?.date?.monthDay}</p>
                    <h1>{event?.date?.day}</h1>
                  </IonText>
                </IonCol>

                {/* Event Details */}
                <IonCol size="10">
                  <IonText color="primary">
                    <h6>{event?.category?.toUpperCase()}</h6>
                  </IonText>
                  <h2>{event?.title}</h2>
                  <p><b>Time:</b> 10:00 AM</p>
                  <p><b>Location:</b> Virtual (Zoom)</p>
                  <p><b>Meeting Chair:</b> Sarah Johnson</p>
                  <p><b>Minutes Prepared by:</b> Michael Smith</p>
                  <IonButton shape="round" routerLink={`/member/meetings-events/attendance/${event.id}`}>
                    <IonIcon slot="start" icon={people} />
                    Attendance
                  </IonButton>
                  <IonButton shape="round" routerLink={`/member/meetings-events/payments/${event.id}`}>
                    <IonIcon slot="start" icon={wallet} />
                    Payments
                  </IonButton>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12">
                  <p>

                    1. Welcome and Call to Order
                    - Chairperson Sarah Johnson called the meeting to order at 10:05 AM.
                    - Sarah welcomed all attendees and briefly reviewed the agenda for the meeting.

                    2. Attendance
                    - Present:
                    - Sarah Johnson (Chairperson)
                    - John Williams (Treasurer)
                    - Emily Davis (Membership Coordinator)
                    - Michael Smith (Secretary)
                    - Rachel Green (Events Manager)

                    - Apologies:
                    - David Lee (Communications Director)

                    3. Approval of Minutes from Last Meeting
                    - The minutes from the previous annual meeting held on October 15, 2023, were reviewed.
                    - Motion to Approve: John Williams
                    - Seconded by: Emily Davis
                    - Outcome: Minutes approved without amendments.

                    4. Reports
                    - Chairperson's Report:
                    Sarah Johnson reported the organization had made significant progress in membership growth, financial stability, and events. She highlighted the successful launch of the new website and increased member engagement through online platforms.

                    - Treasurer's Report:
                    John Williams presented the financial report, showing a 15% increase in annual revenue. He noted that operational expenses remained steady, and the organization's reserves had increased by $20,000. A budget for next year was proposed, focusing on expanding member services.

                    - Membership Report:
                    Emily Davis shared that the organization saw a 10% increase in new members, totaling 150 active members. She outlined plans to improve member onboarding and engagement, including a mentorship program.

                    - Events Committee Report:
                    Rachel Green provided an update on events, mentioning the success of the annual conference and smaller regional meet-ups. She proposed organizing more virtual events to engage remote members.

                    5. Old Business
                    - Website Redesign:
                    The newly redesigned website launched in July was discussed. Feedback from members has been overwhelmingly positive, with increased traffic and user interaction.

                    - Member Outreach Program:
                    Sarah Johnson reviewed the status of the member outreach program, noting that the pilot program had been completed, and the full roll-out was scheduled for January 2025.

                    6. New Business
                    - 2025 Annual Conference Location:
                    Discussion: Rachel Green proposed holding the 2025 annual conference in Chicago. The board discussed possible venues and the benefits of hosting in a centrally located city.
                    Outcome: The proposal was accepted. Rachel will begin venue research and provide options at the next meeting.

                    - Member Mentorship Program:
                    Discussion: Emily Davis presented a proposal to launch a mentorship program that connects new members with experienced ones. The program aims to improve member retention and engagement.
                    Outcome: The board approved the proposal. Emily will draft a detailed plan and timeline for implementation in Q1 2025.

                    7. Elections
                    - Election of New Treasurer:
                    John Williams announced his decision to step down as Treasurer at the end of the year. Sarah Johnson nominated Emily Brown, who accepted the nomination.
                    Vote Outcome: Emily Brown was unanimously elected as the new Treasurer, effective January 2025.

                    8. Other Business
                    - Digital Member Cards:
                    Sarah Johnson mentioned the idea of introducing digital member cards to streamline event check-ins and member identification. The proposal will be reviewed at the next meeting.

                    9. Adjournment
                    - The meeting was adjourned at 11:30 AM by Sarah Johnson.
                    - Next Meeting: The next annual meeting will be held on October 22, 2025.

                    ---

                    Minutes Approved by:
                    Name: Sarah Johnson
                    Date: November 1, 2024

                    ---

                    You can now easily copy and paste this text wherever needed!
                  </p>
                </IonCol>
              </IonRow>

            </IonGrid>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MemberMeetingsEventsDetail;

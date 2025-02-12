import UserAvatar from '@/components/member/userAvatar';
import SideMenuBtn from '@/components/sideMenuBtn';
import { IonPage, IonSegment, IonSegmentButton, IonLabel, IonText, IonAvatar, IonHeader, IonTitle, IonToolbar, IonContent } from '@ionic/react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router';

const MemberAbout: React.FC<RouteComponentProps> = ({ match }) => {
  const [segment, setSegment] = useState<'history' | 'constitution'>('constitution'); // State for segment

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About Us</IonTitle>
          <UserAvatar />
        </IonToolbar>
        <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as 'constitution' | 'history')}>
          <IonSegmentButton value="constitution">
            <IonLabel>Constitution</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="history">
            <IonLabel>History</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonHeader>

      <IonContent>
        {/* Conditional rendering based on the selected segment */}
        {segment === 'history' && (
          <div className='ion-padding'>
            <IonText>
              <h2>Group History</h2>
              <p>
                The Village Union was founded in 1998 by a group of community leaders who recognized the
                need for a formal organization to foster unity and development within the village.
                Initially starting with only 20 members, the Union has grown to include over 500 active
                members today.
              </p>
              <p>
                Over the years, the Union has led several initiatives including community-driven
                projects such as the construction of schools, health centers, and water supply systems.
                The Union's commitment to sustainable development has been a cornerstone of its mission,
                with various campaigns aimed at educating members on modern agricultural techniques,
                health awareness, and financial literacy.
              </p>
              <p>
                The group holds an annual general meeting where members gather to review progress, elect
                new leaders, and plan for the future. As the community has evolved, so too has the
                Union, with a focus on adapting to new challenges while maintaining the core values of
                unity, cooperation, and support.
              </p>
            </IonText>
          </div>
        )}

        {segment === 'constitution' && (
          <div className='ion-padding'>
            <IonText>
              <h2>Preamble:</h2>
              <p>
                We, the members of the Village Union, in order to create a community that fosters
                unity, prosperity, and resilience, hereby establish this Constitution to govern our
                collective endeavors and ensure the well-being of all our citizens.
              </p>

              {/* Constitution content */}
              <h3>Article I: Name and Purpose</h3>
              <h4>1. Name</h4>
              <p>The name of this organization shall be the Village Union.</p>

              <h4>2. Purpose</h4>
              <p>
                The purpose of the Village Union is to promote unity, prosperity, and resilience among
                the residents of our village through cooperation, mutual support, and shared resources.
              </p>

              {/* More articles follow... */}
              <h3>Article II: Membership</h3>
              <h4>1. Eligibility</h4>
              <p>
                Membership in the Village Union shall be open to all residents of the village who
                subscribe to the principles of unity, cooperation, and mutual support.
              </p>

              <h4>2. Rights and Responsibilities</h4>
              <p>
                Members shall have the right to participate in all activities of the Union, vote in
                meetings, and hold office. Members are also responsible for upholding the values of
                the Union and contributing to its activities.
              </p>

              {/* You can continue adding more articles as shown */}
            </IonText>
          </div>
        )}
      </IonContent>
      <SideMenuBtn />
    </IonPage>
  );
};

export default MemberAbout;

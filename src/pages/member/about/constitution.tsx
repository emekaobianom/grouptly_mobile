// import { IonContent, IonPage, IonButton, IonText, IonCol, IonRow, IonGrid, IonImg, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonAvatar, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
// import { useHistory } from 'react-router-dom';
// import SideMenuBtn from '../../../components/sideMenuBtn';

// const MemberMemberConstitution React.FC = () => {
//   const history = useHistory();

//   const handleNext = async () => {
//     // await storeData('firstAppVisit', 'false');
//     //history.replace('/signup');
//   };

//   return (
//     <IonPage>
//       <IonHeader>
//        <IonToolbar>
//             <IonTitle>Constitution</IonTitle>
//             <IonAvatar slot='end' className='ion-padding'>
//               <img src="https://randomuser.me/api/portraits/men/9.jpg" alt="me" />
//             </IonAvatar>
//           </IonToolbar>
//        </IonHeader>
//       <IonContent className="ion-padding" fullscreen>
//         <IonGrid>
//           <IonRow>
//             <IonCol size="auto">
//               <IonText color="dark">
//                 <h6 className="bold-text">Constitution</h6>
//               </IonText>
//             </IonCol>

//             <IonCol size="12">
//               <IonCard>
//                 <IonCardHeader>
//                   <IonCardTitle>Card Title</IonCardTitle>
//                   <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
//                 </IonCardHeader>

//                 <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
//               </IonCard>
//             </IonCol>


//             <IonCol size="6">
//               <IonCard>
//                 <IonCardHeader>
//                   <IonCardTitle>Card Title</IonCardTitle>
//                   <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
//                 </IonCardHeader>

//                 <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
//               </IonCard>
//             </IonCol>
//             <IonCol size="6">
//               <IonCard>
//                 <IonCardHeader>
//                   <IonCardTitle>Card Title</IonCardTitle>
//                   <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
//                 </IonCardHeader>

//                 <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
//               </IonCard>
//             </IonCol>



//           </IonRow>
//         </IonGrid>
//       </IonContent>
//       <SideMenuBtn />
//     </IonPage>
//   );
// };

// export default MemberConstitution;

import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonText, IonAvatar, IonRefresher, IonRefresherContent, IonRouterOutlet } from '@ionic/react';
import SideMenuBtn from '@/components/sideMenuBtn';
import { Route } from 'react-router';
import MemberInboxDetail from '../inbox/detail';

const MemberConstitution: React.FC = () => {
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
            <IonTitle>Constitution</IonTitle>
            <IonAvatar slot='end' className='ion-padding'>
              <img src="https://randomuser.me/api/portraits/men/9.jpg" alt="me" />
            </IonAvatar>
          </IonToolbar>
       </IonHeader>

        <IonContent className='ion-padding'>
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent />
          </IonRefresher>
        <IonText>
          <h2>Preamble:</h2>
          <p>
            We, the members of the Village Union, in order to create a community that fosters
            unity, prosperity, and resilience, hereby establish this Constitution to govern our
            collective endeavors and ensure the well-being of all our citizens.
          </p>

          <h3>Article I: Name and Purpose</h3>
          <h4>1. Name</h4>
          <p>The name of this organization shall be the Village Union.</p>

          <h4>2. Purpose</h4>
          <p>
            The purpose of the Village Union is to promote unity, prosperity, and resilience among
            the residents of our village through cooperation, mutual support, and shared resources.
          </p>

          {/* Add more articles as needed below */}
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

          <h3>Article III: Governance</h3>
          <h4>1. Executive Committee</h4>
          <p>
            The Executive Committee shall consist of elected officials including the President,
            Vice President, Secretary, Treasurer, and other officers as deemed necessary.
          </p>

          <h4>2. Powers and Duties</h4>
          <p>
            The Executive Committee shall be responsible for the day-to-day management of the
            Union's affairs, implementing policies, and representing the Union in external matters.
          </p>

          <h3>Article IV: Meetings</h3>
          <h4>1. General Meetings</h4>
          <p>
            The Union shall hold general meetings at least once every quarter to discuss ongoing
            matters, review progress, and plan future activities.
          </p>

          <h4>2. Special Meetings</h4>
          <p>
            Special meetings may be called by the Executive Committee or upon the request of a
            majority of members.
          </p>

          <h3>Article V: Finances</h3>
          <h4>1. Dues</h4>
          <p>
            Members shall be required to pay annual dues, the amount of which shall be determined
            by the Executive Committee.
          </p>

          <h4>2. Budget and Expenditures</h4>
          <p>
            The Treasurer shall present a budget for approval at the beginning of each fiscal year.
            All expenditures must be approved by the Executive Committee.
          </p>

          <h3>Article VI: Amendments</h3>
          <h4>1. Process</h4>
          <p>
            This Constitution may be amended by a two-thirds vote of the members present at a
            general meeting, provided that notice of the proposed amendment has been given to all
            members at least two weeks prior to the meeting.
          </p>

          <h3>Article VII: Dissolution</h3>
          <h4>1. Procedure</h4>
          <p>
            In the event of dissolution, the assets of the Union shall be distributed to
            organizations with similar purposes, as decided by the members at the final meeting.
          </p>

          <p><strong>Adopted on: [Insert Date]</strong></p>
        </IonText>
      </IonContent>
      <SideMenuBtn />
    </IonPage>
    </>
  );
};

export default MemberConstitution;

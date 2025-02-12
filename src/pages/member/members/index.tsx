import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonContent, IonSearchbar, IonGrid, IonRow, IonCol, IonAvatar, IonCard, IonCardContent, IonItem, IonLabel, IonToolbar, IonSegment, IonSegmentButton, IonText, IonTitle, IonImg, IonBackButton, IonButtons } from '@ionic/react';
import './Members.css';
import { membersData } from '@/data/members_placeholder';
import { useHistory } from 'react-router';
import MemberMembersDetail from './detail';
import SideMenuBtn from '@/components/sideMenuBtn';
import UserAvatar from '@/components/member/userAvatar';
import { Member, User } from '@/store/interface';
import members from '@/pages/admin/members';
import { getExecutiveMembersOfGroup, getMembersOfGroup, initializeMembersAtom } from '@/store/atoms/memberAtoms';
import { memberFullname } from '@/utils/simpleCases';
import { useAtom } from 'jotai';
import UserAdminAvatar from '@/components/member/userAvatar';

// Main Members Component
const MemberMembers: React.FC = () => {

  const [segment, setSegment] = useState<'executiveMembers' | 'members'>('members'); // State for segment
  const [searchText, setSearchText] = useState(''); // State for search text
  const history = useHistory();

  const [, initializeMembers] = useAtom(initializeMembersAtom);
  const [members] = useAtom(getMembersOfGroup);
  const [executiveMembers] = useAtom(getExecutiveMembersOfGroup);

  useEffect(() => {
    initializeMembers(); // Trigger initialization only once
  }, []);

  // Handle pull-to-refresh event
  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  // Member Section
  const memberSection = () => (
    <>
      <IonSearchbar
        className='ion-padding'
        value={searchText}
        onIonInput={e => setSearchText(e.detail.value!)}
        placeholder="Search by name"
      />
      <IonGrid>
        <IonRow>
          {members.map((member: Member, index) => (
            <IonCol size="6" key={index}>
              <IonCard className="member-card" routerLink={`/admin/members/${member.id}`}>
                <IonCardContent>
                  <IonAvatar className="member-avatar">
                    <img src={member.image_url} alt={memberFullname(member)} />
                  </IonAvatar>
                  <IonLabel className="member-name">{memberFullname(member)}</IonLabel>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </>
  );

  // Executive Section
  const executiveMemberSection = () => (
    <>
      {/* <IonSearchbar
        className='ion-padding'
        value={searchText}
        onIonInput={e => setSearchText(e.detail.value!)}
        placeholder="Search by name"
      /> */}
      <IonGrid>
        {executiveMembers.map((executive) => (
          <IonRow key={executive.id} className="ion-margin">
            <IonCol size="12" className="ion-text-center" onClick={() => { history.push(`/member/members/${executive.id}`); }}>
              {/* Profile Image */}
              <IonAvatar style={{ margin: '0 auto', width: '10rem', height: '10rem' }}>
                <IonImg
                  src={executive.image_url}
                  alt={memberFullname(executive)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                />
              </IonAvatar>
              {/* Executive Name */}
              <IonText className="executive-name">
                <h3>{memberFullname(executive)} </h3>
              </IonText>
              {/* Executive Role */}
              <IonText className="executive-role">
                <p>{executive.role}</p>
              </IonText>
            </IonCol>
          </IonRow>
        ))}
      </IonGrid>
    </>
  );

  return (
  <>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* <IonButtons slot="start">
            <IonBackButton defaultHref='/admin/dashboard' />
          </IonButtons> */}
          <IonTitle>Members</IonTitle>
          <UserAdminAvatar />
        </IonToolbar>
        <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as 'executiveMembers' | 'members')}>
        <IonSegmentButton value="members">
            <IonLabel>Members ({members.length})</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="executiveMembers">
            <IonLabel>Executives ({executiveMembers.length})</IonLabel>
          </IonSegmentButton>
         
        </IonSegment>
      </IonHeader>


      <IonContent className='ion-padding-vertical'>
        {/* Render based on the selected segment */}
        {segment === 'executiveMembers' ? executiveMemberSection() : memberSection()}
      </IonContent>

      <SideMenuBtn />
    </IonPage>
  </>
);
};

export default MemberMembers;
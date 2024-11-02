import React, { useState } from 'react';
import { IonPage, IonHeader, IonContent, IonSearchbar, IonGrid, IonRow, IonCol, IonAvatar, IonCard, IonCardContent, IonItem, IonLabel, IonToolbar, IonSegment, IonSegmentButton, IonText, IonTitle, IonImg } from '@ionic/react';
import './Members.css';
import { membersData, MemberType } from '@/data/members_placeholder';
import { useHistory } from 'react-router';
import MemberMembersDetail from './detail';
import SideMenuBtn from '@/components/sideMenuBtn';
import UserAvatar from '@/components/member/userAvatar';

// Main Members Component
const MemberMembers: React.FC = () => {
  const [segment, setSegment] = useState<'members' | 'executives'>('members'); // State for segment
  const [searchText, setSearchText] = useState(''); // State for search text
  const history = useHistory();

  // Function to get records with roles other than 'member'
  function getNonMemberRecords(members: MemberType[]) {
    return members.filter((member) => member.role !== 'member');
  }
  const executives = getNonMemberRecords(membersData);

  // Handle pull-to-refresh event
  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  // Filter members based on search input
  const filteredMembers = membersData.filter(member =>
    member.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Member Section
  const memberSection = () => (
    <>
      <IonSearchbar
        value={searchText}
        onIonInput={e => setSearchText(e.detail.value!)}
        placeholder="Search by name"
      />
      <IonGrid>
        <IonRow>
          {filteredMembers.map((member, index) => (
            <IonCol size="6" key={index}>
              <IonCard className="member-card" routerLink={`/member/members/${member.id}`}>
                <IonCardContent>
                  <IonAvatar className="member-avatar">
                    <img src={member.image} alt={member.name} />
                  </IonAvatar>
                  <IonLabel className="member-name">{member.name}</IonLabel>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </>
  );

  // Executive Section
  const executiveSection = () => (
    <IonGrid>
      {executives.map((executive) => (
        <IonRow key={executive.id} className="ion-margin">
          <IonCol size="12" className="ion-text-center" onClick={() => { history.push(`/member/members/${executive.id}`); }}>
            {/* Profile Image */}
            <IonAvatar style={{ margin: '0 auto', width: '10rem', height: '10rem' }}>
                <IonImg
                  src={executive.image} 
                  alt={executive.name} 
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
              <h3>{executive.name}</h3>
            </IonText>
            {/* Executive Role */}
            <IonText className="executive-role">
              <p>{executive.role}</p>
            </IonText>
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
            <IonTitle>Members</IonTitle>
            <UserAvatar/>
          </IonToolbar>
          <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as 'members' | 'executives')}>
            <IonSegmentButton value="members">
              <IonLabel>Members</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="executives">
              <IonLabel>Executives</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonHeader>

        <IonContent>
          {/* Render based on the selected segment */}
          {segment === 'members' ? memberSection() : executiveSection()}
        </IonContent>

        <SideMenuBtn />
      </IonPage>
    </>
  );
};

export default MemberMembers;

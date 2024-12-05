import React, { useState } from 'react';
import { IonPage, IonHeader, IonContent, IonSearchbar, IonGrid, IonRow, IonCol, IonAvatar, IonCard, IonCardContent, IonItem, IonLabel, IonToolbar, IonSegment, IonSegmentButton, IonText, IonTitle, IonImg, IonButtons, IonBackButton } from '@ionic/react';
import './Members.css';
import { membersData } from '@/data/members_placeholder';
import { useHistory } from 'react-router';
import AdminMembersDetail from './detail';
import { User } from '@/store/interface';
import UserAdminAvatar from '@/components/admin/userAvatar';

// Main Members Component
const AdminMembers: React.FC = () => {
  const [segment, setSegment] = useState<'members' | 'executives'>('members'); // State for segment
  const [searchText, setSearchText] = useState(''); // State for search text
  const history = useHistory();
  
  const memberFullname = (user: User) => {
    return user.firstname + " " + user.lastname
  }

  // Function to get records with roles other than 'member'
  function getNonMemberRecords(members: User[]) {
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
    member.lastname.toLowerCase().includes(searchText.toLowerCase())
  );

  // Member Section
  const activeMemberSection = () => (
    <>
      <IonSearchbar
      className='ion-padding'
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
                    <img src={member.image} alt={memberFullname(member)} />
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
  const NonActiveMemberSection = () => (
    <>
      <IonSearchbar
      className='ion-padding'
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
                    <img src={member.image} alt={memberFullname(member)} />
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
  

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref='/admin/dashboard' />
            </IonButtons>
            <IonTitle>Members</IonTitle>
            <UserAdminAvatar/>
          </IonToolbar>
          <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as 'members' | 'executives')}>
            <IonSegmentButton value="members">
              <IonLabel>Not-Active (3)</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="executives">
              <IonLabel>Active (50)</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonHeader>


        <IonContent className='ion-padding-vertical'>
          {/* Render based on the selected segment */}
          {segment === 'members' ? activeMemberSection() : NonActiveMemberSection()}
        </IonContent>

      </IonPage>
    </>
  );
};

export default AdminMembers;

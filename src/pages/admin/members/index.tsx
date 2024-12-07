import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonContent, IonSearchbar, IonGrid, IonRow, IonCol, IonAvatar, IonCard, IonCardContent, IonItem, IonLabel, IonToolbar, IonSegment, IonSegmentButton, IonText, IonTitle, IonImg, IonButtons, IonBackButton, IonChip } from '@ionic/react';
import './Members.css';
import { useHistory } from 'react-router';
import AdminMembersDetail from './detail';
import { Member, User } from '@/store/interface';
import UserAdminAvatar from '@/components/admin/userAvatar';
import { getActiveMembersOfGroup, getNonActiveMembersOfGroup, initializeMembersAtom, memberFullname } from '@/store/store';
import { useAtom } from 'jotai';

// Main Members Component
const AdminMembers: React.FC = () => {
  const [segment, setSegment] = useState<'nonActiveMembers' | 'activeMembers'>('nonActiveMembers'); // State for segment
  const [searchText, setSearchText] = useState(''); // State for search text
  const history = useHistory();
  
  const [, initializeMembers] = useAtom(initializeMembersAtom);
  const [activeMembers] = useAtom(getActiveMembersOfGroup);
  const [nonActiveMembers] = useAtom(getNonActiveMembersOfGroup);

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
          {activeMembers.map((member:Member, index) => (
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
          {nonActiveMembers.map((member, index) => (
            <IonCol size="6" key={index}>
              <IonCard className="member-card" routerLink={`/admin/members/${member.id}`}>
                <IonCardContent>
                  <IonAvatar className="member-avatar">
                    <img src={member.image_url} alt={memberFullname(member)} />
                  </IonAvatar>
                  <IonLabel className="member-name">{memberFullname(member)}</IonLabel>
                  <IonChip color="tertiary">{member.status}</IonChip>
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
          <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as 'nonActiveMembers' | 'activeMembers')}>
            <IonSegmentButton value="nonActiveMembers">
              <IonLabel>Not-Active (3)</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="activeMembers">
              <IonLabel>Active (50)</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonHeader>


        <IonContent className='ion-padding-vertical'>
          {/* Render based on the selected segment */}
          {segment === 'nonActiveMembers' ? NonActiveMemberSection(): activeMemberSection()}
        </IonContent>

      </IonPage>
    </>
  );
};

export default AdminMembers;

import React, { useState } from 'react';
import { IonPage, IonHeader, IonContent, IonSearchbar, IonGrid, IonRow, IonCol, IonAvatar, IonCard, IonCardContent, IonItem, IonLabel, IonRouterOutlet, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';
import './Members.css';
import { membersData } from '@/data/members_placeholder';
import { Route, RouteComponentProps, useHistory } from 'react-router';
import SideMenuBtn from '../../../components/sideMenuBtn';
import MemberMembersDetail from './detail';


const MemberMembers: React.FC<RouteComponentProps> = ({ match }) => {
  const history = useHistory();
  // Handle pull-to-refresh event
  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  //search
  const [searchText, setSearchText] = useState('');

  // Filter members based on search input
  const filteredMembers = membersData.filter(member =>
    member.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <IonRouterOutlet>
        <Route path={`${match.url}/:id`} component={MemberMembersDetail} />
      </IonRouterOutlet>

      <IonPage>
        {/* Use the AnimatedHeader component */}
        <IonHeader>
          <IonToolbar>
            <IonTitle>Members</IonTitle>
            <IonAvatar slot='end' className='ion-padding'>
              <img src="https://randomuser.me/api/portraits/men/9.jpg" alt="me" />
            </IonAvatar>
          </IonToolbar>
          {/* Searchbar */}
          <IonSearchbar
            value={searchText}
            onIonInput={e => setSearchText(e.detail.value!)}
            placeholder="Search by name"
          />
        </IonHeader>

        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent />
          </IonRefresher>

          {/* Grid for members */}
          <IonGrid>
            <IonRow>
              {filteredMembers.map((member, index) => (
                <IonCol size="6" key={index}>
                  <IonCard className="member-card" routerLink={`/member/members/${member.id}`} >
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
        </IonContent>
        <SideMenuBtn />
      </IonPage>
    </>
  );
};

export default MemberMembers;

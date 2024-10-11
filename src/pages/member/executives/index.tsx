import { IonPage, IonHeader, IonContent, IonToolbar, IonTitle, IonText, IonImg, IonGrid, IonRow, IonCol, IonAvatar, IonRouterOutlet, IonRefresher, IonRefresherContent } from '@ionic/react';
import './Executives.css'; // You can style your component in this file
import SideMenuBtn from '@/components/sideMenuBtn';
import { Route, RouteComponentProps, useHistory } from 'react-router';
import { membersData } from '@/data/members_placeholder';
import MemberExecutivesDetail from './detail';

const executives = getNonMemberRecords(membersData);

// Function to get records without role = "member"
function getNonMemberRecords(members: MemberItem[]) {
  return members.filter((member) => member.role !== 'member');
}

interface MemberItem {
  id: number; // Change this from string to number to match your data,
  name: string;
  image: string;
  role: string;
}

const MemberExecutives :React.FC<RouteComponentProps> = ({ match }) => {
  const history = useHistory();
      // Handle pull-to-refresh event
      const handleRefresh = (event: CustomEvent) => {
        setTimeout(() => {
          event.detail.complete();
        }, 2000);
      };
  return (
    <>
      <IonRouterOutlet>
        <Route path={`${match.url}/:id`} component={MemberExecutivesDetail} />
      </IonRouterOutlet>
      <IonPage>
        {/* Header */}
        <IonHeader>
          <IonToolbar>
            <IonTitle>Executives</IonTitle>
            <IonAvatar slot='end' className='ion-padding'>
              <img src="https://randomuser.me/api/portraits/men/9.jpg" alt="me" />
            </IonAvatar>
          </IonToolbar>
        </IonHeader>

        {/* Main Content */}
        <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent />
          </IonRefresher>
          {/* Title Section */}
          <IonText className="executive-title">
            <h2>Our Executives</h2>
          </IonText>

          <IonText className="executive-subtitle">
            <p>Based on our 2023 Union Election</p>
          </IonText>

          {/* Executives List */}
          <IonGrid>
            {executives.map((executive) => (
              <IonRow key={executive.id} className="ion-justify-content-center">
                <IonCol size="12" className="ion-text-center" onClick={() => { history.push(`/member/executives/${executive.id}`) }}>
                  {/* Profile Image */}

                  <IonAvatar className="executive-image">
                    <img src={executive.image} alt="me" />
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
        </IonContent>

        <SideMenuBtn />
      </IonPage>
    </>
  );
};

export default MemberExecutives;

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
  IonImg,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { membersData } from '@/data/members_placeholder';
import { User } from '@/store/interface';

interface AdminMembersDetailProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const AdminMembersDetail: React.FC<AdminMembersDetailProps> = ({ match }) => {
  const [member, setItem] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const memberFullname = (user: User) => {
    return user.firstname + " " + user.lastname
  }

  useEffect(() => {
    const foundItem = membersData.find((data) => data.id === match.params.id);
    setItem(foundItem || null);
    setIsLoading(false);

    return () => {
      setItem(null);
    };
  }, [match.params.id]);

  const renderContent = () => {
    if (isLoading) {
      return <IonText>Loading...</IonText>;
    }

    if (!member) {
      return <IonText>No member found</IonText>;
    }

    return (
      <>
        <IonGrid style={{ height: '100%', paddingTop: '4rem' }}>
          <IonRow style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <IonCol size="12" style={{ textAlign: 'center' }}>
              {/* Using IonAvatar to create a circular container for the image */}
              <IonAvatar style={{ margin: '0 auto', width: '15rem', height: '15rem' }}>
                <IonImg
                  src={member.image}
                  alt={memberFullname(member)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                />
              </IonAvatar>
              <IonText className="member-detail-name">
                <h3>{memberFullname(member)}</h3>
              </IonText>

              <IonText className="member-detail-role">
                <p>{member.role}</p>
              </IonText>
            </IonCol>

          </IonRow>
        </IonGrid>

      </>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/member/members" /> {/* Reuse the back button */}
          </IonButtons>
          <IonTitle>{member ? memberFullname(member) : 'Member'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">
        {renderContent()}
      </IonContent>
    </IonPage>
  );
};

export default AdminMembersDetail;

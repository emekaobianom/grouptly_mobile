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
import { membersData, MemberType } from '@/data/members_placeholder';

interface MemberMembersDetailProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const MemberMembersDetail: React.FC<MemberMembersDetailProps> = ({ match }) => {
  const [item, setItem] = useState<MemberType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

    if (!item) {
      return <IonText>No item found</IonText>;
    }

    return (
      <>
        <IonGrid style={{ height: '100%', paddingTop: '4rem' }}>
          <IonRow style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <IonCol size="12" style={{ textAlign: 'center' }}>
              {/* Using IonAvatar to create a circular container for the image */}
              <IonAvatar style={{ margin: '0 auto', width: '15rem', height: '15rem' }}>
                <IonImg
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                />
              </IonAvatar>
              <IonText className="member-detail-name">
                <h3>{item.name}</h3>
              </IonText>

              <IonText className="member-detail-role">
                <p>{item.role}</p>
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
          <IonTitle>{item ? item.name : 'Member'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">
        {renderContent()}
      </IonContent>
    </IonPage>
  );
};

export default MemberMembersDetail;

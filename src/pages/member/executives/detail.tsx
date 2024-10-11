import React, { useEffect, useState } from 'react';
import {
  IonBackButton,
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
} from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { membersData } from '@/data/members_placeholder';
import "./executivesDetail.css"
// Adjust the type for a single donation item to reflect the actual data
interface MemberItem {
  id: number; // Change this from string to number to match your data,
  name: string;
  image: string;
  role: string;
}

interface MemberExecutivesDetailProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const MemberExecutivesDetail: React.FC<MemberExecutivesDetailProps> = ({ match }) => {
  const [item, setItem] = useState<MemberItem | null>(null);

  useEffect(() => {
    // Convert match.params.id to a number, since donationsItemsData uses numeric ids
    const id = Number(match.params.id);
    const foundItem = membersData.find((data) => data.id === id);
    setItem(foundItem || null);
  }, [match.params.id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          {item ? (
            <IonTitle>{item.name}</IonTitle>
          ) : (
            <IonTitle>Executive</IonTitle>
          )}

        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">
        {/* Only render the card if `item` is not null */}
        {item ? (
          <IonGrid>
            <IonRow>
              <IonCol size="12" className="ion-text-center">
                {/* Profile Image */}

                <IonAvatar className="member-detail-image">
                  <img src={item.image} alt="me" />
                </IonAvatar>
                {/* Executive Name */}
                <IonText className="member-detail-name">
                  <h3>{item.name}</h3>
                </IonText>

                {/* Executive Role */}
                <IonText className="member-detail-role">
                  <p>{item.role}</p>
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        ) : (
          <IonText>No item found</IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MemberExecutivesDetail;

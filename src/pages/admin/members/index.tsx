import { IonContent, IonPage, IonButton, IonText, IonCol, IonRow, IonGrid, IonImg, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import SideMenuBtn from '../../../components/sideMenuBtn';

const AdminMembers: React.FC = () => {
  const history = useHistory();

  const handleNext = async () => {
    // await storeData('firstAppVisit', 'false');
    //history.replace('/signup');
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="auto">
              <IonText color="dark">
                <h6 className="bold-text">Members</h6>
              </IonText>
            </IonCol>

            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Card Title</IonCardTitle>
                  <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
              </IonCard>
            </IonCol>


            <IonCol size="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Card Title</IonCardTitle>
                  <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Card Title</IonCardTitle>
                  <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
              </IonCard>
            </IonCol>



          </IonRow>
        </IonGrid>
      </IonContent>
      <SideMenuBtn />
    </IonPage>
  );
};

export default AdminMembers;

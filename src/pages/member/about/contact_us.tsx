import { IonContent, IonPage, IonButton, IonText, IonCol, IonRow, IonGrid, IonImg, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonAvatar, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import SideMenuBtn from '../../../components/sideMenuBtn';

const MemberContactUs: React.FC = () => {
  const history = useHistory();

  const handleNext = async () => {
    // await storeData('firstAppVisit', 'false');
    //history.replace('/signup');
  };

  return (
    <IonPage>
      <IonHeader>
       <IonToolbar>
            <IonTitle>Contact Us</IonTitle>
            <IonAvatar slot='end' className='ion-padding'>
              <img src="https://randomuser.me/api/portraits/men/9.jpg" alt="me" />
            </IonAvatar>
          </IonToolbar>
       </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="auto">
              <IonText color="dark">
                <h6 className="bold-text">Contact Us</h6>
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

export default MemberContactUs;

import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonText, IonAvatar, IonRefresher, IonRefresherContent, IonBackButton, IonButtons, IonButton } from '@ionic/react';

const IntroTerms: React.FC = () => {
  // Handle pull-to-refresh event
  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref='/main/intro' />
          </IonButtons>
          <IonTitle>Terms & Conditions</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding'>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <IonText>
          <h2>Introduction</h2>
          <p>
            Welcome to the Grouptly mobile app. By using our services, you agree to comply with
            and be bound by the following terms and conditions. Please review them carefully.
          </p>

          <h3>1. Use of the App</h3>
          <p>
            The Grouptly app allows users to join groups from a pool of available groups.
            You agree to use this app for lawful purposes only and in a way that does not infringe
            the rights of others or restrict their use of the app.
          </p>

          <h4>1.1 Account Registration</h4>
          <p>
            To access certain features of the app, you must create an account.
            You are responsible for maintaining the confidentiality of your login credentials.
          </p>

          <h3>2. User Responsibilities</h3>
          <p>
            As a user of Grouptly, you are responsible for the accuracy of the information you provide,
            and you agree to update your profile as necessary. You also agree not to misuse the app
            in any way, including violating any local laws or infringing upon the rights of others.
          </p>

          <h3>3. Group Participation</h3>
          <p>
            When joining groups, you agree to respect the group’s guidelines and behave appropriately
            within the group. Failure to do so may result in removal from the group or suspension from the app.
          </p>

          <h3>4. Termination of Use</h3>
          <p>
            We reserve the right to suspend or terminate your account at any time for any reason,
            including violating these terms or engaging in inappropriate behavior.
          </p>

          <h3>5. Liability</h3>
          <p>
            Grouptly is not responsible for any damages or losses resulting from your use of the app
            or participation in groups. The app is provided "as is," and we make no warranties or
            guarantees regarding the functionality or availability of the app.
          </p>

          <h3>6. Amendments</h3>
          <p>
            These terms and conditions may be updated periodically. By continuing to use the app,
            you agree to any changes made.
          </p>

          <h3>7. Governing Law</h3>
          <p>
            These terms are governed by the laws of US, and any disputes
            arising from the use of the app will be resolved in the appropriate courts.
          </p>

          <p><strong>Last Updated: 19th October, 2024</strong></p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default IntroTerms;

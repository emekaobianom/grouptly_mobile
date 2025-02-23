import { Redirect, Route, useHistory } from 'react-router-dom';
import {
  IonApp,
  IonImg,
  IonRouterOutlet,
  setupIonicReact,
  IonAlert
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useIonAlert } from '@ionic/react';

// Existing CSS imports remain the same
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/high-contrast-dark.class.css';
import '@/theme/variables.css';
import '@/theme/personal.css';

import RouteMain from '@/components/routeMain';
import RouteMember from '@/components/routeMember';
import RouteAdmin from '@/components/routeAdmin';

setupIonicReact();

import '@aws-amplify/ui-react/styles.css';
import { 
  SignInInput, 
  SignUpInput, 
  signIn, 
  signUp, 
  ConfirmSignUpInput, 
  ConfirmSignUpOutput, 
  confirmSignUp, 
  SignInOutput,
  SignUpOutput 
} from 'aws-amplify/auth';
import { Authenticator } from '@aws-amplify/ui-react';
import { components, formFields } from '@/components/auth/authenticator';

// Using a simple object to store credentials temporarily
const authCredentials = {
  username: '',
  password: ''
};

const App: React.FC = () => {
  const services = {
    async handleSignUp(formData: SignUpInput) {
      const result: SignUpOutput = await signUp({
        username: formData.username,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.username // Assuming username is email
          }
        }
      });

      // Store credentials for use in confirmSignUp
      authCredentials.username = formData.username;
      authCredentials.password = formData.password;

      return result;
    },

    async handleConfirmSignUp(formData: ConfirmSignUpInput) {
      const result: ConfirmSignUpOutput = await confirmSignUp({
        username: authCredentials.username,
        confirmationCode: formData.confirmationCode
      });

      if (result.isSignUpComplete) {
        const signInResult = await signIn({
          username: authCredentials.username,
          password: authCredentials.password
        });

        if (signInResult.isSignedIn) {
          window.location.href = '/main/create_user';
        }
      }

      return result;
    },

    async handleSignIn(formData: SignInInput) {
      const result: SignInOutput = await signIn(formData);
      if (result.isSignedIn) {
        window.location.href = '/main/start';
      }
      return result;
    }
  };

  return (
    <Authenticator components={components} formFields={formFields} services={services}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/main" component={RouteMain} />
            <Route path="/admin" component={RouteAdmin} />
            <Route path="/member" component={RouteMember} />
            <Redirect exact from="/" to="/main/start" />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Authenticator>
  );
};

export default App;
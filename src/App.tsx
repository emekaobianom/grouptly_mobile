import { Redirect, Route, useHistory } from 'react-router-dom';
import { IonApp, IonImg, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/high-contrast-dark.class.css';

/* Theme variables */
import '@/theme/variables.css';
import '@/theme/personal.css';

import RouteMain from '@/components/routeMain';
import RouteMember from '@/components/routeMember';
import RouteAdmin from '@/components/routeAdmin';

setupIonicReact();


import '@aws-amplify/ui-react/styles.css';

import { SignInInput, signIn, ConfirmSignUpInput, ConfirmSignUpOutput, confirmSignUp, SignInOutput } from 'aws-amplify/auth';
import { Authenticator } from '@aws-amplify/ui-react';


import { components, formFields } from '@/components/auth/authenticator';


const App: React.FC = () => {

  const services = {

    async handleConfirmSignUp(formData: ConfirmSignUpInput) {
      // Log the form data for debugging
      console.log('Confirm Sign Up:', formData);

      // Attempt to confirm sign up
      const result: ConfirmSignUpOutput = await confirmSignUp(formData);

      // Log the successful result
      console.log('Confirm Sign Up result:', result);

      if (result.isSignUpComplete) {
        // Create a new user in the database      
        window.location.href = '/main/create_user';

      }

      return result;
    },

    async handleSignIn(formData: SignInInput) {
      // Log the form data for debugging
      console.log('Sign In:', formData);

      // Attempt to sign in
      const result: SignInOutput = await signIn(formData);

      // Log the successful result
      console.log('Confirm Sign Up result:', result);

      if (result.isSignedIn) {
        // Create a new user in the database      
        window.location.href = '/main/choose';
      }

      // Attempt to
      return result;
    }




  };



  // Handle the login button click
  const handleLogin = async (userId: string) => {
    try {
      initializeUser(userId); // Call initialize user atom
    } catch (error) {
      console.error("Failed to initialize user:", error);
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
            <Redirect exact from="/" to="/main/choose" />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Authenticator>
  );
};

export default App;
function initializeUser(userId: string) {
  throw new Error('Function not implemented.');
}


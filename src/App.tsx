import { Redirect, Route, useLocation } from 'react-router-dom';
import { IonApp,IonImg,IonRouterOutlet, IonText, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import icon from '@/assets/images/icon.png';

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
import './theme/variables.css';

import RouteMain from './components/routeMain';
import RouteMember from './components/routeMember';
import RouteAdmin from './components/routeAdmin';

setupIonicReact();

//-----------------------------------------------
import { Authenticator, Button, Heading, useAuthenticator, useTheme, View } from '@aws-amplify/ui-react';
// import { Amplify } from 'aws-amplify';
// import outputs from '../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';

// Amplify.configure(outputs);

//-----------------------------------------------

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
       <IonImg
                src={icon}
                style={{
                  margin: '0 auto',
                  width: '5rem',
                  height: '5rem'
                }}
                alt="Grouptly Icon"
              />
      </View>
    );
  },

  Footer() {
    const { tokens } = useTheme();

    return (
      // <View textAlign="center" padding={tokens.space.large}>
      //   <IonText >
      //     &copy; All Rights Reserved
      //   </IonText>
      // </View>
      <></>
    );
  },

  SignIn: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Sign in to your account
        </Heading>
      );
    },
    Footer() {
      const { toForgotPassword } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toForgotPassword}
            size="small"
            variation="link"
          >
            Reset Password
          </Button>
        </View>
      );
    },
  },

  SignUp: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Create a new account
        </Heading>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toSignIn}
            size="small"
            variation="link"
          >
            Back to Sign In
          </Button>
        </View>
      );
    },
  },
  ConfirmSignUp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <IonText>Footer Information</IonText>;
    },
  },
  SetupTotp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <IonText>Footer Information</IonText>;
    },
  },
  ConfirmSignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <IonText>Footer Information</IonText>;
    },
  },
  ForgotPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <IonText>Footer Information</IonText>;
    },
  },
  ConfirmResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <IonText>Footer Information</IonText>;
    },
  },
};

const formFields = {
  signIn: {
    // email: {
    //   placeholder: 'Enter your email',
    // },
  },
  signUp: {
    // password: {
    //   label: 'Password:',
    //   placeholder: 'Enter your Password:',
    //   isRequired: false,
    //   order: 2,
    // },
    // confirm_password: {
    //   label: 'Confirm Password:',
    //   order: 1,
    // },
  },
  forceNewPassword: {
    password: {
      placeholder: 'Enter your Password:',
    },
  },
  forgotPassword: {
    username: {
      placeholder: 'Enter your email:',
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      placeholder: 'Enter your Confirmation Code:',
      label: 'New Label',
      isRequired: false,
    },
    confirm_password: {
      placeholder: 'Enter your Password Please:',
    },
  },
  setupTotp: {
    QR: {
      totpIssuer: 'test issuer',
      totpUsername: 'amplify_qr_test_user',
    },
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
  confirmSignIn: {
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
};

//--------------------------------------------


const App: React.FC = () => {
  
  return (
    <Authenticator  formFields={formFields} components={components} signUpAttributes={['nickname']} >                  
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/main" component={RouteMain} />
          <Route path="/admin" component={RouteAdmin} />
          <Route path="/member" component={RouteMember} />
          <Redirect exact from="/" to="/main/welcome" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
</Authenticator>
  );
};

export default App;

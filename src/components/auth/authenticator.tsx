import { useTheme, View, Heading, useAuthenticator, Button } from "@aws-amplify/ui-react";
import { IonImg, IonText } from "@ionic/react";
import icon from '@/assets/images/icon.png';


const components = {
    Header() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.large}>
          {/* <IonImg
            src={icon}
            style={{
              margin: '0 auto',
              width: '5rem',
              height: '5rem'
            }}
            alt="Grouptly Icon"
          /> */}
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
          <>
            <IonImg
              src={icon}
              style={{
                margin: '0 auto',
                width: '5rem',
                height: '5rem'
              }}
              alt="Grouptly Icon"
            />
  
            <Heading
              padding={`0 0 0 ${tokens.space.xl}`}
              level={4}
            >
              Sign In
            </Heading>
          </>
        );
      },
      Footer() {
        const { toForgotPassword, toSignUp } = useAuthenticator();
  
        return (
          <View textAlign="center">
            <Button
              fontWeight="normal"
              onClick={toForgotPassword}
              size="small"
              variation="link"
            >
              Forgot Password
            </Button>
            <Button
              fontWeight="normal"
              onClick={toSignUp}
              size="large"
              variation="link"
            >
              Create Account
            </Button>
          </View>
        );
      },
    },
  
    SignUp: {
      Header() {
        const { tokens } = useTheme();
  
        return (
          <>
            <IonImg
              src={icon}
              style={{
                margin: '0 auto',
                width: '5rem',
                height: '5rem'
              }}
              alt="Grouptly Icon"
            />
            <Heading
              padding={`0 0 0 ${tokens.space.xl}`}
              level={4}
            >
              Create a new account
            </Heading>
          </>
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
          <>
          <IonImg
            src={icon}
            style={{
              margin: '0 auto',
              width: '5rem',
              height: '5rem'
            }}
            alt="Grouptly Icon"
          />
          <Heading
            padding={`0 0 0 ${tokens.space.xl}`}
            level={4}
          >
            Confirm Sign Up
          </Heading>
          </>
        );
      },
      Footer() {
        return <IonText></IonText>;
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
          <>
          <IonImg
            src={icon}
            style={{
              margin: '0 auto',
              width: '5rem',
              height: '5rem'
            }}
            alt="Grouptly Icon"
          />
          <Heading
            padding={`0 0 0 ${tokens.space.xl}`}
            level={4}
          >
            Confirm SignIn
          </Heading>
          </>
        );
      },
      Footer() {
        return <IonText></IonText>;
      },
    },
    ForgotPassword: { 
      Header() {
        const { tokens } = useTheme();
        return (
          <>
          <IonImg
            src={icon}
            style={{
              margin: '0 auto',
              width: '5rem',
              height: '5rem'
            }}
            alt="Grouptly Icon"
          />
          <Heading
            padding={`0 0 0 ${tokens.space.xl}`}
            level={4}
          >
            Forgot Password
          </Heading>
          </>
        );
      },
      Footer() {
        return <></>;
      },
    },
    ConfirmResetPassword: {
      Header() {
        const { tokens } = useTheme();
        return (
          <>
          <IonImg
            src={icon}
            style={{
              margin: '0 auto',
              width: '5rem',
              height: '5rem'
            }}
            alt="Grouptly Icon"
          />
          <Heading
            padding={`0 0 0 ${tokens.space.xl}`}
            level={4}
          >
          Reset Password
          </Heading>
          </>
        );
      },
      Footer() {
        return <IonText></IonText>;
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


  export { components, formFields };
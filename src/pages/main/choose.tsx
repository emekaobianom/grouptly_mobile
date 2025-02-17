import {
  IonContent,
  IonPage,
  IonButton,
  IonText,
  IonCol,
  IonRow,
  IonGrid,
  IonIcon,
  IonCard,
  IonCardContent,
  IonImg,
  IonAlert,
  IonHeader,
  IonToolbar,
  IonActionSheet,
  IonSpinner,
  IonChip,
  IonLabel,
  IonSkeletonText,
  IonThumbnail,
  IonAvatar,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { checkmarkCircle, closeCircle, ellipsisVertical, handLeft, personCircleOutline, personCircleSharp, timer } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import UserAvatar from '@/components/member/userAvatar';
import { Member, UserStatus, User } from '@/store/interface';
import logoPlaceholder from '@/assets/images/logo_placeholder.png';
import icon from '@/assets/images/icon.png';
import { initializeSelectedGroupAtom } from '@/store/atoms/groupAtoms';
import { removeMemberAtom } from '@/store/atoms/memberAtoms';
import { userAtom, initializeUserAtom, logoutUserAtom } from '@/store/atoms/userAtoms';
import EmptyListIndicator from '@/components/emptyListIndicator';
import { Button, Heading, useAuthenticator, useTheme, View, withAuthenticator } from '@aws-amplify/ui-react';


// ---------------------------------------------------------------


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



//-----------------------------------------------------------------



const Choose: React.FC = () => {
  const { user: signedInUser } = useAuthenticator((context) => [context.user]);
  const { signOut, route } = useAuthenticator((context) => [context.route]);
  const [, logoutUser] = useAtom(logoutUserAtom);// Atom to initialize user data

  const history = useHistory();
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [actionSheetIsOpen, setActionSheetIsOpen] = useState(false);
  const [selectedMembership, setSelectedMember] = useState<Member | null>(null); // Track selected group for ActionSheet

  const [user] = useAtom(userAtom);
  const [, initializeUser] = useAtom(initializeUserAtom);// Atom to initialize user data
  const [, initializeSelectedGroup] = useAtom(initializeSelectedGroupAtom);// Atom to initialize user data

  const removeMember = useSetAtom(removeMemberAtom);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false); // Atom to manage submitting state

  const [loaded, setLoaded] = useState(false);

  // Monitor the user state
  useEffect(() => { //run once on startup  

    const initialize = async () => {
      console.log("user in welcome ", signedInUser.userId)
      logoutUser();
      await handleLogin(signedInUser.userId);
      //  console.log("user in choose ", user);
      setLoaded(true);
    };
    initialize();
  }, []);

  // const handleSignOut = () => {
  //   //logoutUser();
  //   history.replace("/main/welcome");
  //   // signOut();
  // };


  // Handle the login button click
  const handleLogin = async (userId: string) => {
    setLoading(true); // Set the loading state to true
    try {
      await initializeUser(userId); // Call initialize user atom
      // history.replace('/main/choose');

    } catch (error) {
      console.error("Failed to initialize user:", error);
      setLoading(false); // Reset loading state in case of an error
    }
  };

  // const handleLogOut = async () => {
  //   setLoading(true);
  //   try {
  //     signOut();
  //   } catch (error) {
  //     console.error('Failed to log out:', error);
  //     setLoading(false);
  //     setAlertIsOpen(true);
  //   }
  // };

  const [loadingCardId, setLoadingCardId] = useState<string | null>(null); // Track loading state for each card

  const handleGroupClick = async (membership: Member) => {
    setLoadingCardId(membership.id); // Set the current card as loading
    try {
      console.log("membership.groupId ", membership.group?.id);
      await initializeSelectedGroup(String(membership.group?.id));
      if (membership.status === UserStatus.Active) {
        history.push('/member/dashboard?openMenu=true');
      } else {
        setAlertIsOpen(true);
      }
    } catch (error) {
      console.error("Error navigating to group:", error);
    } finally {
      setLoadingCardId(null); // Reset the loading state
    }
  };

  const openActionSheet = (member: Member) => {
    setSelectedMember(member); // Set the selected group
    setActionSheetIsOpen(true); // Open the ActionSheet
  };

  //------------

  return (

    <>
      {loaded && (<>
        <style>
          {`
          .small-chip {
          font-size:0.8rem;
          }
        `}
        </style>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <UserAvatar />
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding" fullscreen>
            <IonGrid style={{ height: '100%' }}>
              <IonRow style={{ justifyContent: 'space-between', height: '100%' }}>
                <IonCol size="auto">
                  <IonText color="dark">
                    <h3 className="bold-text">Choose</h3>
                    <p className="bold-text ion-no-margin">Tap to enter your group</p>
                  </IonText>
                </IonCol>

                <IonCol size="12">
                  {user?.memberships && user.memberships.length > 0 ? (
                    user.memberships.map((membership: Member) => (
                      <IonCard button={true} key={membership.id} className='my-card' style={{ cursor: 'pointer'}}>
                        <IonCardContent className="ion-no-padding">
                          <IonGrid>

                            <IonRow>
                              <IonCol>
                                <IonRow onClick={() => handleGroupClick(membership)}>
                                  {/* Group Logo or Placeholder */}

                                  {loadingCardId === membership.id ? ( // Show spinner if this card is loading

                                    <IonCol size='3'>
                                      <IonSpinner style={{ width: '40px' ,height:'40px'}} />
                                    </IonCol>
                                  ) :
                                    <IonCol size="3">

                                      {membership.group?.logo &&
                                        <IonImg
                                          src={(() => ((membership.group.logo == "default_logo") ? icon : membership.group.logo))()}
                                          style={{
                                            width: 'auto',
                                            height: 'auto',
                                            objectFit: 'contain',
                                            borderRadius: '50%',
                                          }}
                                        />
                                      }
                                    </IonCol>
                                  }


                                  {/* Group Details */}
                                  <IonCol>
                                    <p className="bold-text">{membership.group?.long_name || 'Unknown Group'}</p>
                                    <IonText color="medium">
                                      <small>{membership.group?.location || 'Unknown Location'}</small>
                                    </IonText>
                                    <br />
                                    {/* Membership Status Icon */}

                                    {membership.status === UserStatus.Active && (
                                      <IonChip color="secondary" className='small-chip'>
                                        <IonIcon icon={checkmarkCircle} />
                                        <IonLabel>{membership.status}</IonLabel>
                                      </IonChip>
                                    )}
                                    {membership.status === UserStatus.Pending && (
                                      <IonChip color="tertiary" className='small-chip' >
                                        <IonIcon icon={timer} />
                                        <IonLabel>{membership.status}</IonLabel>
                                      </IonChip>
                                    )}
                                    {membership.status === UserStatus.Suspended && (
                                      <IonChip color="dark">
                                        <IonIcon icon={handLeft} />
                                        <IonLabel>{membership.status}</IonLabel>
                                      </IonChip>
                                    )}
                                    {membership.status === UserStatus.Rejected && (
                                      <IonChip color="danger" className='small-chip'>
                                        <IonIcon icon={closeCircle} />
                                        <IonLabel>{membership.status}</IonLabel>
                                      </IonChip>
                                    )}

                                    {membership.group?.super_admin_user_id === user.id && (
                                      <IonChip color="light" >
                                        <IonIcon icon={personCircleOutline} />
                                        {/* <IonLabel>Admin</IonLabel> */}
                                      </IonChip>
                                    )}
                                  </IonCol>
                                </IonRow>
                              </IonCol>

                              {/* Action Button */}
                              <IonCol size="2">
                                <IonButton fill="clear" onClick={() => membership.group && openActionSheet(membership)}>
                                  <IonIcon icon={ellipsisVertical} />
                                </IonButton>
                              </IonCol>
                            </IonRow>
                          </IonGrid>
                        </IonCardContent>
                      </IonCard>
                    ))
                  ) : (
                    <EmptyListIndicator pagename="groups" />
                  )}
                </IonCol>


                <IonCol size="12" style={{ textAlign: 'center' }}>
                  <IonButton expand="block" color="light" shape="round" routerLink="/main/join">
                    Join or Create Group
                  </IonButton>
                  <IonButton
                    style={{ marginTop: '2rem' }}
                    color="light"
                    shape="round"
                    onClick={signOut}
                  >
                    Log Out
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>

          <IonAlert
            isOpen={alertIsOpen}
            header="Group Not Active"
            subHeader="Your Request is still pending"
            message="Once the group admin accepts you, you can enter this group."
            buttons={['Okay']}
            onDidDismiss={() => setAlertIsOpen(false)}
          />

          <IonActionSheet
            isOpen={actionSheetIsOpen}
            onDidDismiss={() => setActionSheetIsOpen(false)}
            header={
              deleting
                ? "Leaving group..."
                : selectedMembership?.group?.long_name || "Unknown Group"
            }
            buttons={[
              {
                text: 'Leave this Group',
                role: 'destructive',
                data: { action: 'delete' },
                handler: async () => {
                  if (!selectedMembership || !selectedMembership.group || !user) return; // Ensure all required fields are defined
                  setDeleting(true); // Set the submitting state to true              
                  try {
                    console.log("Membership ID:", selectedMembership.id);
                    await removeMember(selectedMembership.id);
                    await initializeUser(user.id); // Call initialize user atom
                    setDeleting(false);
                    history.replace("/main/choose");
                  } catch (error) {
                    console.error("Failed to leave group:", error);
                    setDeleting(false); // Reset submitting state in case of an error
                  }
                },
              },
              {
                text: 'Cancel',
                role: 'cancel',
                data: { action: 'cancel' },
              },
            ]}
          />

        </IonPage>
      </>)}

      {!loaded && (
         <IonPage>
         <IonContent className="ion-padding" fullscreen>
           <IonGrid style={{ height: '100%', paddingTop: '4rem' }}> 
             <IonRow style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
               <IonCol size="12" style={{ textAlign: 'center' }}>
              <IonImg
                src={icon}
                style={{ margin: '0 auto', width: '15rem', height: '15rem' }}
                alt="Grouptly Icon"
              />
                 <br />
                 <IonSpinner name="dots"></IonSpinner>
               </IonCol>
             </IonRow>
           </IonGrid>
         </IonContent>
       </IonPage>
      )}
    </>
  );
};
export default withAuthenticator(Choose, { components, formFields ,variation: 'modal' });

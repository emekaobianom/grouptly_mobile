import {
    IonContent,
    IonPage,
    IonCol,
    IonRow,
    IonGrid,
    IonImg,
    IonSpinner,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import icon from '@/assets/images/icon.png';
import { initializeUserAtom, updateUserFcmTokenAtom } from '@/store/atoms/userAtoms';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { registerPushNotifications } from '@/utils/pushNotifications';

const Start: React.FC = () => {
    const history = useHistory();
    const { user: signedInUser } = useAuthenticator((context) => [context.user]);
    const initializeUser = useSetAtom(initializeUserAtom);
    const updateFcmToken = useSetAtom(updateUserFcmTokenAtom);

    useEffect(() => {
        let isMounted = true;
    
        const initialize = async () => {
            if (!signedInUser?.userId) {
                if (isMounted) history.replace('/main/create_user');
                return;
            }
    
            const resultUser = await initializeUser(signedInUser.userId);
            if (!isMounted) return;
    
            if (resultUser === null) {
                history.replace('/main/create_user');
            } else {
                // console.log('User initialized, ID:', resultUser.id);
                const handleToken = async (token: string) => {
                    await updateFcmToken({ userId: resultUser.id, newFcmToken: token });
                };
                await registerPushNotifications(handleToken);
                if (isMounted) history.replace('/main/choose');
            }
        };
    
        initialize();
    
        return () => {
            isMounted = false;
        };
    }, [signedInUser, history, initializeUser, updateFcmToken]); // Add updateFcmToken to deps

    return (
        <IonPage>
            <IonContent className="ion-padding" fullscreen>
                <IonGrid style={{ height: '100%', paddingTop: '4rem' }}>
                    <IonRow className="ion-justify-center ion-align-items-center" style={{ height: '100%' }}>
                        <IonCol size="12" className="ion-text-center">
                            <IonImg
                                src={icon}
                                style={{ margin: '0 auto', width: '15rem', height: '15rem' }}
                                alt="Grouptly Icon"
                            />
                            <div style={{ marginTop: '1rem' }}>
                                <IonSpinner name="dots" />
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Start;
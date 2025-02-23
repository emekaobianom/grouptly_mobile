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
import { useState, useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import icon from '@/assets/images/icon.png';
import { initializeUserAtom } from '@/store/atoms/userAtoms';
import {  useAuthenticator } from '@aws-amplify/ui-react';

const Start: React.FC = () => {
    const history = useHistory();
    const { user: signedInUser } = useAuthenticator((context) => [context.user]);

    const [, initializeUser] = useAtom(initializeUserAtom);// Atom to initialize user data

    // Monitor the user state
    useEffect(() => { //run once on startup  

        const initialize = async () => {
            const resultUser = await initializeUser(signedInUser.userId);
            if (resultUser == null) {
                history.replace('/main/create_user');
            }
            else {
                history.replace('/main/choose');
            }
        };
        initialize();
    }, []);



    return (

        <>
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
        </>
    );
};
export default Start;

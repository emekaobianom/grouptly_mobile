
import React, { useEffect } from 'react';
import {
    IonButtons,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage,
    IonText,
    IonAvatar,
    IonGrid,
    IonCol,
    IonRow,
    IonBackButton,
    IonImg,
    IonIcon,
    IonButton,
    IonPopover,
    IonItem,
    IonList,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAtom } from 'jotai/react';
import { call, closeOutline, closeSharp, createOutline, createSharp, ellipsisVerticalOutline, ellipsisVerticalSharp, man, woman } from 'ionicons/icons';
import { userAtom } from '@/store/atoms/userAtoms';
import maleIcon from '@/assets/images/male.png';
import femaleIcon from '@/assets/images/female.png';
import { getDynamicImageName } from '@/utils/simpleCases';
import { useAuthenticator } from '@aws-amplify/ui-react';



const MainProfile: React.FC = () => {
    const history = useHistory();
    const [user] = useAtom(userAtom);
    const { signOut, route } = useAuthenticator((context) => [context.route]);

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton icon={closeSharp} />
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton onClick={() => history.push('/main/profile/edit')}>
                            <IonIcon icon={createSharp} />
                        </IonButton>
                        <IonButton id="side-menu-profile-index-button">
                            <IonIcon icon={ellipsisVerticalSharp} />
                        </IonButton>

                        <IonPopover trigger="side-menu-profile-index-button" dismissOnSelect={true} side="bottom" alignment="start">
                            <IonContent>
                                <IonList>
                                    <IonItem button={true} detail={false}>
                                        Help
                                    </IonItem>
                                </IonList>
                            </IonContent>
                        </IonPopover>


                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent class="ion-padding">
                <IonGrid style={{ height: '100%' }}>
                    <IonRow
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <IonCol size="12" style={{ textAlign: 'center' }}>
                            {/* Display user avatar */}
                            <IonAvatar style={{ margin: '0 auto', width: '15rem', height: '15rem' }}>
                                <IonImg
                                    src={user?.image || ((user?.gender == "male") ? maleIcon : femaleIcon)}
                                    alt={user?.fullname}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '50%',
                                    }}
                                />
                            </IonAvatar>

                            {/* Display user name and role */}
                            <IonText className="user-detail-name">
                                <h3> {user?.fullname}</h3>
                            </IonText>

                        </IonCol>

                        <IonCol size="12" style={{ textAlign: 'center' }}>
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
        </IonPage>
    );
};

export default MainProfile;

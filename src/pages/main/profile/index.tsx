
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
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAtom } from 'jotai/react';
import { call, closeOutline, man, woman } from 'ionicons/icons';
import { userAtom } from '@/store/atoms/userAtoms';
import maleIcon from '@/assets/images/male.png';
import femaleIcon from '@/assets/images/female.png';



const MainProfile: React.FC = () => {
    const history = useHistory();
    const [user] = useAtom(userAtom);

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="end">
                        <IonBackButton icon={closeOutline} />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent class="ion-padding">
                <IonGrid style={{ height: '100%'}}>
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
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default MainProfile;

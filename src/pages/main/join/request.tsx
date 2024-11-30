import React, { useState, useEffect } from 'react';
import logoPlaceholder from '@/assets/images/logo_placeholder.png';
import {
    IonBackButton,
    IonButtons,
    IonButton,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage,
    IonInput,
    IonItem,
    IonCheckbox,
    IonLabel,
    IonImg,
    IonAvatar,
    IonCol,
    IonGrid,
    IonRow,
    IonTextarea,
    IonText,
    IonCard,
    IonCardContent,
    IonSpinner,
} from '@ionic/react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { groupsData } from '@/data/group_placeholder';
import { addGroupAtom, addUserGroupAtom, initializeUserAtom, userAtom } from '@/store/store';
import { useAtom, useSetAtom } from 'jotai';
import { User } from '@/store/interface';

interface MainJoinRequestProps extends RouteComponentProps<{ id: string }> { }

const MainJoinRequest: React.FC<MainJoinRequestProps> = ({ match }) => {

    const history = useHistory();
    const addUserGroup = useSetAtom(addUserGroupAtom);

    // State for form fields
    const [, initializeUser] = useAtom(initializeUserAtom);// Atom to initialize user data
    const [user]: any = useAtom(userAtom);
    const [form, setForm] = useState({ description: '' });
    const [group, setGroup] = useState<any>(null);
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false); // State to track checkbox
    const [isFormValid, setIsFormValid] = useState(false); // Tracks form validity
    const [isSubmitting, setIsSubmitting] = useState(false); // Tracks submission state

    const memberFullname = (user: User) => user.firstname + ' ' + user.lastname;

    // Fetch group data on component mount
    useEffect(() => {
        const group = groupsData.find((group) => group.id === match.params.id);
        setGroup(group);
    }, [match.params.id]);

    // Validate form whenever termsAccepted changes
    useEffect(() => {
        setIsFormValid(termsAccepted);
    }, [termsAccepted]);

    const handleSubmit = async () => {
        if (!isFormValid) return;

        setIsSubmitting(true); // Show loading spinner
        try {
            await addUserGroup(group, "pending");
            await initializeUser(); // Call initialize user atom
            setIsSubmitting(false);
            history.replace("/main/choose");
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false); // Hide loading spinner
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/main/join"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Request to Join</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <IonCol size="12" style={{ textAlign: 'center' }}>
                            <IonAvatar style={{ margin: '0 auto', width: '15rem', height: '15rem' }}>
                                <IonImg
                                    src={group?.logo || logoPlaceholder}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '50%',
                                    }}
                                    alt="Group logo"
                                />
                            </IonAvatar>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="6">
                            <IonCard className="member-card">
                                <IonCardContent>
                                    <IonAvatar className="member-avatar">
                                        <img src={user.image} alt={memberFullname(user)} />
                                    </IonAvatar>
                                    <IonLabel className="member-name">{memberFullname(user)}</IonLabel>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                        <IonCol size="6">
                            <h5 style={{ color: 'slate' }}>Request to Join</h5>
                            <h4>{group?.long_name || 'your group'}</h4>
                            <small>{group?.location || ''}</small>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <IonItem lines="none">
                    <IonTextarea
                        label="Any other Description (optional)"
                        rows={2}
                        labelPlacement="stacked"
                        placeholder=""
                        value={form.description}
                        onIonChange={(e) =>
                            setForm({ ...form, description: e.detail.value! })
                        }
                        counter={true}
                        maxlength={200}
                    ></IonTextarea>
                </IonItem>

                <IonItem lines="none">
                    <IonCheckbox
                        slot="start"
                        id="terms"
                        checked={termsAccepted}
                        onIonChange={(e) => setTermsAccepted(e.detail.checked)}
                    />
                    <IonLabel>
                        <small>
                            I agree with the{' '}
                            <a href="#" className="text-blue-600 hover:underline">
                                terms and conditions
                            </a>
                        </small>
                    </IonLabel>
                </IonItem>

                <IonButton
                    expand="full"
                    onClick={handleSubmit}
                    disabled={!isFormValid || isSubmitting}
                >
                    {isSubmitting ? <IonSpinner name="dots" /> : 'Submit'}
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default MainJoinRequest;

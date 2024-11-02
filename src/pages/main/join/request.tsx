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
} from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { groupsData } from '@/data/group_placeholder';
import { userAtom } from '@/store/store';
import { useAtom } from 'jotai';
import UserAvatar from '@/components/member/userAvatar';

interface MainJoinRequestProps extends RouteComponentProps<{ id: string; }> { }

const MainJoinRequest: React.FC<MainJoinRequestProps> = ({ match }) => {
    const [user]:any = useAtom(userAtom);
    const [form, setForm] = useState({
        description: '',
    });
    const [group, setGroup] = useState<any>(null);
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false); // State to track checkbox

    // useEffect to fetch the group based on ID and initialize the form
    useEffect(() => {
        const group = groupsData.find(group => group.id === match.params.id);
        setGroup(group);

        // Initialize form state with user data
        // setForm({
        //     description: user.firstname,
        // });
    }, [match.params.id, user]);

    // Validation logic
    const isFormValid = () => {
        // Check if any required fields are empty
        return (
            form.description.trim() !== ''
        );
    };

    const handleSubmit = () => {
        
        if (isFormValid()) {
            // If form is valid, navigate to the next page
            console.log('Form submitted successfully:', form);
            // Add navigation or API call logic here
        }

        if (!termsAccepted) {
            alert('Please agree to the terms and conditions before submitting.');
            return; // Exit the function if terms are not accepted
        }

    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref='/main/join'></IonBackButton>
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
                                    src={group?.logo || ""}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '50%',
                                    }}
                                    alt="Group logo"
                                />
                            </IonAvatar>
                            <h4>{group?.long_name || "your group"}</h4>
                            <h5>{group?.location || ""}</h5>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonText>You will add</IonText>
                        <UserAvatar/>
                    </IonRow>
                </IonGrid>

                <IonItem lines="none">
                    <IonTextarea
                        label="Any other Description ( optional )"
                        rows={3}
                        labelPlacement="stacked"
                        placeholder="is there any detailed info you need to tell the admin "
                        value={form.description}
                        onIonChange={(e) => setForm({ ...form, description: e.detail.value! })} // Update state on input change
                        counter={true}
                        maxlength={200}
                    ></IonTextarea>
                </IonItem>

                <IonItem lines="none">
                    <IonCheckbox 
                        slot="start" 
                        id="terms" 
                        checked={termsAccepted} 
                        onIonChange={(e) => setTermsAccepted(e.detail.checked)} // Update state when checkbox is checked/unchecked
                    />
                    <IonLabel>
                        <small> I agree with the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a></small>
                    </IonLabel>
                </IonItem>
                
                <IonButton expand='full' onClick={handleSubmit}>Submit</IonButton>
            </IonContent>
        </IonPage>
    );
}

export default MainJoinRequest;

// import React, { useState, useEffect } from 'react';
// import logoPlaceholder from '@/assets/images/logo_placeholder.png';
// import {
//     IonBackButton,
//     IonButtons,
//     IonButton,
//     IonHeader,
//     IonContent,
//     IonToolbar,
//     IonTitle,
//     IonPage,
//     IonInput,
//     IonItem,
//     IonCheckbox,
//     IonLabel,
//     IonImg,
//     IonAvatar,
//     IonCol,
//     IonGrid,
//     IonRow,
// } from '@ionic/react';
// import { RouteComponentProps } from 'react-router-dom';
// import { groupsData } from '@/data/group_placeholder';
// import { userAtom } from '@/store/store';
// import { useAtom } from 'jotai';

// interface MainJoinRequestProps extends RouteComponentProps<{ id: string; }> { }

// const MainJoinRequest: React.FC<MainJoinRequestProps> = ({ match }) => {
//     const [user]:any = useAtom(userAtom);
//     const [form, setForm] = useState({
//         firstname: '',
//         middlename: '',
//         lastname: '',
//         phone: '',
//         image: '' // Keep this as a string for image URL
//     });
//     const [group, setGroup] = useState<any>(null);
//     const [termsAccepted, setTermsAccepted] = useState<boolean>(false); // State to track checkbox
//     const [selectedImage, setSelectedImage] = useState<string | null>(null); // Local state for displaying the image

//     // useEffect to fetch the group based on ID and initialize the form
//     useEffect(() => {
//         const group = groupsData.find(group => group.id === match.params.id);
//         setGroup(group);

//         // Initialize form state with user data
//         setForm({
//             firstname: user.firstname,
//             middlename: user.middlename|| '' ,
//             lastname: user.lastname,
//             phone: user.phone|| '' ,
//             image: user.image || '' // Set the image URL if exists
//         });
//     }, [match.params.id, user]);

//     // Image change handler
//     const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files[0]) {
//             const file = event.target.files[0];
//             const imageUrl = URL.createObjectURL(file);
//             setSelectedImage(imageUrl);
//             setForm(prevForm => ({ 
//                 ...prevForm, 
//                 image: imageUrl // Update form with the image URL for display
//             })); 
//         }
//     };

//     const handlePlaceholderClick = () => {
//         const fileInput = document.getElementById('fileInput') as HTMLInputElement;
//         fileInput?.click();
//     };

//     // Validation logic
//     const isFormValid = () => {
//         // Check if any required fields are empty
//         return (
//             form.firstname.trim() !== '' &&
//             form.middlename.trim() !== '' &&
//             form.lastname.trim() !== '' &&
//             form.phone.trim() !== '' &&
//             selectedImage !== null // Ensure an image is uploaded
//         );
//     };

//     const handleSubmit = () => {
        
//         if (isFormValid()) {
//             // If form is valid, navigate to the next page
//             console.log('Form submitted successfully:', form);
//             // Add navigation or API call logic here
//         } else {
//             // Handle the case where the form is invalid
//             alert('Please fill in all fields and upload a passport photo.');
//             return;
//         }

//         if (!termsAccepted) {
//             alert('Please agree to the terms and conditions before submitting.');
//             return; // Exit the function if terms are not accepted
//         }

//     };

//     return (
//         <IonPage>
//             <IonHeader>
//                 <IonToolbar>
//                     <IonButtons slot="start">
//                         <IonBackButton defaultHref='/main/join'></IonBackButton>
//                     </IonButtons>
//                     <IonTitle>Request to Join</IonTitle>
//                 </IonToolbar>
//             </IonHeader>
//             <IonContent className="ion-padding">
//                 <IonGrid>
//                     <IonRow style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
//                         <IonCol size="12" style={{ textAlign: 'center' }}>
//                             <IonAvatar style={{ margin: '0 auto', width: '15rem', height: '15rem' }}>
//                                 <IonImg
//                                     src={group?.logo || ""}
//                                     style={{
//                                         width: '100%',
//                                         height: '100%',
//                                         objectFit: 'cover',
//                                         borderRadius: '50%',
//                                     }}
//                                     alt="Group logo"
//                                 />
//                             </IonAvatar>
//                             <h4>{group?.long_name || "your group"}</h4>
//                             <h5>{group?.location || ""}</h5>
//                         </IonCol>
//                     </IonRow>
//                 </IonGrid>

//                 <IonItem lines="none">
//                     <IonInput
//                         label="First Name"
//                         labelPlacement="stacked"
//                         placeholder="..."
//                         value={form.firstname}
//                         onIonChange={(e) => setForm({ ...form, firstname: e.detail.value! })} // Update state on input change
//                         counter={true}
//                         maxlength={30}
//                     ></IonInput>
//                 </IonItem>

//                 <IonItem lines="none">
//                     <IonInput
//                         label="Middle Name"
//                         labelPlacement="stacked"
//                         placeholder="..."
//                         value={form.middlename}
//                         onIonChange={(e) => setForm({ ...form, middlename: e.detail.value! })} // Update state on input change
//                         counter={true}
//                         maxlength={30}
//                     ></IonInput>
//                 </IonItem>

//                 {/* Image Upload */}
//                 <IonItem lines='none' onClick={handlePlaceholderClick} style={{ cursor: 'pointer' }}>
//                     <IonLabel position='stacked'>
//                         Add Passport Photo (white background)
//                     </IonLabel>
//                     <br />
//                     <IonImg
//                         src={selectedImage || logoPlaceholder}
//                         alt="Image Placeholder"
//                         style={{ width: '150px', height: '150px', objectFit: 'cover' }}
//                     />
//                 </IonItem>

//                 <input
//                     id="fileInput"
//                     type="file"
//                     accept="image/*"
//                     style={{ display: 'none' }}
//                     onChange={handleImageChange}
//                 />

//                 <IonItem lines="none">
//                     <IonCheckbox 
//                         slot="start" 
//                         id="terms" 
//                         checked={termsAccepted} 
//                         onIonChange={(e) => setTermsAccepted(e.detail.checked)} // Update state when checkbox is checked/unchecked
//                     />
//                     <IonLabel>
//                         <small> I agree with the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a></small>
//                     </IonLabel>
//                 </IonItem>
                
//                 <IonButton expand='full' onClick={handleSubmit}>Submit</IonButton>
//             </IonContent>
//         </IonPage>
//     );
// }

// export default MainJoinRequest;

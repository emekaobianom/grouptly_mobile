


import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonPage, IonRefresher, IonRefresherContent, IonRouterOutlet, IonSearchbar, IonText, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react';
import { useState } from 'react';
import { add, chevronForward } from 'ionicons/icons';
import { Route, RouteComponentProps } from 'react-router';

const MainJoin: React.FC<RouteComponentProps> = ({ match }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = (event: any) => {
        const scrollTop = event.detail.scrollTop;
        // Shrink the header and title once scrolled past 50px
        if (scrollTop > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };


    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
            // Any calls to load data go here
            event.detail.complete();
        }, 2000);
    }

    return (<>
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Join Group</IonTitle>

                    <IonButtons slot="end">
                        <IonButton routerLink='/main/join/create' shape='round' fill="outline">
                            <IonIcon icon={add} slot='start' />
                            Create Group
                        </IonButton>

                    </IonButtons>
                </IonToolbar>
                <IonToolbar>
                    <IonSearchbar></IonSearchbar>
                </IonToolbar>
            </IonHeader>

            <IonContent scrollEvents={true} onIonScroll={handleScroll}>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonList inset={true}>
                    <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
                        <div className="unread-indicator-wrapper" slot="start"></div>
                        <IonLabel>
                            <strong>Ionitron</strong>
                            <IonText>I have become sentient</IonText>
                            <br />
                            <IonNote color="medium" className="ion-text-wrap">
                                That is all.
                            </IonNote>
                        </IonLabel>
                        <div className="metadata-end-wrapper" slot="end">
                            <IonNote color="medium">03:44</IonNote>
                            <IonIcon color="medium" icon={chevronForward}></IonIcon>
                        </div>
                    </IonItem>
                    <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
                        <div className="unread-indicator-wrapper" slot="start"></div>
                        <IonLabel>
                            <strong>Ionitron</strong>
                            <IonText>I have become sentient</IonText>
                            <br />
                            <IonNote color="medium" className="ion-text-wrap">
                                That is all.
                            </IonNote>
                        </IonLabel>
                        <div className="metadata-end-wrapper" slot="end">
                            <IonNote color="medium">03:44</IonNote>
                            <IonIcon color="medium" icon={chevronForward}></IonIcon>
                        </div>
                    </IonItem>

                    <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
                        <div className="unread-indicator-wrapper" slot="start"></div>
                        <IonLabel>
                            <strong>Ionitron</strong>
                            <IonText>I have become sentient</IonText>
                            <br />
                            <IonNote color="medium" className="ion-text-wrap">
                                That is all.
                            </IonNote>
                        </IonLabel>
                        <div className="metadata-end-wrapper" slot="end">
                            <IonNote color="medium">03:44</IonNote>
                            <IonIcon color="medium" icon={chevronForward}></IonIcon>
                        </div>
                    </IonItem>
                    <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
                        <div className="unread-indicator-wrapper" slot="start">
                            <div className="unread-indicator"></div>
                        </div>
                        <IonLabel>
                            <strong>Rick Astley</strong>
                            <IonText>Never Gonna Give You Up</IonText>
                            <br />
                            <IonNote color="medium" className="ion-text-wrap">
                                Never gonna give you up Never gonna let you down Never gonna run...
                            </IonNote>
                        </IonLabel>
                        <div className="metadata-end-wrapper" slot="end">
                            <IonNote color="medium">06:11</IonNote>
                            <IonIcon color="medium" icon={chevronForward}></IonIcon>
                        </div>
                    </IonItem>
                    <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
                        <div className="unread-indicator-wrapper" slot="start"></div>
                        <IonLabel>
                            <strong>Ionitron</strong>
                            <IonText>I have become sentient</IonText>
                            <br />
                            <IonNote color="medium" className="ion-text-wrap">
                                That is all.
                            </IonNote>
                        </IonLabel>
                        <div className="metadata-end-wrapper" slot="end">
                            <IonNote color="medium">03:44</IonNote>
                            <IonIcon color="medium" icon={chevronForward}></IonIcon>
                        </div>
                    </IonItem>
                    <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
                        <div className="unread-indicator-wrapper" slot="start"></div>
                        <IonLabel>
                            <strong>Ionitron</strong>
                            <IonText>I have become sentient</IonText>
                            <br />
                            <IonNote color="medium" className="ion-text-wrap">
                                That is all.
                            </IonNote>
                        </IonLabel>
                        <div className="metadata-end-wrapper" slot="end">
                            <IonNote color="medium">03:44</IonNote>
                            <IonIcon color="medium" icon={chevronForward}></IonIcon>
                        </div>
                    </IonItem>
                    <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
                        <div className="unread-indicator-wrapper" slot="start"></div>
                        <IonLabel>
                            <strong>Ionitron</strong>
                            <IonText>I have become sentient</IonText>
                            <br />
                            <IonNote color="medium" className="ion-text-wrap">
                                That is all.
                            </IonNote>
                        </IonLabel>
                        <div className="metadata-end-wrapper" slot="end">
                            <IonNote color="medium">03:44</IonNote>
                            <IonIcon color="medium" icon={chevronForward}></IonIcon>
                        </div>
                    </IonItem>
                    <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
                        <div className="unread-indicator-wrapper" slot="start"></div>
                        <IonLabel>
                            <strong>Ionitron</strong>
                            <IonText>I have become sentient</IonText>
                            <br />
                            <IonNote color="medium" className="ion-text-wrap">
                                That is all.
                            </IonNote>
                        </IonLabel>
                        <div className="metadata-end-wrapper" slot="end">
                            <IonNote color="medium">03:44</IonNote>
                            <IonIcon color="medium" icon={chevronForward}></IonIcon>
                        </div>
                    </IonItem>
                    <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
                        <div className="unread-indicator-wrapper" slot="start"></div>
                        <IonLabel>
                            <strong>Ionitron</strong>
                            <IonText>I have become sentient</IonText>
                            <br />
                            <IonNote color="medium" className="ion-text-wrap">
                                That is all.
                            </IonNote>
                        </IonLabel>
                        <div className="metadata-end-wrapper" slot="end">
                            <IonNote color="medium">03:44</IonNote>
                            <IonIcon color="medium" icon={chevronForward}></IonIcon>
                        </div>
                    </IonItem>
                    <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
                        <div className="unread-indicator-wrapper" slot="start"></div>
                        <IonLabel>
                            <strong>Ionitron</strong>
                            <IonText>I have become sentient</IonText>
                            <br />
                            <IonNote color="medium" className="ion-text-wrap">
                                That is all.
                            </IonNote>
                        </IonLabel>
                        <div className="metadata-end-wrapper" slot="end">
                            <IonNote color="medium">03:44</IonNote>
                            <IonIcon color="medium" icon={chevronForward}></IonIcon>
                        </div>
                    </IonItem>
                    <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
                        <div className="unread-indicator-wrapper" slot="start"></div>
                        <IonLabel>
                            <strong>Ionitron</strong>
                            <IonText>I have become sentient</IonText>
                            <br />
                            <IonNote color="medium" className="ion-text-wrap">
                                That is all.
                            </IonNote>
                        </IonLabel>
                        <div className="metadata-end-wrapper" slot="end">
                            <IonNote color="medium">03:44</IonNote>
                            <IonIcon color="medium" icon={chevronForward}></IonIcon>
                        </div>
                    </IonItem>
                    <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
                        <div className="unread-indicator-wrapper" slot="start"></div>
                        <IonLabel>
                            <strong>Ionitron</strong>
                            <IonText>I have become sentient</IonText>
                            <br />
                            <IonNote color="medium" className="ion-text-wrap">
                                That is all.
                            </IonNote>
                        </IonLabel>
                        <div className="metadata-end-wrapper" slot="end">
                            <IonNote color="medium">03:44</IonNote>
                            <IonIcon color="medium" icon={chevronForward}></IonIcon>
                        </div>
                    </IonItem>
                    <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
                        <div className="unread-indicator-wrapper" slot="start"></div>
                        <IonLabel>
                            <strong>Ionitron</strong>
                            <IonText>I have become sentient</IonText>
                            <br />
                            <IonNote color="medium" className="ion-text-wrap">
                                That is all.
                            </IonNote>
                        </IonLabel>
                        <div className="metadata-end-wrapper" slot="end">
                            <IonNote color="medium">03:44</IonNote>
                            <IonIcon color="medium" icon={chevronForward}></IonIcon>
                        </div>
                    </IonItem>
                    <IonItem button={true} detail={false} routerLink='/member/inbox/456'>
                        <div className="unread-indicator-wrapper" slot="start"></div>
                        <IonLabel>
                            <strong>Ionitron</strong>
                            <IonText>I have become sentient</IonText>
                            <br />
                            <IonNote color="medium" className="ion-text-wrap">
                                That is all.
                            </IonNote>
                        </IonLabel>
                        <div className="metadata-end-wrapper" slot="end">
                            <IonNote color="medium">03:44</IonNote>
                            <IonIcon color="medium" icon={chevronForward}></IonIcon>
                        </div>
                    </IonItem>
                </IonList>

                <div style={{ marginBottom: 80 }}></div>
            </IonContent>
        </IonPage>
    </>
    );
};

export default MainJoin;

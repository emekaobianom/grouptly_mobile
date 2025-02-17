import React, { useEffect, useState } from "react";
import { IonContent, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonIcon, IonButton, IonNote, IonText, IonImg } from "@ionic/react";
import { briefcase, calendar, calendarClear, heart, home, informationCircle, mail, newspaper, people, wallet, logOut, chevronForward } from "ionicons/icons";
import { useHistory, useLocation } from "react-router-dom";
import icon from '@/assets/images/icon.png';
import { useAtom } from "jotai";
import { userAtom } from "@/store/atoms/userAtoms";
import { selectedGroupAtom } from "@/store/atoms/groupAtoms";
import { useAuthenticator } from "@aws-amplify/ui-react";

const SideMenuMember: React.FC = () => {
//   const { signOut } = useAuthenticator((context) => [context.user]);
    const history = useHistory();
    const location = useLocation();  // Get the current location

    const [user] = useAtom(userAtom);
    const [group] = useAtom(selectedGroupAtom); // Explicit type for better clarity

    const handleLogout = () => {
        history.replace("/login");
    };

    const isActive = (path: string) => location.pathname === path;

    // Menu items definition
    const menuItems = [
        { title: "Dashboard", icon: home, path: "/member/dashboard" },
        { title: "Inbox", icon: mail, path: "/member/inbox", note: "15" },
        { title: "My Payments", icon: wallet, path: "/member/payments" },
        { title: "Meetings & Events", icon: calendar, path: "/member/meetings-events" },
        { title: "Donations & Support", icon: heart, path: "/member/donations-support" },
        { title: "News", icon: newspaper, path: "/member/news" },
        { title: "Calendar", icon: calendarClear, path: "/member/calendar" },
        { title: "Members", icon: people, path: "/member/members" },
        // { title: "Executives", icon: briefcase, path: "/member/executives" },
        { title: "About Us", icon: informationCircle, path: "/member/about-us" }
    ];


    return (
        <IonMenu type="reveal" contentId="member" menuId="main-menu">
            <IonContent>
                {/* Big picture */}
                <IonImg
                    src={(() => ((group?.logo == "default_logo") ? icon : group?.logo))()}
                    style={{
                        padding: "5rem",
                        width: '100%', // Or any fixed width you want, like '15rem'
                        height: 'auto',
                        objectFit: 'contain', // or 'cover' depending on your needs
                    }}
                />

                {(user?.id == group?.super_admin_user_id) ?
                    <IonList>
                        <IonMenuToggle>
                            <IonButton
                                fill="outline"
                                expand="full"
                                shape="round"
                                color="dark"
                                // routerLink="/admin/dashboard?openMenu=true"
                                routerLink="/admin/dashboard"
                                style={{ margin: '16px' }}
                            >
                                <IonIcon icon={chevronForward} slot="start" />
                                <IonLabel>Admin Office</IonLabel>
                            </IonButton>
                        </IonMenuToggle>
                    </IonList>
                    : ""
                }

                <IonItem> <IonText color={"tertiary"}>My Account</IonText> </IonItem>

                <IonList>
                    {menuItems.map((item, index) => (
                        <IonMenuToggle key={index}>
                            <IonItem
                                button
                                routerLink={item.path}
                                routerDirection="forward"
                                color={isActive(item.path) ? "tertiary" : ""}
                            >
                                <IonIcon icon={item.icon} slot="start" />
                                <IonLabel>{item.title}</IonLabel>
                                {item.note && <IonNote slot="end">{item.note}</IonNote>}
                            </IonItem>
                        </IonMenuToggle>
                    ))}
                </IonList>

                <IonList>
                    <IonMenuToggle>
                        {/* <IonButton
                            expand="full"
                            shape="round"
                            color="tertiary"
                            routerLink="/main/choose"
                            style={{ margin: '16px' }}
                        >
                            <IonIcon icon={people} slot="start" />
                            Exit Group
                        </IonButton> */}
                        <IonButton
                            expand="full"
                            shape="round"
                            color="tertiary"
                            routerLink="/main/choose"
                            style={{ margin: '16px' }}
                        >
                            <IonIcon icon={logOut} slot="start" />
                            Exit
                        </IonButton>
                    </IonMenuToggle>
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default SideMenuMember;

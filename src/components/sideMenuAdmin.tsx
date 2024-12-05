import React, { useEffect, useState } from "react";
import {
    IonContent,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonIcon,
    IonButton,
    IonNote,
    IonText,
    IonImg,
} from "@ionic/react";
import {
    briefcase,
    calendar,
    calendarClear,
    heart,
    home,
    informationCircle,
    mail,
    newspaper,
    people,
    wallet,
    logOut,
    chevronForward,
} from "ionicons/icons";
import { useHistory, useLocation } from "react-router-dom";
import { getItem } from "@/utils/storage";
import icon from "@/assets/images/icon.png";

const SideMenuAdmin: React.FC = () => {
    const history = useHistory();
    const location = useLocation(); // Get the current location
    const [group, setGroup] = useState<any>(null);

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const selectedGroup = await getItem("selectedGroup"); // Fetch the selected group from storage
                setGroup(selectedGroup);
                console.log("selectedGroup ",selectedGroup);
            } catch (error) {
                console.error("Error fetching group:", error);
            }
        };

        fetchGroup();
    }, []); // No dependencies needed since the fetch logic doesn't depend on external changes

    const handleLogout = () => {
        alert("Logging out...");
        history.replace("/login");
    };

    const isActive = (path: string) => location.pathname === path;

    const menuItems = [
        { title: "Dashboard", icon: home, path: "/admin/dashboard" },
        { title: "Inbox", icon: mail, path: "/admin/inbox", note: "15" },
        { title: "My Payments", icon: wallet, path: "/admin/payments" },
        { title: "Meetings & Events", icon: calendar, path: "/admin/meetings-events" },
        { title: "Donations & Support", icon: heart, path: "/admin/donations-support" },
        { title: "News", icon: newspaper, path: "/admin/news" },
        { title: "Calendar", icon: calendarClear, path: "/admin/calendar" },
        { title: "Members", icon: people, path: "/admin/members" },
        { title: "Executives", icon: briefcase, path: "/admin/executives" },
        { title: "About Us", icon: informationCircle, path: "/admin/about-us" },
    ];

    return (
        <IonMenu style={{ background: "yellow" }} type="reveal" contentId="admin" menuId="main-menu">
            <IonContent>
                {/* Group Logo */}
                <IonImg
                    src={group?.logo === "default_logo" || !group?.logo ? icon : group.logo}
                    alt="Group Logo"
                    style={{
                        padding: "5rem",
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                    }}
                />

                {/* My Account Button */}
                <IonList>
                    <IonMenuToggle>
                        <IonButton
                            fill="outline"
                            expand="full"
                            shape="round"
                            color="dark"
                            routerLink="/member/dashboard?openMenu=true"
                            style={{ margin: "16px" }}
                        >
                            <IonIcon icon={chevronForward} slot="start" />
                            My Account
                        </IonButton>
                    </IonMenuToggle>
                </IonList>

                <IonItem>
                    <IonText color="tertiary">Admin Office</IonText>
                </IonItem>

                {/* Menu Items */}
                <IonList>
                    {menuItems.map((item, index) => (
                        <IonMenuToggle key={index}>
                            <IonItem
                                button
                                routerLink={item.path}
                                routerDirection="forward"
                                color={isActive(item.path) ? "tertiary" : ""}
                                style={{
                                    "--background": isActive(item.path) ? "var(--ion-color-tertiary)" : "lightgray",
                                }}
                            >
                                <IonIcon icon={item.icon} slot="start" />
                                <IonLabel>{item.title}</IonLabel>
                                {item.note && <IonNote slot="end">{item.note}</IonNote>}
                            </IonItem>
                        </IonMenuToggle>
                    ))}
                </IonList>

                {/* Change Group and Logout Buttons */}
                <IonList>
                    <IonMenuToggle>
                        <IonButton
                            expand="full"
                            shape="round"
                            color="tertiary"
                            routerLink="/main/choose"
                            style={{ margin: "16px" }}
                        >
                            <IonIcon icon={people} slot="start" />
                            Change Group
                        </IonButton>
                        <IonButton
                            expand="full"
                            fill="clear"
                            shape="round"
                            color="dark"
                            onClick={handleLogout}
                            style={{ margin: "16px" }}
                        >
                            <IonIcon icon={logOut} slot="start" />
                            Log Out
                        </IonButton>
                    </IonMenuToggle>
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default SideMenuAdmin;

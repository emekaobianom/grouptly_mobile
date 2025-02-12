import { IonFab, IonFabButton, IonMenuButton, IonIcon } from "@ionic/react";
import { grid } from "ionicons/icons";


const SideMenuBtn: React.FC = () => {

    return (
        <IonFab horizontal="start" vertical="bottom" slot="fixed">
            <IonFabButton>
                <IonMenuButton><IonIcon icon={grid} /></IonMenuButton>
            </IonFabButton>
        </IonFab>
    );
};

export default SideMenuBtn;
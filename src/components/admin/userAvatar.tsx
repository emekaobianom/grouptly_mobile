
import { userAtom } from "@/store/store";
import { IonAvatar } from "@ionic/react";
import { useAtom } from "jotai";

const UserAdminAvatar : React.FC = () => {
  const [user]:any = useAtom(userAtom);

    return (
      <>
      <p  slot='end'>Admin</p>
        <IonAvatar slot='end' className='ion-padding'>
        <img src={user.image} alt="me" />
      </IonAvatar>
      </>
    )

};

export default UserAdminAvatar;

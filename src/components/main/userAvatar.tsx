
import { userAtom } from "@/store/atoms/userAtoms";
import { IonAvatar } from "@ionic/react";
import { useAtom } from "jotai";
import { useHistory } from "react-router";
import maleIcon from '@/assets/images/male.png';
import femaleIcon from '@/assets/images/female.png';

const UserAvatar: React.FC = () => {
  const history = useHistory();
  const [user]: any = useAtom(userAtom);

  return (
    <>
      <IonAvatar slot="end" className="ion-padding" onClick={()=> history.push('/main/profile')}>
       
          <img src={user?.image || ((user?.gender == "male") ? maleIcon : femaleIcon)} alt="User Avatar" />
       
      </IonAvatar>
    </>
  );
};

export default UserAvatar;

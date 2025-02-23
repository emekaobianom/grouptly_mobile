
import { userAtom } from "@/store/atoms/userAtoms";
import { IonAvatar } from "@ionic/react";
import { useAtom } from "jotai";
import { useHistory } from "react-router";

const UserAvatar: React.FC = () => {
  const history = useHistory();
  const [user]: any = useAtom(userAtom);

  return (
    <>
      <IonAvatar slot="end" className="ion-padding" onClick={()=> history.push('/main/profile')}>
        {user?.image ? (
          <img src={user?.image} alt="User Avatar" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="10" fill="#ccc" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".3em"
              fill="#fff"
              fontSize="12"
            >
              U
            </text>
          </svg>
        )}
      </IonAvatar>
    </>
  );
};

export default UserAvatar;

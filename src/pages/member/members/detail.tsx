import React from 'react';
import {
  IonButtons,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonText,
  IonAvatar,
  IonGrid,
  IonCol,
  IonRow,
  IonBackButton,
  IonImg,
  IonItem,
  IonList,
  IonRadio,
  IonRadioGroup,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { useAtom, useAtomValue, useSetAtom } from 'jotai/react';
import { UserStatus } from '@/store/interface';
import { call, man, phoneLandscape, woman } from 'ionicons/icons';
import { initializeMembersAtom, getMember, updateMemberStatusAtom } from '@/store/atoms/memberAtoms';
import { userAtom } from '@/store/atoms/userAtoms';
import { memberFullname } from '@/utils/simpleCases';

interface MemberMembersDetailProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const MemberMembersDetail: React.FC<MemberMembersDetailProps> = ({ match }) => {
  const [user] = useAtom(userAtom);
  const [, initializeMembers] = useAtom(initializeMembersAtom);
  // Retrieve the member data using the derived atom function
  const getMemberFunc = useAtomValue(getMember);
  const member = getMemberFunc(match.params.id);

  // Retrieve the function to update member status
  const updateMemberStatusFunc = useSetAtom(updateMemberStatusAtom);

  // Handle membership status updates
  const handleStatusUpdate = async (newStatus: UserStatus) => {
    if (member) {
      await updateMemberStatusFunc(match.params.id, newStatus);
      initializeMembers();
    }
  };

  const renderContent = () => {
    if (!member) {
      return (
        <IonText color="medium">
          <p>No member found.</p>
        </IonText>
      );
    }

    return (
      <IonGrid style={{ height: '100%', paddingTop: '4rem' }}>
        <IonRow
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <IonCol size="12" style={{ textAlign: 'center' }}>
            {/* Display member avatar */}
            <IonAvatar style={{ margin: '0 auto', width: '15rem', height: '15rem' }}>
              <IonImg
                src={member.image_url}
                alt={memberFullname(member)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            </IonAvatar>

            {/* Display member name and role */}
            <IonText className="member-detail-name">
              <h3><IonIcon icon={(member.gender == "male") ? man : woman} slot="start" /> {memberFullname(member)}</h3>
            </IonText>
            <IonText className="member-detail-role">
              <p>{member.role}</p>
              {/* <p> <IonIcon icon={call} slot="start" /> {member.phone}</p> */}
            </IonText>

          </IonCol>
        </IonRow>
      </IonGrid>
    );
  };

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/admin/members" />
          </IonButtons>
          <IonTitle>{member ? memberFullname(member) : 'Member Details'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">{renderContent()}</IonContent>
    </IonPage>
  );
};

export default MemberMembersDetail;

import React, { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonCard,
  IonCardContent,
  IonIcon,
  IonText,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
  IonModal,
  IonInput,
  IonItem,
  IonChip,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { checkmarkCircle, chevronForward, heart, people } from 'ionicons/icons';
import { donationsItemsData } from '@/data/donations_placeholder';
import { membersData, MemberType } from '@/data/members_placeholder';

// Adjust the type for a single donation item to reflect the actual data
interface DonationItem {
  id: string;
  title: string;
  reason: string;
  amount: string;
}

interface MemberDonationsSupportDetailProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const MemberDonationsSupportDetail: React.FC<MemberDonationsSupportDetailProps> = ({ match }) => {
  const [item, setItem] = useState<DonationItem | null>(null);
  const [segment, setSegment] = useState<'donations' | 'pledges'>('donations'); // State for segment
  const [membersThatDonated, setMembersThatDonated] = useState<MemberType[]>([]);
  const [membersThatPledged, setMembersThatPledged] = useState<MemberType[]>([]);
  const [memberToRedeem, setMemberToRedeem] = useState<MemberType | null>(null);

  //modals
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState(false);
  const [isRedeemPledgeModalOpen, setIsRedeemPledgeModalOpen] = useState(false);


  useEffect(() => {
    // Find the donation item based on match.params.id
    const foundItem = donationsItemsData.find((data) => data.id === match.params.id);
    setItem(foundItem || null);

    // Get members that donated and pledged (taking the first 15 items)
    const donated = membersData.slice(0, 15);
    const pledged = membersData.slice(15, 23);

    setMembersThatDonated(donated);
    setMembersThatPledged(pledged);
  }, [match.params.id]);
  

  const handleDonateActionClick = () => {
    setIsDonateModalOpen(true);
  };

  const handlePledgeActionClick = () => {
    setIsPledgeModalOpen(true);
  };

  const handleRedeemPledgeActionClick = (member: any) => {
    setIsRedeemPledgeModalOpen(true);
    setMemberToRedeem(member);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref='/member/donations-support' />
          </IonButtons>
          <IonTitle>Donation</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">
        <div style={{ direction: "rtl" }}>
        {/* <IonChip color="tertiary">You have Pledged</IonChip>
        <IonChip color="tertiary">You have Donated</IonChip> */}
          <IonChip color="tertiary">PAY-ITEM-ID : NAT1234</IonChip>
        </div>
        {/* Only render the card if `item` is not null */}
        {item ? (
          <>
            <IonCard>
              <IonCardContent>
                <div className='card-text-icon'>
                  <div>
                    <IonText style={{ fontSize: 16 }}>
                      {item.title}
                    </IonText>
                    <br />
                    <IonText style={{ fontSize: 30 }}>
                      N{item.amount}
                    </IonText>
                    <br />
                    <IonText>
                      {item.reason}
                    </IonText>
                  </div>
                  <div className='card-icon-right'>
                    <IonIcon style={{ fontSize: 30 }} icon={heart} />
                  </div>
                </div>
              </IonCardContent>
            </IonCard>

            <IonButton className='ion-margin-vertical' shape='round' expand='full' onClick={() => handleDonateActionClick()}>Donate</IonButton>
            <IonButton className='ion-margin-bottom' shape='round' expand='full' onClick={() => handlePledgeActionClick()}>Pledge</IonButton>
            <br />
            {/* Segment control for toggling between Donations and Pledges */}
            <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as 'donations' | 'pledges')}>
              <IonSegmentButton value="donations">
                <IonLabel>Donations</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="pledges">
                <IonLabel>Pledges</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            {/* Conditional rendering based on the selected segment */}
            {segment === 'donations' && (
              <IonGrid>
                {membersThatDonated.map((member) => (
                  <IonCard key={member.id} className="ion-margin-bottom">
                    <IonCardContent>
                      <IonGrid>
                        <IonRow>
                          <IonCol size="auto">
                            <IonImg
                              src={member.image}
                              style={{
                                width: '50px',
                                height: 'auto',
                                objectFit: 'contain',
                                borderRadius: '50%',
                              }}
                            />
                          </IonCol>
                          <IonCol>
                            <p className="bold-text">N20,000</p>
                            <IonText color="medium">
                              <small>{member.name}</small>
                            </IonText>
                          </IonCol>
                          <IonCol size="auto">
                            <IonIcon
                              icon={checkmarkCircle}
                              style={{ color: 'gray', fontSize: '24px' }}
                            />
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                ))}
              </IonGrid>
            )}

            {segment === 'pledges' && (
              <IonGrid>
                {membersThatPledged.map((member) => (
                  <IonCard key={member.id} className="ion-margin-bottom" onClick={() => handleRedeemPledgeActionClick(member)}>
                    <IonCardContent>
                      <IonGrid>
                        <IonRow>
                          <IonCol size="auto">
                            <IonImg
                              src={member.image}
                              style={{
                                width: '50px',
                                height: 'auto',
                                objectFit: 'contain',
                                borderRadius: '50%',
                              }}
                            />
                          </IonCol>
                          <IonCol>
                            <p className="bold-text">N50,000</p>
                            <IonText color="medium">
                              <small>{member.name}</small>
                            </IonText>
                          </IonCol>
                          <IonCol size="auto">
                          <IonChip color="tertiary">Redeem</IonChip>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                ))}
              </IonGrid>
            )}


            {/* modals start */}
            {/* Donate */}
            <IonModal
              isOpen={isDonateModalOpen}
              onDidDismiss={() => setIsDonateModalOpen(false)}
              style={{ "--height": "auto" }}
              initialBreakpoint={1}
              breakpoints={[0, 1]}
            >
              <div className='ion-padding'>
                <IonItem lines="none">
                  <IonInput type='number' label="Amount to Donate" labelPlacement="stacked" placeholder="Enter amount" counter={true} maxlength={9}></IonInput>
                </IonItem>
                <IonButton onClick={() => setIsDonateModalOpen(false)} expand='full' >Pay</IonButton>
              </div>
            </IonModal>


            {/* Pledge */}
            <IonModal
              isOpen={isPledgeModalOpen}
              onDidDismiss={() => setIsPledgeModalOpen(false)}
              style={{ "--height": "auto" }}
              initialBreakpoint={1}
              breakpoints={[0, 1]}
            >
              <div className='ion-padding'>
                <IonItem lines="none">
                  <IonInput type='number' label="Amount to Pledge" labelPlacement="stacked" placeholder="Enter amount" counter={true} maxlength={9}></IonInput>
                </IonItem>
                <IonButton onClick={() => setIsPledgeModalOpen(false)} expand='full' >Pledge</IonButton>
              </div>
            </IonModal>



            {/* Redeem */}
            <IonModal
              isOpen={isRedeemPledgeModalOpen}
              onDidDismiss={() => setIsRedeemPledgeModalOpen(false)}
              style={{ "--height": "auto" }}
              initialBreakpoint={1}
              breakpoints={[0, 1]}
            >
              <div className='ion-padding'>
                <IonCard className="ion-margin-bottom">
                  <IonCardContent>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="auto">
                          <IonImg
                            src={memberToRedeem?.image}
                            style={{
                              width: '50px',
                              height: 'auto',
                              objectFit: 'contain',
                              borderRadius: '50%',
                            }}
                          />
                        </IonCol>
                        <IonCol>
                          <p className="bold-text">{memberToRedeem?.name}</p>
                          <IonText color="medium">
                            <small>{memberToRedeem?.role}</small>
                          </IonText>
                        </IonCol>
                        <IonCol size="auto">
                          <IonIcon
                            icon={checkmarkCircle}
                            style={{ color: 'orange', fontSize: '24px' }}
                          />
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>

                <IonButton onClick={() => setIsRedeemPledgeModalOpen(false)} expand='full' >Redeem Pledge</IonButton>
              </div>
            </IonModal>

            {/* modal ends */}
          </>
        ) : (
          <IonText>No item found</IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MemberDonationsSupportDetail;

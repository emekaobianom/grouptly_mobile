import {
  IonActionSheet, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid,
  IonHeader, IonIcon, IonInput, IonItem, IonModal, IonPage, IonRow, IonSpinner, IonText,
  IonTitle, IonToolbar
} from '@ionic/react';
import { useHistory } from 'react-router';
import { addOutline, cashOutline, ellipsisVertical } from 'ionicons/icons';
import { useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { PayItem, UserStatus } from '@/store/interface';
import { addPayItemAtom, initializeSelectedPayCategoryAtom, initializeSelectedPayItemAtom, removePayItemAtom, selectedPayCategoryAtom, updatePayItemAtom } from '@/store/atoms/paymentAtom';
import EmptyListIndicator from '@/components/emptyListIndicator';

type PayItemForm = Pick<PayItem, "id" | "title" | "description">;

const AdminPaymentCategory: React.FC = () => {
  const history = useHistory();
  const [paycategory] = useAtom(selectedPayCategoryAtom);


  // State for modal management
  const [deleting, setDeleting] = useState(false);
  const [actionSheetIsOpen, setActionSheetIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedPayItem, setSelectedPayItem] = useState<PayItemForm | null>(null);
  const [editPayItem, setEditPayItem] = useState<PayItemForm | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [, initializeSelectedPayCategory] = useAtom(initializeSelectedPayCategoryAtom);
  const addPayItem = useSetAtom(addPayItemAtom);
  const updatePayItem = useSetAtom(updatePayItemAtom);
  const removePayItem = useSetAtom(removePayItemAtom);

  // Form fields
  const itemTitle = editPayItem?.title || '';
  const itemDescription = editPayItem?.description || '';
  const isFormValid = itemTitle.trim() !== '' && itemDescription.trim() !== '';

  const openActionSheet = (payitem: PayItemForm) => {
    setSelectedPayItem(payitem);
    setActionSheetIsOpen(true);
  };

  const handleCreateClick = () => {
    setModalMode('create');
    setEditPayItem(null);
    setIsModalOpen(true);
  };

  const handleEditClick = () => {
    setModalMode('edit');
    setEditPayItem(selectedPayItem);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!isFormValid) return;

    const formData = { title: itemTitle, description: itemDescription };
    setSubmitting(true);

    try {
      if (modalMode === 'create') {
        // Logic for creating a new category
        await addPayItem(formData);
      } else if (modalMode === 'edit') {
        // Logic for updating an existing category
        if (!selectedPayItem) return;
        await updatePayItem({ id: selectedPayItem.id, ...formData });
      }

      await initializeSelectedPayCategory(String(paycategory?.id));
    } catch (error) {
      console.error('Failed to save category:', error);
    } finally {
      setSubmitting(false);
      setIsModalOpen(false);
    }
  };

  const [loadingCardId, setLoadingCardId] = useState<string | null>(null); // Track loading state for each card
  const [, initializeSelectedPayItem] = useAtom(initializeSelectedPayItemAtom);// Atom to initialize user data


  const handlePayItemClick = async (category: PayItem) => {
    setLoadingCardId(category.id); // Set the current card as loading
    try {
      console.log("category.paycategoryId ", category.id);
      await initializeSelectedPayItem(String(category.id));
      history.push(`/admin/payments/category/${category.id}`);

    } catch (error) {
      console.error("Error navigating to paycategory:", error);
    } finally {
      setLoadingCardId(null); // Reset the loading state
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref='/admin/payments' />
          </IonButtons>
          <IonTitle>{paycategory?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow className='ion-padding'>
            <IonCol>
              <IonText color="dark">
                <h6 className="bold-text">Pay Items</h6>
              </IonText>
            </IonCol>
            <IonCol size='auto'>
              <IonButton shape="round" onClick={handleCreateClick}>
                <IonIcon slot="icon-only" icon={addOutline}></IonIcon>
              </IonButton>
            </IonCol>

            <IonCol size="12">
              {paycategory?.payitems.map((payitem: PayItem) => (
                <IonCard onClick={() => { handlePayItemClick(payitem) }} className='ion-no-margin ion-margin-bottom' key={payitem.id}>

                  <IonCardContent>
                    <IonRow>
                      {(loadingCardId === payitem.id) && ( // Show spinner if this card is loading

                        <IonCol size='auto'>
                          <IonSpinner name="lines" style={{ width: '50px' }} />
                        </IonCol>
                      )}
                      <IonCol>
                        <IonCardTitle>{payitem.title}</IonCardTitle>
                        <IonCardSubtitle>{payitem.description}</IonCardSubtitle>
                      </IonCol>
                      <IonCol size="auto">
                        <IonButton fill="clear"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation(); // Prevents the card's routerLink from being triggered
                            openActionSheet(payitem);
                          }}>
                          <IonIcon icon={ellipsisVertical} />
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonCardContent>
                </IonCard>
              ))}
              {(paycategory?.payitems.length === 0) &&
                <EmptyListIndicator pagename="payment" />
              }
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonActionSheet
          isOpen={actionSheetIsOpen}
          onDidDismiss={() => setActionSheetIsOpen(false)}
          header={
            deleting
              ? "Deleting category..."
              : selectedPayItem?.title || "Unknown PayItem"
          }
          buttons={[
            {
              text: 'Edit this PayItem',
              role: 'destructive',
              handler: () => { handleEditClick() },
            },
            {
              text: 'Delete this PayItem',
              role: 'destructive',
              handler: async () => {
                if (!selectedPayItem) return;
                setDeleting(true);
                try {
                  await removePayItem(selectedPayItem.id);
                  await initializeSelectedPayCategory(String(paycategory?.id));
                } catch (error) {
                  console.error("Failed to delete category:", error);
                } finally {
                  setDeleting(false);
                }
              },
            },
            {
              text: 'Cancel',
              role: 'cancel',
            },
          ]}
        />

        <IonModal
          isOpen={isModalOpen}
          onDidDismiss={() => setIsModalOpen(false)}
          style={{ "--height": "auto" }}
          initialBreakpoint={1}
          breakpoints={[0, 1]}
        >
          <div className='ion-padding'>
            <h3>{modalMode === 'create' ? 'Add Payment PayItem' : 'Edit Payment PayItem'}</h3>

            <IonItem lines="none">
              <IonInput
                type='text'
                label="Name"
                labelPlacement="stacked"
                placeholder="Enter name"
                value={itemTitle}
                onIonInput={(e) =>
                  setEditPayItem((prev) =>
                    prev
                      ? { ...prev, title: e.detail.value! }
                      : { id: '', title: e.detail.value!, description: '' }
                  )
                }
              ></IonInput>
            </IonItem>

            <IonItem lines="none">
              <IonInput
                type='text'
                label="Description"
                labelPlacement="stacked"
                placeholder="Enter description"
                value={itemDescription}
                onIonInput={(e) =>
                  setEditPayItem((prev) =>
                    prev
                      ? { ...prev, description: e.detail.value! }
                      : { id: '', title: '', description: e.detail.value! }
                  )
                }
              ></IonInput>
            </IonItem>

            <IonButton onClick={handleSave} expand='full' disabled={submitting}>
              {submitting ? <IonSpinner name="dots"></IonSpinner> : (modalMode === 'create' ? 'Add' : 'Save')}

            </IonButton>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default AdminPaymentCategory;

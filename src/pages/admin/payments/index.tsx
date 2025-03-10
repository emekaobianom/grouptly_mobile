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
import { PayCategory, UserStatus } from '@/store/interface';
import { initializeSelectedGroupAtom, selectedGroupAtom } from '@/store/atoms/groupAtoms';
import { addPayCategoryAtom, initializeSelectedPayCategoryAtom, removePayCategoryAtom, updatePayCategoryAtom } from '@/store/atoms/paymentAtom';
import EmptyListIndicator from '@/components/emptyListIndicator';

const AdminPayments: React.FC = () => {
  const history = useHistory();
  const [group] = useAtom(selectedGroupAtom);

  // State for modal management
  const [deleting, setDeleting] = useState(false);
  const [actionSheetIsOpen, setActionSheetIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedPayCat, setSelectedPayCat] = useState<Omit<PayCategory, "payitems"> | null>(null);
  const [editCategory, setEditCategory] = useState<Omit<PayCategory, "payitems"> | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [, initializeSelectedGroup] = useAtom(initializeSelectedGroupAtom);
  const addPayCategory = useSetAtom(addPayCategoryAtom);
  const updatePayCategory = useSetAtom(updatePayCategoryAtom);
  const removePayCategory = useSetAtom(removePayCategoryAtom);

  // Form fields
  const categoryName = editCategory?.name || '';
  const categoryDescription = editCategory?.description || '';
  const isFormValid = categoryName.trim() !== '' && categoryDescription.trim() !== '';

  const openActionSheet = (paycat: Omit<PayCategory, "payitems">) => {
    setSelectedPayCat(paycat);
    setActionSheetIsOpen(true);
  };

  const handleCreateClick = () => {
    setModalMode('create');
    setEditCategory(null);
    setIsModalOpen(true);
  };

  const handleEditClick = () => {
    setModalMode('edit');
    setEditCategory(selectedPayCat);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!isFormValid) return;

    const formData = { name: categoryName, description: categoryDescription };
    setSubmitting(true);

    try {
      if (modalMode === 'create') {
        // Logic for creating a new category
        await addPayCategory(formData);
      } else if (modalMode === 'edit') {
        // Logic for updating an existing category
        if (!selectedPayCat) return;
        await updatePayCategory({ id: selectedPayCat.id, ...formData });
      }

      await initializeSelectedGroup(String(group?.id));
    } catch (error) {
      console.error('Failed to save category:', error);
    } finally {
      setSubmitting(false);
      setIsModalOpen(false);
    }
  };

  const [loadingCardId, setLoadingCardId] = useState<string | null>(null); // Track loading state for each card
  const [, initializeSelectedPayCategory] = useAtom(initializeSelectedPayCategoryAtom);// Atom to initialize user data


  const handleCategoryClick = async (category: PayCategory) => {
    setLoadingCardId(category.id); // Set the current card as loading
    try {
      console.log("category.groupId ", category.id);
      await initializeSelectedPayCategory(String(category.id));
      history.push(`/admin/payments/category/${category.id}`);

    } catch (error) {
      console.error("Error navigating to group:", error);
    } finally {
      setLoadingCardId(null); // Reset the loading state
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref='/admin/dashboard' />
          </IonButtons>
          <IonTitle>Payments</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow className='ion-padding'>
            <IonCol>
              <IonText color="dark">
                <h6 className="bold-text">Payment Categories</h6>
              </IonText>
            </IonCol>
            <IonCol size='auto'>
              <IonButton shape="round" onClick={handleCreateClick}>
                <IonIcon slot="icon-only" icon={addOutline}></IonIcon>
              </IonButton>
            </IonCol>

            <IonCol size="12">
              {group?.paycategories.map((paycat: PayCategory) => (
                <IonCard button={true} onClick={() => { handleCategoryClick(paycat) }} className='ion-no-margin ion-margin-bottom' key={paycat.id}>

                  <IonCardContent>
                    <IonRow>
                      {(loadingCardId === paycat.id) && ( // Show spinner if this card is loading

                        <IonCol size='auto'>
                          <IonSpinner name="lines" style={{ width: '50px' }} />
                        </IonCol>
                      )}
                      <IonCol>
                        <IonCardTitle>{paycat.name}</IonCardTitle>
                        <IonCardSubtitle>{paycat.description}</IonCardSubtitle>
                      </IonCol>
                      <IonCol size="auto">
                        <IonButton fill="clear"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation(); // Prevents the card's routerLink from being triggered
                            openActionSheet(paycat);
                          }}>
                          <IonIcon icon={ellipsisVertical} />
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonCardContent>
                </IonCard>
              ))}

            </IonCol>
          </IonRow>
        </IonGrid>
        {(group?.paycategories.length == 0) &&
         <EmptyListIndicator pagename="payment" />
        }
        <IonActionSheet
          isOpen={actionSheetIsOpen}
          onDidDismiss={() => setActionSheetIsOpen(false)}
          header={
            deleting
              ? "Deleting category..."
              : selectedPayCat?.name || "Unknown Category"
          }
          buttons={[
            {
              text: 'Edit this Category',
              role: 'destructive',
              handler: () => { handleEditClick() },
            },
            {
              text: 'Delete this Category',
              role: 'destructive',
              handler: async () => {
                if (!selectedPayCat) return;
                setDeleting(true);
                try {
                  await removePayCategory(selectedPayCat.id);
                  await initializeSelectedGroup(String(group?.id));
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
            <h3>{modalMode === 'create' ? 'Add Payment Category' : 'Edit Payment Category'}</h3>

            <IonItem lines="none">
              <IonInput
                type='text'
                label="Name"
                labelPlacement="stacked"
                placeholder="Enter name"
                value={categoryName}
                onIonInput={(e) =>
                  setEditCategory((prev) =>
                    prev
                      ? { ...prev, name: e.detail.value! }
                      : { id: '', name: e.detail.value!, description: '' }
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
                value={categoryDescription}
                onIonInput={(e) =>
                  setEditCategory((prev) =>
                    prev
                      ? { ...prev, description: e.detail.value! }
                      : { id: '', name: '', description: e.detail.value! }
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

export default AdminPayments;

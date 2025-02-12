// src/store/atoms/userAtoms.ts
import { atom } from "jotai";
import { produce } from "immer";
import { client } from "..";
import { selectedGroupAtom } from "./groupAtoms";
import { createPersistentAtom } from "@/utils/createPersistentAtom";
import { PayCategory, PayItem } from "../interface";


export const selectedPayCategoryAtom = createPersistentAtom<PayCategory | null>("user", null);



export const initializeSelectedPayCategoryAtom = atom(
    null,
    async (get, set, id: string) => {
        try {
            console.log("selected 0 group",id);
            if (!id) {
                console.error("User ID is required to initialize the user.");
                return;
            }
            console.log("selected 1 group",id);
            // Fetch user data using the provided ID
            const { data: paycategory }: any = await client.models.PayCategory.get(
                { id },
                {
                    selectionSet: [
                        "id", "name", "description",
                        "payitems.*"
                    ],
                    authMode: 'userPool'
                }
            );

            console.log("selected group",paycategory.id);

            if (paycategory) {
                // Update userAtom with fetched user data
                set(selectedPayCategoryAtom, {
                    ...paycategory
                });
                console.log("selected group initialized:", paycategory);
            }
        } catch (error) {
            console.error("Failed to initialize user:", error);
        }
    }
);



// Atom to remove a payCategory by its ID using Immer
export const removePayCategoryAtom = atom(
    null,
    async (get, set, payCatId: string) => {

        try {
            // Associate the user with the payCategory
            const { errors: paycatErrors } = await client.models.PayCategory.delete({
                id: payCatId,
            });

            if (paycatErrors) {
                console.error("Failed to associate user with payCategory:", paycatErrors);
                return;
            }
        } catch (error) {
            console.error("Error adding member:", error);
        }

        //refresh user
    }
);

export const addPayCategoryAtom = atom(
    null,
    async (get, set, payCategory: {name:string,description:string}) => {
        const group = get(selectedGroupAtom);

        if (!group || !group.id) {
            console.error("User must be logged in to add a payCategory.");
            return;
        }

        try {
            // Create the new payCategory
            const { errors: payCategoryErrors, data: newPayCategory }: any = await client.models.PayCategory.create({
                ...payCategory, groupId: group.id
            });

            if (payCategoryErrors) {
                console.error("Failed to create payCategory:", payCategoryErrors);
                return;
            }           
        } catch (error) {
            console.error("Error adding payCategory:", error);
        }
    }
);



export const updatePayCategoryAtom = atom(
    null,
    async (get, set, payCategory: {id:string,name:string,description:string}) => {
        const group = get(selectedGroupAtom);

        if (!group || !group.id) {
            console.error("User must be logged in to add a payCategory.");
            return;
        }

        try {
            // Create the new payCategory
            const { errors: payCategoryErrors, data: newPayCategory }: any = await client.models.PayCategory.update({
                ...payCategory, groupId: group.id
            });

            if (payCategoryErrors) {
                console.error("Failed to create payCategory:", payCategoryErrors);
                return;
            }           
        } catch (error) {
            console.error("Error adding payCategory:", error);
        }
    }
);


//========================================================



export const selectedPayItemAtom = createPersistentAtom<PayItem | null>("user", null);



export const initializeSelectedPayItemAtom = atom(
    null,
    async (get, set, id: string) => {
        try {
            console.log("selected 0 paycategory",id);
            if (!id) {
                console.error("User ID is required to initialize the user.");
                return;
            }
            console.log("selected 1 paycategory",id);
            // Fetch user data using the provided ID
            const { data: payitem }: any = await client.models.PayItem.get(
                { id },
                {
                    selectionSet: [
                        "id", "title", "description"                        
                    ],
                    authMode: 'userPool'
                }
            );

            console.log("selected paycategory",payitem.id);

            if (payitem) {
                // Update userAtom with fetched user data
                set(selectedPayItemAtom, {
                    ...payitem
                });
                console.log("selected paycategory initialized:", payitem);
            }
        } catch (error) {
            console.error("Failed to initialize user:", error);
        }
    }
);



// Atom to remove a payItem by its ID using Immer
export const removePayItemAtom = atom(
    null,
    async (get, set, payCatId: string) => {

        try {
            // Associate the user with the payItem
            const { errors: paycatErrors } = await client.models.PayItem.delete({
                id: payCatId,
            });

            if (paycatErrors) {
                console.error("Failed to associate user with payItem:", paycatErrors);
                return;
            }
        } catch (error) {
            console.error("Error adding member:", error);
        }

        //refresh user
    }
);

export const addPayItemAtom = atom(
    null,
    async (get, set, payItem: {title:string,description:string}) => {
        const paycategory = get(selectedPayCategoryAtom);
        const group = get(selectedGroupAtom);

        if (!paycategory || !paycategory.id) {
            console.error("User must be logged in to add a payItem.");
            return;
        }

        try {
            // Create the new payItem
            const { errors: payItemErrors, data: newPayItem }: any = await client.models.PayItem.create({
                ...payItem, paycategoryId: paycategory.id, groupId: group?.id
            });

            if (payItemErrors) {
                console.error("Failed to create payItem:", payItemErrors);
                return;
            }           
        } catch (error) {
            console.error("Error adding payItem:", error);
        }
    }
);



export const updatePayItemAtom = atom(
    null,
    async (get, set, payItem: {id:string,title:string,description:string}) => {
        const paycategory = get(selectedGroupAtom);

        if (!paycategory || !paycategory.id) {
            console.error("User must be logged in to add a payItem.");
            return;
        }

        try {
            // Create the new payItem
            const { errors: payItemErrors, data: newPayItem }: any = await client.models.PayItem.update({
                ...payItem, paycategoryId: paycategory.id
            });

            if (payItemErrors) {
                console.error("Failed to create payItem:", payItemErrors);
                return;
            }           
        } catch (error) {
            console.error("Error adding payItem:", error);
        }
    }
);


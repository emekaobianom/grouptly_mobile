// src/store/atoms/userAtoms.ts
import { atom } from "jotai";
import { createPersistentAtom } from "@/utils/createPersistentAtom";
import type { Group, GroupForm } from "../interface";
import { produce } from "immer";
import { client } from "..";
import { userAtom } from "./userAtoms";

// Persistent atom for group data, initialized with placeholder data
export const groupsAtom = createPersistentAtom<Group[]>("groups", []);
export const selectedGroupAtom = createPersistentAtom<Group | null>("group", null);


export const initializeGroupsAtom = atom(
    null,
    async (get, set) => {
        try {
            const { data: groups }: any = await client.models.Group.list({authMode: 'userPool'}); // Fetch groups
            if (groups) {
                set(groupsAtom, groups);
                // Perform any additional first-load logic here
                console.log("Groups initialized:", groups);
            }
        } catch (error) {
            console.error("Failed to initialize groups:", error);
        }
    }
);


export const initializeSelectedGroupAtom = atom(
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
            const { data: group }: any = await client.models.Group.get(
                { id },
                {
                    selectionSet: [
                        "id", "short_name", "long_name",
                        "location", "logo","super_admin_user_id",
                        "paycategories.*"
                    ],
                    authMode: 'userPool'
                }
            );

            console.log("selected group",group.id);

            if (group) {
                // Update userAtom with fetched user data
                set(selectedGroupAtom, {
                    ...group
                });
                console.log("selected group initialized:", group);
            }
        } catch (error) {
            console.error("Failed to initialize user:", error);
        }
    }
);


export const addGroupAtom = atom(
    null,
    async (get, set, group: GroupForm) => {
        const user = get(userAtom);

        if (!user || !user.id) {
            console.error("User must be logged in to add a group.");
            return;
        }

        try {
            // Create the new group
            const { errors: groupErrors, data: newGroup }: any = await client.models.Group.create({
                ...group, super_admin_user_id: user.id
            });

            if (groupErrors) {
                console.error("Failed to create group:", groupErrors);
                return;
            }

            // Associate the user with the group
            // const { errors: memberErrors } = await client.models.Member.create({
            //     userId: user.id,
            //     groupId: newGroup.id,
            //     status: "active"
            // });

            // if (memberErrors) {
            //     console.error("Failed to associate user with group:", memberErrors);
            //     return;
            // }


            // Add the new group to the Jotai store
            set(
                groupsAtom,
                produce((draft: Group[]) => {
                    draft.push(newGroup);
                })
            );
            return newGroup.id;
        } catch (error) {
            console.error("Error adding group:", error);
        }
    }
);

// Atom to retrieve a specific group by its ID
export const getGroupAtom = atom(
    (get) => {
        const groups = get(groupsAtom); // Get all groups from the store
        return (groupId: string) => groups.find((group) => group.id === groupId); // Find the group with the matching ID
    }
);

// Atom to remove a group by its ID using Immer
export const removeGroupAtom = atom(
    null,
    (get, set, groupId: string) => {
        set(groupsAtom, produce((draft: Group[]) => {
            // Filter out the group with the specified ID
            return draft.filter((group) => group.id !== groupId);
        }));
    }
);


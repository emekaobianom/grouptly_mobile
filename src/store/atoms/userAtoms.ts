import { atom } from "jotai";
import { createPersistentAtom } from "@/utils/createPersistentAtom";
import { produce } from "immer";
import type { User } from "../interface";
import { client } from "..";
import { getDynamicImageName } from "@/utils/simpleCases";

// Persistent atom for user data, synced with local storage
export const userAtom = createPersistentAtom<User | null>("user", null);

// Fetch existing user data
export const getUserAtom = atom((get) => get(userAtom));

export const initializeUserAtom = atom(
    null,
    async (get, set, id: string) => {
        console.log("user to add ", id);
        try {
            if (!id) {
                console.error("User ID is required to initialize the user.");
                return;
            }

            // Reset userAtom
            set(userAtom, null);

            // Fetch user data using the provided ID
            const { data: user }: any = await client.models.User.get(
                { id },
                {
                    selectionSet: [
                        "id", "firstname", "middlename", "lastname", "gender", "image", "phone",
                        "memberships.id",
                        "memberships.group.id", "memberships.group.short_name", "memberships.group.long_name",
                        "memberships.group.location", "memberships.status", "memberships.group.logo", "memberships.group.super_admin_user_id"
                    ],
                    authMode: 'userPool'
                }
            );
            console.log("user in db ", user);
            if (user) {
                // Update userAtom with fetched user data
                set(userAtom, {
                    ...user,
                    fullname: `${user.firstname} ${user.lastname}`.trim(),
                });
                console.log("User initialized:", user);
            }
            return user;
        } catch (error) {
            console.error("Failed to initialize user:", error);
        }
    }
);

// Atom to create a new user
export const createUserAtom = atom(
    null,
    async (get, set, userData: User) => {
        try {
            const { data: newUser }: any = await client.models.User.create(
                userData,
                {
                    selectionSet: [
                        "id", "firstname", "middlename", "lastname", "image", "phone", "gender"
                    ],
                    authMode: 'userPool'
                }
            );
            console.log("User created: ", newUser);
            if (newUser) {
                set(userAtom, {
                    ...newUser,
                    image: "",
                    fullname: `${newUser.firstname} ${newUser.lastname}`.trim(),
                });
            }
        } catch (error) {
            console.error("Failed to create user:", error);
        }
    }
);

// Atom to update an existing user
export const updateUserAtom = atom(
    null,
    async (get, set, userData: Partial<User> & { id: string }) => {
        try {
            const { id, ...updateFields } = userData;
            console.log("User userData: ",userData);
            const { data: updatedUser }: any = await client.models.User.update(
                {
                    id,
                    ...updateFields
                },
                {
                    selectionSet: [
                        "id", "firstname", "middlename", "lastname", "image", "phone", "gender"
                    ],
                    authMode: 'userPool'
                }
            );
            console.log("User updated: ", id, updatedUser);
            if (updatedUser) {
                set(userAtom, produce((draft: User | null) => {
                    if (!draft) return;
                    Object.assign(draft, updatedUser);
                    draft.image = getDynamicImageName(updatedUser.image); // Force image reload
                    draft.fullname = `${updatedUser.firstname} ${updatedUser.lastname}`.trim();
                }));
            }
            return updatedUser;
        } catch (error) {
            console.error("Failed to update user:", error);
            throw error; // Re-throw to allow component to handle the error
        }
    }
);

// Atom to set or update user data locally, with Immer to handle immutable state updates
export const setUserAtom = atom(
    null,
    (get, set, userData: Partial<User>) => {
        set(userAtom, produce((draft: User | null) => {
            if (!draft) return; // If user is null, do nothing
            Object.assign(draft, userData); // Merge new user data into the current user state
            draft.fullname = `${draft.firstname} ${draft.lastname}`.trim(); // Update computed full name
        }));
    }
);

// Atom to log out the user by resetting the user state to `null`
export const logoutUserAtom = atom(null, (get, set) => set(userAtom, null));
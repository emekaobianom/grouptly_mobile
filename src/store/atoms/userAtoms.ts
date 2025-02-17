// src/store/atoms/userAtoms.ts
import { atom } from "jotai";
import { createPersistentAtom } from "@/utils/createPersistentAtom";
import { produce } from "immer";
import type { User } from "../interface";
import { client } from "..";


// Persistent atom for user data, synced with local storage
export const userAtom = createPersistentAtom<User | null>("user", null);


export const initializeUserAtom = atom(
    null,
    async (get, set, id: string) => {
        console.log("user to add ",id)
        try {
            if (!id) {
                console.error("User ID is required to initialize the user.");
                return;
            }

            // Fetch user data using the provided ID
            const { data: user }: any = await client.models.User.get(
                { id },
                {
                    selectionSet: [
                        "id", "firstname", "middlename", "lastname", "image", "role",
                        "memberships.id",
                        "memberships.group.id", "memberships.group.short_name", "memberships.group.long_name",
                        "memberships.group.location", "memberships.status", "memberships.group.logo","memberships.group.super_admin_user_id"
                    ],
                    authMode: 'userPool'
                }
            );
console.log("user in db ",user)
            if (user) {
                // Update userAtom with fetched user data
                set(userAtom, {
                    ...user,
                    fullname: `${user.firstname} ${user.lastname}`.trim(),
                });
                console.log("User initialized:", user);
            }

        } catch (error) {
            console.error("Failed to initialize user:", error);
        }
    }
);




// Atom to set or update user data, with Immer to handle immutable state updates
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

// Atom to log out the user by resetting the user state to initial values
// Atom to log out the user by resetting the user state to `null`
export const logoutUserAtom = atom(null, (get, set) => set(userAtom, null));

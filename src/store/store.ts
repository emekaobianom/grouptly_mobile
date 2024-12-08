import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { produce } from "immer";
// import { groupsData } from "@/data/group_placeholder";

//---amplify setup
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
Amplify.configure(outputs);

// --- Amplify ---
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/data-schema";
import { User, Group, Message, Member, GroupForm, MemberForm } from "./interface";

const client = generateClient<Schema>(); // Initialize the Amplify client with your schema
// --- End Amplify ---


// Utility function for creating persistent Jotai atoms that sync with local storage
const createPersistentAtom = <T>(key: string, initialValue: T) => {
    return atomWithStorage<T>(key, initialValue);
};


// Persistent atom for user data, synced with local storage
export const userAtom = createPersistentAtom<User | null>("user", null);

// Persistent atom for group data, initialized with placeholder data
export const groupsAtom = createPersistentAtom<Group[]>("groups", []);


// Persistent atom for group data, initialized with placeholder data
export const membersAtom = createPersistentAtom<Member[]>("members", []);


export const selectedGroupAtom = createPersistentAtom<Group | null>("group", null);

// Persistent atoms for managing other data structures
export const messagesAtom = createPersistentAtom<Record<string, Message[]>>("messages", {});
export const eventsAtom = createPersistentAtom<Event[]>("events", []);
export const notificationsAtom = createPersistentAtom<Notification[]>("notifications", []);

//-------------------------------------------------------------------

export const memberFullname = (user: User | Member) => `${user.firstname} ${user.lastname}`;


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
                        "memberships.group.location", "memberships.status", "memberships.group.logo"
                    ]
                }
            );

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

export const initializeGroupsAtom = atom(
    null,
    async (get, set) => {
        try {
            const { data: groups }: any = await client.models.Group.list(); // Fetch groups
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


export const initializeMembersAtom = atom(
    null,
    async (get, set) => {
        try {
            const group = get(selectedGroupAtom);
            if (!group) throw new Error("No group selected for initializing members.");
            console.log("member id ", group.id)
            const { data: members }: any = await client.models.Member.list({
                filter: { groupId: { eq: group.id } },
                selectionSet: [
                    "id", "userId", "groupId", "firstname", "middlename", "lastname", "gender",
                    "phone", "image_url", "regno", "role", "address", "status",
                ],
            });

            console.log("members ", members)

            set(membersAtom, [...members]);
        } catch (error) {
            console.error("Failed to initialize members:", error);
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
                        "location", "logo"
                    ]
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


//-------------------------------------------------------------------
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

// Atom to add a new group to the list of groups using Immer
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

// Atom to remove a group by its ID using Immer
export const updateMemberStatusAtom = atom(
    null,
    async (get, set,memberId: string, new_status: string) => {

        try {
            // Associate the user with the group
            const { errors: memberErrors } = await client.models.Member.update({
                id: memberId,
                status:new_status
            });

            if (memberErrors) {
                console.error("Failed to associate user with group:", memberErrors);
                return;
            }


        } catch (error) {
            console.error("Error adding member:", error);
        }

        //refresh user
    }
);

export const getMember = atom(
    (get) => (memberId: string) => {
        const members = get(membersAtom); // Fetch current members state
        const member = members.find((m) => m.id === memberId);

        if (!member) {
            console.log(`Member with ID ${memberId} not found.`);
            return null; // Return null or handle appropriately
        }

        return member; // Return the found member
    }
);

export const getActiveMembersOfGroup = atom<Member[]>((get) => {
    const members = get(membersAtom); // Get the current user state

    // Filter and map to include only groups the user is part of, with their status
    const filteredMembers: Member[] = members.filter((member: Member) => member.status === "active");

    return filteredMembers;
});

export const getNonActiveMembersOfGroup = atom<Member[]>((get) => {
    const members = get(membersAtom); // Get the current user state

    // Filter and map to include only groups the user is part of, with their status
    const filteredMembers: Member[] = members.filter((member: Member) => member.status !== "active");

    return filteredMembers;
});

// Atom to remove a group by its ID using Immer
export const removeMemberAtom = atom(
    null,
    async (get, set, memberId: string) => {

        try {
            // Associate the user with the group
            const { errors: memberErrors } = await client.models.Member.delete({
                id: memberId,
            });

            if (memberErrors) {
                console.error("Failed to associate user with group:", memberErrors);
                return;
            }
        } catch (error) {
            console.error("Error adding member:", error);
        }

        //refresh user
    }
);


// Atom to remove a group by its ID using Immer
export const deleteGroupAtom = atom(
    null,
    async (get, set, groupId: string) => {

        try {
            // Associate the user with the group
            const { errors: groupErrors } = await client.models.Group.delete({
                id: groupId,
            });

            //remove it visually --- no need to do dynamondb call
            const groups = get(groupsAtom);
            set(groupsAtom, groups.filter((group) => group.id !== groupId));

            if (groupErrors) {
                console.error("Failed to associate user with group:", groupErrors);
                return;
            }
        } catch (error) {
            console.error("Error adding group:", error);
        }

        //refresh user
    }
);

// Derived atom to get user-specific groups with status included
export const memberGroupsAtom = atom<Group[]>((get) => {
    const user = get(userAtom); // Get the current user state
    const allGroups = get(groupsAtom); // Get all groups

    // Safely access user.groups with a fallback to an empty array
    const members: any = user?.memberships ?? [];

    // Filter and map to include only groups the user is part of, with their status
    const filteredMembers: Group[] = allGroups
        .filter((group) => members.some((member: Member) => member.id === group.id))
        .map((group) => ({
            ...group,
            user_status: members.find((member: Member) => member.id === group.id)?.user_status,
        }));

    return filteredMembers;
});



// Atom to add a new group to the list of groups using Immer
export const addMemberAtom = atom(
    null,
    async (get, set, thisMember: MemberForm) => {

        try {
            // Associate the user with the group
            const { errors: memberErrors } = await client.models.Member.create(thisMember);

            if (memberErrors) {
                console.error("Failed to associate user with group:", memberErrors);
                return;
            }
        } catch (error) {
            console.error("Error adding member:", error);
        }
    }
);

export const GroupsWithMembersAtom = atom<Group[]>((get) => {
    const user = get(userAtom); // Get the current user state
    const allGroups = get(groupsAtom); // Get all groups

    // Safely access user.groups with a fallback to an empty array
    const memberships: any = user?.memberships ?? [];

    // Filter and map to include only groups the user is part of, with their status
    const groupsWithUser: Group[] = allGroups.map((group) => ({
        ...group,
        user_status: memberships.find((member: Member) => member.id === group.id)?.user_status,
    }));

    return groupsWithUser;
});


// Atom to add a message to a specific group using Immer
export const addMessageAtom = atom(
    null,
    (get, set, { groupId, message }: { groupId: string; message: Message }) => {
        set(messagesAtom, produce((draft: Record<string, Message[]>) => {
            // Initialize the array if it doesn"t exist
            if (!draft[groupId]) draft[groupId] = [];
            // Add the new message
            draft[groupId].push(message);
        }));
    }
);

// Atom to add an event using Immer
export const addEventAtom = atom(
    null,
    (get, set, event: Event) => {
        set(eventsAtom, produce((draft: Event[]) => {
            draft.push(event); // Add new event to the list
        }));
    }
);

// Atom to add a notification using Immer
export const addNotificationAtom = atom(
    null,
    (get, set, notification: Notification) => {
        set(notificationsAtom, produce((draft: Notification[]) => {
            draft.push(notification); // Add new notification to the list
        }));
    }
);

// Atom to clear all notifications
export const clearNotificationsAtom = atom(
    null,
    (get, set) => {
        set(notificationsAtom, []); // Reset notifications array to empty
    }
);


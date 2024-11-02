import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { produce } from 'immer';
import { groupsData } from '@/data/group_placeholder';

// Utility function for creating persistent Jotai atoms that sync with local storage
const createPersistentAtom = <T>(key: string, initialValue: T) => {
    return atomWithStorage<T>(key, initialValue);
};

// Define types for User data structure
export interface User {
    id: string | null;
    firstname: string;
    middlename?: string;
    lastname: string;
    role: string;
    image: string;
    phone?: string;
    groups: UserGroupStatus[]; // List of groups the user is part of with statuses
    fullname?: string; // Computed full name of the user
}

// Enum representing possible statuses a user can have in a group
export enum UserStatus {
    Active = "active",
    Pending = "pending",
    Suspended = "suspended",
    Rejected = "rejected"
}

// Interface representing a user's status in a specific group
export interface UserGroupStatus {
    id: string; // ID of the group
    user_status: UserStatus; // Status of the user within that group
}

// Interface representing basic group information
export interface Group {
    id: string;
    long_name: string;
    short_name: string;
    location: string;
    category: string;
    logo: string;
    //for inidividual user
    user_status?: UserStatus; // Status of the user within that group
}

// Interface representing a message in a group
export interface Message {
    text: string;
    timestamp: number; // UNIX timestamp or ISO string for when the message was sent
    sender: string; // Identifier for who sent the message
}

// Interface representing an event
export interface Event {
    id: string;
    name: string;
    groupId: string; // The group associated with the event
    date: string; // Date of the event (ISO string)
}

// Interface representing a notification
export interface Notification {
    id: string;
    message: string; // Content of the notification
    type: 'info' | 'warning' | 'error'; // Type of notification for categorization
}

// Persistent atom for user data, synced with local storage
export const userAtom = createPersistentAtom<User>('user', {
    id: null,
    firstname: '',
    lastname: '',
    role: '',
    image: '',
    phone: '',
    groups: [],
    fullname: ''
});

// Persistent atom for group data, initialized with placeholder data
export const groupsAtom = createPersistentAtom<Group[]>('groups', groupsData);

// Persistent atoms for managing other data structures
export const messagesAtom = createPersistentAtom<Record<string, Message[]>>('messages', {});
export const eventsAtom = createPersistentAtom<Event[]>('events', []);
export const notificationsAtom = createPersistentAtom<Notification[]>('notifications', []);

// Atom to set or update user data, with Immer to handle immutable state updates
export const setUserAtom = atom(
    null,
    (get, set, userData: Partial<User>) => {
        set(userAtom, produce((draft: User) => {
            // Merge new user data into the current user state
            Object.assign(draft, userData);
            // Update computed full name
            draft.fullname = `${draft.firstname} ${draft.lastname}`.trim();
        }));
    }
);

// Atom to log out the user by resetting the user state to initial values
export const logoutUserAtom = atom(
    null,
    (get, set) => {
        set(userAtom, {
            id: null,
            firstname: '',
            lastname: '',
            role: '',
            image: '',
            phone: '',
            groups: [],
            fullname: ''
        });
    }
);

// Atom to add a new group to the list of groups using Immer
export const addGroupAtom = atom(
    null,
    (get, set, group: Group) => {
        set(groupsAtom, produce((draft: Group[]) => {
            draft.push(group); // Append new group
        }));
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

// Derived atom to get user-specific groups with status included
export const userGroupsAtom = atom<Group[]>((get) => {
    const user = get(userAtom); // Get the current user state
    const allGroups = get(groupsAtom); // Get all groups

    // Filter and map to include only groups the user is part of, with their status
    const userGroups: Group[] = allGroups
        .filter(group => user?.groups.some(userGroup => userGroup.id === group.id))
        .map(group => ({
            ...group,
            user_status: user?.groups.find(userGroup => userGroup.id === group.id)?.user_status
        }));
    return userGroups;
});

export const GroupsWithUserGroupsAtom = atom<Group[]>((get) => {
    const user = get(userAtom); // Get the current user state
    const allGroups = get(groupsAtom); // Get all groups

    // Filter and map to include only groups the user is part of, with their status
    const groupswithuser: Group[] = allGroups
        .map(group => ({
            ...group,
            user_status: user?.groups.find(userGroup => userGroup.id === group.id)?.user_status
        }));
    return groupswithuser;
});


// Atom to add a message to a specific group using Immer
export const addMessageAtom = atom(
    null,
    (get, set, { groupId, message }: { groupId: string; message: Message }) => {
        set(messagesAtom, produce((draft: Record<string, Message[]>) => {
            // Initialize the array if it doesn't exist
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




//========================= original =================================

// export const groupsAtom = atom<Group[]>(groupsData);

// export const messagesAtom = atom<Record<string, Message[]>>({});
// export const eventsAtom = atom<Event[]>([]);
// export const notificationsAtom = atom<Notification[]>([]);

// // Derived atoms for actions
// export const setUserAtom = atom(
//     null,
//     (get, set, userData) => {
//         const currentUser = get(userAtom);
//         set(userAtom, {
//             ...currentUser,
//             ...userData,
//             fullname: `${userData.firstname || currentUser.firstname} ${userData.lastname || currentUser.lastname}`.trim(),
//         });
//     }
// );

// export const logoutUserAtom = atom(
//     null,
//     (get, set) => {
//         set(userAtom, {
//             id: null,
//             firstname: '',
//             lastname: '',
//             role: '',
//             image: '',
//             phone: '',
//             groups: [],
//             fullname: ''
//         });
//     }
// );

// // Group actions
// export const addGroupAtom = atom(
//     null,
//     (get, set, group: Group) => {
//         const currentGroups = get(groupsAtom);
//         set(groupsAtom, [...currentGroups, group]);
//     }
// );

// export const removeGroupAtom = atom(
//     null,
//     (get, set, groupId: string) => {
//         const currentGroups = get(groupsAtom);
//         set(groupsAtom, currentGroups.filter((group) => group.id !== groupId));
//     }
// );


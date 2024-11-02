import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { produce } from 'immer';
import { groupsData } from '@/data/group_placeholder';

// Generic persistent atom creator
const createPersistentAtom = <T>(key: string, initialValue: T) => {
    return atomWithStorage<T>(key, initialValue);
};

// Define types for User Slice
export interface User {
    id: string | null;
    firstname: string;
    middlename?: string;
    lastname: string;
    role: string;
    image: string;
    phone?: string;
    groups: UserGroup[];
    fullname?: string;
}

export interface UserGroup {
    id: string;
    active: string;
}

export interface Group {
    id: string;
    long_name: string;
    short_name: string;
    location: string;
    category: string;
    status: string;
    logo: string;
}

export interface Message {
    text: string;
    timestamp: number;
    sender: string;
}

export interface Event {
    id: string;
    name: string;
    groupId: string;
    date: string;
}

export interface Notification {
    id: string;
    message: string;
    type: 'info' | 'warning' | 'error';
}

// Create persistent atoms for state management
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
export const groupsAtom = createPersistentAtom<Group[]>('groups', groupsData);
export const messagesAtom = createPersistentAtom<Record<string, Message[]>>('messages', {});
export const eventsAtom = createPersistentAtom<Event[]>('events', []);
export const notificationsAtom = createPersistentAtom<Notification[]>('notifications', []);

// Derived atoms for user actions using Immer
export const setUserAtom = atom(
    null,
    (get, set, userData) => {
        set(userAtom, produce((draft) => {
            if (draft) {
                Object.assign(draft, userData);
                draft.fullname = `${draft.firstname} ${draft.lastname}`.trim();
            }
        }));
    }
);

// Logout action
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

// Group actions using Immer
export const addGroupAtom = atom(
    null,
    (get, set, group: Group) => {
        set(groupsAtom, produce((draft) => {
            draft.push(group);
        }));
    }
);

export const removeGroupAtom = atom(
    null,
    (get, set, groupId: string) => {
        set(groupsAtom, produce((draft) => {
            return draft.filter((group: Group) => group.id !== groupId);
        }));
    }
);

// User groups derived atom
export const userGroupsAtom = atom<Group[]>((get) => {
    const user = get(userAtom); // Get the user from userAtom
    const allGroups = get(groupsAtom); // Get all groups

    // Filter to return only the groups the user is part of
    return allGroups.filter((group) =>
        user?.groups.some((userGroup: UserGroup) => userGroup.id === group.id)
    );
});

// Messages actions using Immer
export const addMessageAtom = atom(
    null,
    (get, set, { groupId, message }: { groupId: string; message: Message }) => {
        set(messagesAtom, produce((draft) => {
            if (!draft[groupId]) draft[groupId] = [];
            draft[groupId].push(message);
        }));
    }
);

// Events actions using Immer
export const addEventAtom = atom(
    null,
    (get, set, event: Event) => {
        set(eventsAtom, produce((draft) => {
            draft.push(event);
        }));
    }
);

// Notifications actions using Immer
export const addNotificationAtom = atom(
    null,
    (get, set, notification: Notification) => {
        set(notificationsAtom, produce((draft) => {
            draft.push(notification);
        }));
    }
);

export const clearNotificationsAtom = atom(
    null,
    (get, set) => {
        set(notificationsAtom, []);
    }
);

// src/store/atoms/userAtoms.ts
import { atom } from "jotai";
import { createPersistentAtom } from "@/utils/createPersistentAtom";
import { UserStatus, type Group, type Member, type MemberForm } from "../interface";
import { produce } from "immer";
import { client } from "..";
import { groupsAtom, selectedGroupAtom } from "./groupAtoms";
import { userAtom } from "./userAtoms";

// Persistent atom for group data, initialized with placeholder data
export const membersAtom = createPersistentAtom<Member[]>("members", []);


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
                    authMode: 'userPool'
            });

            console.log("members ", members)

            set(membersAtom, [...members]);
        } catch (error) {
            console.error("Failed to initialize members:", error);
        }
    }
);


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


//-------------------------------------------------------
export const getMembersOfGroup = atom<Member[]>((get) => {
    const members = get(membersAtom); // Get the current user state

    // Filter and map to include only groups the user is part of, with their status
    const filteredMembers: Member[] = members.filter((member: Member) => (member.status !== UserStatus.Rejected)).filter((member: Member) => (member.status !== UserStatus.Pending));

    return filteredMembers;
});

export const getExecutiveMembersOfGroup = atom<Member[]>((get) => {
    const members = get(getMembersOfGroup); // Get the current user state

    // Filter and map to include only groups the user is part of, with their status
    const filteredMembers: Member[] = members.filter((member: Member) => member.role === "executive");

    return filteredMembers;
});
//------------------------------------------------------------



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

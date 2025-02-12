import { User, Member } from "@/store/interface";

export const memberFullname = (user: User | Member) => `${user.firstname} ${user.lastname}`;

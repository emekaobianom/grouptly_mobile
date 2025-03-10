
// Define types for data structure
import type { SelectionSet } from 'aws-amplify/data';
import type { Schema } from "@/data-schema";

// export type User = Schema['User']['type'];
// export type Member = Schema['Member']['type'];
// export type Group = Schema['Group']['type'];

//forms
const groupFormSelectionSet = ['long_name', 'short_name', 'location', 'category', 'logo', 'super_admin_user_id'] as const;
export type GroupForm = SelectionSet<Schema['Group']['type'], typeof groupFormSelectionSet>

const memberFormSelectionSet = ['userId', 'groupId', 'firstname', 'middlename', 'lastname', 'gender','fcmToken', 'phone', 'image_url', 'status'] as const;
export type MemberForm = SelectionSet<Schema['Member']['type'], typeof memberFormSelectionSet>


export interface User {
    id: string;
    firstname: string;
    middlename?: string;
    lastname: string;
    gender: string;
    image?: string;
    phone?: string;
    fullname?: string; // Computed full name of the user
    fcmToken?: string;
    memberships: Member[]; // List of groups the user is part of with statuses
}

// Enum representing possible statuses a user can have in a group
export enum UserStatus {
    Active = "active",
    Pending = "pending",
    Suspended = "suspended",
    Rejected = "rejected"
}


export interface Member {
    id: string; 
    //-------
    userId: string;
    groupId: string;
    firstname?: string;
    middlename: string;
    lastname: string;
    gender: string;
    phone: string;
    fcmToken: string;
    image_url: string;
    regno: string;
    role: string;
    address: string;
    status: UserStatus; // Status of the user within that 
    group?: Group;
    user?: User;
}


export interface Group {
    id?: string;
    long_name: string;
    short_name: string;
    location: string;
    category: string;
    logo: string;
    super_admin_user_id: string; //super_admin that can delete this group
    members: Member[];
    paycategories:PayCategory[];
}

export interface PayCategory {
    id: string;
    name: string;
    description: string;
    payitems:PayItem[];
}


export interface PayItem {
    id: string;
    payId: string; //code identifier
    title: string;
    description: string;
    status: string; //open,closed for payment
    paymentType:string; //perMember, freeDonation
    groupId: string;
    paycategoryId: string;
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
    type: "info" | "warning" | "error"; // Type of notification for categorization
}


// Define types for User data structure
export interface User {
    id: string | null;
    firstname: string;
    middlename?: string;
    lastname: string;
    role: string;
    image: string;
    phone?: string;
    groups: UserGroup[]; // List of groups the user is part of with statuses
    fullname?: string; // Computed full name of the user
}

// Enum representing possible statuses a user can have in a group
export enum UserStatus {
    Active = "active",
    Pending = "pending",
    Suspended = "suspended",
    Rejected = "rejected"
}

// Interface representing a user"s status in a specific group
export interface UserGroup {
    id: string; // ID of the group
    user_status: UserStatus; // Status of the user within that 
    group:Group;
    user:User;
}

// Interface representing basic group information
export interface Group {
    id?: string;
    long_name: string;
    short_name: string;
    location: string;
    category: string;
    logo: string;
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

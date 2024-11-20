// Sample DynamoDB non-SQL tables structure

const UsersTable = {
    user1: {
        userId: 'u001',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'member',
        profileImage: 'https://example.com/images/john.jpg',
        dateJoined: '2023-10-15',
        status: 'active',
        groups: [
            {
                id: "group1",
                user_status: 'active',
                inbox: [
                    { id: "inbox1", sender: "app", title: "Admin Info", message: "Welcome to Tech Enthusiasts!" },
                    { id: "inbox2", sender: "u002", title: "Meetup Reminder", message: "Don't forget our upcoming meetup!" },
                    { id: "inbox3", sender: "app", title: "Policy Update", message: "Please review our new policy changes." }
                ],
                payments: [
                    { paymentId: "pp001", amount: 9000, date: "2023-10-20", status: "paid" },
                    { paymentId: "pp002", amount: 5000, date: "2023-11-05", status: "pending" }
                ]
            },
            {
                id: "group2",
                user_status: 'suspended',
                inbox: [
                    { id: "inbox4", sender: "u001", title: "Admin Notice", message: "Group temporarily suspended." }
                ],
                payments: []
            }
        ]
    },
    user2: {
        userId: 'u002',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'admin',
        profileImage: 'https://example.com/images/jane.jpg',
        dateJoined: '2023-11-01',
        status: 'active',
        groups: [
            {
                id: "group1",
                user_status: 'active',
                inbox: [
                    { id: "inbox5", sender: "u001", title: "Welcome!", message: "Excited to have you here!" },
                    { id: "inbox6", sender: "app", title: "Payment Update", message: "Your last payment was received." }
                ],
                payments: [
                    { paymentId: "pp003", amount: 12000, date: "2023-10-22", status: "paid" }
                ]
            },
            {
                id: "group2",
                user_status: 'active',
                inbox: [
                    { id: "inbox7", sender: "app", title: "Monthly Update", message: "Check out what's new in the Book Club!" }
                ],
                payments: [
                    { paymentId: "pp004", amount: 5000, date: "2023-11-05", status: "paid" }
                ]
            }
        ]
    }
};

const Groups = {
    group1: {
        groupId: 'g001',
        longName: 'Tech Enthusiasts Group',
        shortName: 'Techies',
        location: 'New York',
        category: 'Technology',
        status: 'active',
        logo: 'https://example.com/logos/tech.png',
        payItems: [
            {
                id: "p001",
                type: "donation",
                mandatoryAmount: "",
                description: "General donation for tech initiatives",
                createdDate: "2023-08-15",
                createdBy: "u002",
                payments: [
                    {
                        id: "pp001",
                        userId: "u001",
                        pledge: 9000,
                        paid: 9000,
                        fullyPaid: true,
                        installments: [
                            { id: "inst1", amount: 4500, date: "2023-09-01" },
                            { id: "inst2", amount: 4500, date: "2023-10-01" }
                        ]
                    },
                    {
                        id: "pp005",
                        userId: "u002",
                        pledge: 10000,
                        paid: 5000,
                        fullyPaid: false,
                        installments: [
                            { id: "inst3", amount: 5000, date: "2023-10-20" }
                        ]
                    }
                ]
            },
            {
                id: "p002",
                type: "mandatory",
                mandatoryAmount: 9000,
                description: "Annual membership fee",
                createdDate: "2023-01-10",
                createdBy: "u002",
                payments: [
                    {
                        id: "pp006",
                        userId: "u003",
                        pledge: 0,
                        paid: 3000,
                        fullyPaid: false,
                        installments: [
                            { id: "inst4", amount: 3000, date: "2023-11-01" }
                        ]
                    }
                ]
            }
        ],
        events: [
            {
                id: "e001",
                category: "meeting",
                title: "Monthly Tech Meetup",
                description: "Discussing the latest in technology",
                date: "2023-11-15",
                time: "6:00 PM",
                venue: "Tech Center NY",
                attendance: ["u001", "u002"]
            },
            {
                id: "e002",
                category: "workshop",
                title: "AI in Modern Tech",
                description: "Hands-on AI workshop",
                date: "2023-12-10",
                time: "10:00 AM",
                venue: "Tech Lab"
            }
        ],
        news: [
            {
                id: "news001",
                title: "New Project Launch",
                description: "We are launching a project on open-source contributions.",
                createdBy: "u002",
                createdDate: "2023-10-10"
            },
            {
                id: "news002",
                title: "Hackathon Announced",
                description: "Participate in our upcoming hackathon event!",
                createdBy: "u002",
                createdDate: "2023-10-20"
            }
        ],
        calendar: [
            {
                id: "cal001",
                date: "2023-12-01",
                title: "Holiday Gathering",
                description: "End-of-year celebration",
                createdBy: "u002",
                createdDate: "2023-11-01"
            },
            {
                id: "cal002",
                date: "2024-01-10",
                title: "Tech Startups Panel",
                description: "A panel on tech startups in 2024",
                createdBy: "u001",
                createdDate: "2023-12-15"
            }
        ],
        members: ['u001', 'u002', 'u003'],
        history: "Founded in 2023 to foster a community of tech enthusiasts.",
        constitution: "This group is dedicated to learning, sharing, and growing in the tech space."
    },
    group2: {
        groupId: 'g002',
        longName: 'Book Club',
        shortName: 'Readers',
        location: 'San Francisco',
        category: 'Literature',
        status: 'active',
        logo: 'https://example.com/logos/bookclub.png',
        payItems: [
            {
                id: "p003",
                type: "mandatory",
                mandatoryAmount: 5000,
                description: "Annual book club membership",
                createdDate: "2023-06-01",
                createdBy: "u001",
                payments: [
                    {
                        id: "pp007",
                        userId: "u001",
                        pledge: 0,
                        paid: 5000,
                        fullyPaid: true,
                        installments: []
                    }
                ]
            }
        ],
        events: [
            {
                id: "e003",
                category: "meeting",
                title: "Monthly Book Discussion",
                description: "Discussing 'To Kill a Mockingbird'",
                date: "2023-11-20",
                time: "5:00 PM",
                venue: "SF Public Library",
                attendance: ["u001", "u003"]
            },
            {
                id: "e004",
                category: "social",
                title: "Holiday Book Swap",
                description: "Bring a book to swap with fellow readers.",
                date: "2023-12-15",
                time: "7:00 PM",
                venue: "Community Center"
            }
        ],
        news: [
            {
                id: "news003",
                title: "Book of the Month",
                description: "This month's pick is '1984' by George Orwell.",
                createdBy: "u001",
                createdDate: "2023-11-01"
            },
            {
                id: "news004",
                title: "Author Visit",
                description: "Meet local author Jane Austen at our next event.",
                createdBy: "u002",
                createdDate: "2023-11-15"
            }
        ],
        calendar: [
            {
                id: "cal003",
                date: "2024-01-15",
                title: "Author Signing Event",
                description: "Special book signing by Jane Austen",
                createdBy: "u002",
                createdDate: "2023-12-20"
            }
        ],
        members: ['u001', 'u002'],
        history: "Founded to bring together book lovers in the Bay Area.",
        constitution: "This group is dedicated to fostering a love of reading and discussing literature."
    }
};


// // for dynamodb

// type User {
//     userId: ID!
//     name: String
//     email: String
//     role: String
//     profileImage: String
//     dateJoined: String
//     status: String
//     groups: [UserGroup]
// }

// type UserGroup {
//     groupId: ID!
//     userStatus: String
//     inbox: [InboxMessage]
//     payments: [Payment]
// }

// type Group {
//     groupId: ID!
//     longName: String
//     shortName: String
//     location: String
//     category: String
//     status: String
//     logo: String
//     payItems: [PayItem]
//     events: [Event]
//     donationsSupport: [DonationSupport]
//     news: [News]
//     calendar: [CalendarItem]
//     members: [Member]
//     history: String
//     constitution: String
// }

// type InboxMessage {
//     id: ID!
//     sender: String
//     title: String
//     message: String
// }

// type PayItem {
//     id: ID!
//     type: String
//     mandatoryAmount: String
//     description: String
//     createdDate: String
//     createdBy: String
//     payments: [Payment]
// }

// type Payment {
//     id: ID!
//     userId: ID!
//     pledge: String
//     paid: String
//     fullyPaid: Boolean
//     installments: [Installment]
// }

// type Installment {
//     id: ID!
//     amount: String
//     date: String
// }

// type Event {
//     id: ID!
//     category: String
//     title: String
//     description: String
//     date: String
//     time: String
//     venue: String
//     attendance: [String]
// }

// type News {
//     id: ID!
//     title: String
//     description: String
//     createdBy: String
//     createdDate: String
// }

// type CalendarItem {
//     id: ID!
//     date: String
//     title: String
//     description: String
//     createdBy: String
//     createdDate: String
// }

// type Member {
//     userId: ID!
//     joinedDate: String
//     role: String
// }

// type Query {
//     getUser(userId: ID!): User
//     getGroup(groupId: ID!): Group
//     listGroups: [Group]
// }

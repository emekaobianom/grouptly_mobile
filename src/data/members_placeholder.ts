// Define the Member interface
export interface MemberType {
  id: string | null;
  firstname: string;
  middlename?: string;
  lastname: string;
  fullname?: string; 
  phone?: string;
  role: string;
  image: string;
  groups: UserGroup[];
}

interface UserGroup {
  id: string;
  active: string;
}


// Updated membersData with 'id' as string
export const membersData: MemberType[] = [
  { id: '1', firstname: 'Emeka', lastname: 'Obianom', middlename: 'Sunday', phone:"08033806763", role: 'Chairman', image: 'https://randomuser.me/api/portraits/men/1.jpg', groups: [{id:"g2",active:"false"}] },
  { id: '2', firstname: 'John', lastname: 'Doe', phone:"08033806763", role: 'Secretary', image: 'https://randomuser.me/api/portraits/men/2.jpg', groups: [] },
  { id: '3', firstname: 'Jane', lastname: 'Smith', phone:"08033806763", role: 'Treasurer', image: 'https://randomuser.me/api/portraits/women/1.jpg', groups: [] },
  { id: '4', firstname: 'Alice', lastname: 'Johnson', phone:"08033806763", role: 'Vice Chairman', image: 'https://randomuser.me/api/portraits/women/2.jpg', groups: [] },
  { id: '5', firstname: 'Bob', lastname: 'Brown', phone:"08033806763", role: 'Public Relations Officer', image: 'https://randomuser.me/api/portraits/men/3.jpg', groups: [] },
  { id: '6', firstname: 'Charlie', lastname: 'Davis', phone:"08033806763", role: 'Event Coordinator', image: 'https://randomuser.me/api/portraits/women/3.jpg', groups: [] },
  { id: '7', firstname: 'Kevin', lastname: 'Brown', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/men/7.jpg', groups: [] },
  { id: '8', firstname: 'Laura', lastname: 'Wilson', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/women/8.jpg', groups: [] },
  { id: '9', firstname: 'Paul', lastname: 'Martinez', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/men/9.jpg', groups: [] },
  { id: '10', firstname: 'Anna', lastname: 'Thompson', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/women/10.jpg', groups: [] },
  { id: '11', firstname: 'James', lastname: 'White', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/men/11.jpg', groups: [] },
  { id: '12', firstname: 'Olivia', lastname: 'Harris', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/women/12.jpg', groups: [] },
  { id: '13', firstname: 'Matthew', lastname: 'Clark', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/men/13.jpg', groups: [] },
  { id: '14', firstname: 'Sophia', lastname: 'Lewis', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/women/14.jpg', groups: [] },
  { id: '15', firstname: 'Nathan', lastname: 'Lee', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/men/15.jpg', groups: [] },
  { id: '16', firstname: 'Isabella', lastname: 'Walker', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/women/16.jpg', groups: [] },
  { id: '17', firstname: 'Ryan', lastname: 'Hall', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/men/17.jpg', groups: [] },
  { id: '18', firstname: 'Abigail', lastname: 'Allen', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/women/18.jpg', groups: [] },
  { id: '19', firstname: 'Ethan', lastname: 'Young', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/men/19.jpg', groups: [] },
  { id: '20', firstname: 'Chloe', lastname: 'King', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/women/20.jpg', groups: [] },
  { id: '21', firstname: 'Daniel', lastname: 'Scott', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/men/21.jpg', groups: [] },
  { id: '22', firstname: 'Grace', lastname: 'Baker', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/women/22.jpg', groups: [] },
  { id: '23', firstname: 'Liam', lastname: 'Nelson', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/men/23.jpg', groups: [] },
  { id: '24', firstname: 'Victoria', lastname: 'Adams', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/women/24.jpg', groups: [] },
  { id: '25', firstname: 'Andrew', lastname: 'Carter', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/men/25.jpg', groups: [] },
  { id: '26', firstname: 'Lily', lastname: 'Roberts', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/women/26.jpg', groups: [] },
  { id: '27', firstname: 'Samuel', lastname: 'Perez', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/men/27.jpg', groups: [] },
  { id: '28', firstname: 'Amelia', lastname: 'Campbell', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/women/28.jpg', groups: [] },
  { id: '29', firstname: 'Henry', lastname: 'Turner', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/men/29.jpg', groups: [] },
  { id: '30', firstname: 'Zoe', lastname: 'Parker', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/women/30.jpg', groups: [] },
  { id: '31', firstname: 'Joshua', lastname: 'Phillips', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/men/31.jpg', groups: [] },
  { id: '32', firstname: 'Mia', lastname: 'Edwards', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/women/32.jpg', groups: [] },
  { id: '33', firstname: 'Benjamin', lastname: 'Collins', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/men/33.jpg', groups: [] },
  { id: '34', firstname: 'Sofia', lastname: 'Turner', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/women/34.jpg', groups: [] },
  { id: '35', firstname: 'Jackson', lastname: 'Anderson', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/men/35.jpg', groups: [] },
  { id: '36', firstname: 'Harper', lastname: 'Stewart', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/women/36.jpg', groups: [] },
  { id: '37', firstname: 'Anthony', lastname: 'Flores', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/men/37.jpg', groups: [] },
  { id: '38', firstname: 'Lillian', lastname: 'Sanchez', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/women/38.jpg', groups: [] },
  { id: '39', firstname: 'Alexander', lastname: 'Ramirez', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/men/39.jpg', groups: [] },
  { id: '40', firstname: 'Ella', lastname: 'Bailey', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/women/40.jpg', groups: [] },
  { id: '41', firstname: 'Gabriel', lastname: 'Lee', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/men/41.jpg', groups: [] },
  { id: '42', firstname: 'Avery', lastname: 'Morris', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/women/42.jpg', groups: [] },
  { id: '43', firstname: 'Christopher', lastname: 'Rogers', phone:"08033806763", role: 'Member', image: 'https://randomuser.me/api/portraits/men/43.jpg', groups: [] }
];

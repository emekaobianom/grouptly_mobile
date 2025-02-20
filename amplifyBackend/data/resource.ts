import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({

  //------------------FOUNDATION----------------------------------
  // Define the User model
  User: a
    .model({
      firstname: a.string().required(),
      middlename: a.string(),
      lastname: a.string().required(),
      gender: a.string().required(),
      image: a.string(),
      phone: a.string(),
      fullname: a.string(),
      //----------------
      memberships: a.hasMany('Member', 'userId'), // Link to Member join table
    })
    .authorization(allow => [allow.authenticated()]),


  // ==== GROUP FEATURES ONLY
  Group: a
    .model({
      long_name: a.string(),
      short_name: a.string(),
      location: a.string(),
      category: a.string(),
      logo: a.string().default('default_logo').required(),
      super_admin_user_id: a.string(), //super_admin that can delete this group
      //------------------
      members: a.hasMany('Member', 'groupId'), // Link to Member join table
      paycategories: a.hasMany("PayCategory", "groupId"), // Relationship to Inbox
      payitems: a.hasMany("PayItem", "groupId"), // Relationship to Inbox
    })
    .authorization(allow => [allow.authenticated()]),

  // ==== USER with GROUP FEATURES ONLY =======
  //this model is used for all features uniting the user with the group like - inbox, payments
  // Member Model
  Member: a
    .model({
      userId: a.id().required(),
      groupId: a.id().required(),
      firstname: a.string(),
      middlename: a.string(),
      lastname: a.string(),
      gender: a.string(),
      phone: a.string(),
      image_url: a.string(),
      regno: a.string(),
      role: a.string(),
      address: a.string(),
      status: a
        .string()
        .default("pending")
        .required(), // Possible values: "active", "pending", "suspended", "rejected"
      status_reason: a.string(), // Reason for the status
      //-----------------------------
      user: a.belongsTo("User", "userId"), // Relationship to User model
      group: a.belongsTo("Group", "groupId"), // Relationship to Group model
      //--------------------------------------------
      transactions: a.hasMany("Transaction", "memberId"), // Relationship to Inbox
      pledges: a.hasMany("Pledge", "memberId"), // Relationship to Transaction
      inboxes: a.hasMany("Inbox", "memberId"), // Relationship to Inbox
    })
    // .identifier(["userId", "groupId"]) // Composite key for userId and groupId
    // .secondaryIndexes((index) => [
    //   index("userId"), // Secondary index for querying by userId
    //   index("groupId"), // Secondary index for querying by groupId
    // ])
    .authorization(allow => [allow.authenticated()]),

  //---------------------------PAYMENTS-----------------------------------------------
  PayCategory: a
  .model({
    name: a.string(),
    description: a.string(),
    groupId: a.id(),
    //----------------------------
    group: a.belongsTo('Group', 'groupId'),
    //----------------------------
    payitems: a.hasMany("PayItem", "paycategoryId"), // Relationship to PayItem
  })
  .authorization(allow => [allow.authenticated()]),

  PayItem: a
  .model({
    payId: a.string(), //code identifier
    title: a.string(),
    description: a.string(),
    status: a.string(), //open,closed for payment
    paymentType:a.string(), //perMember, freeDonation
    groupId: a.id(),
    paycategoryId: a.id(),
    //---------------------------------
    totalPledged:a.integer(),
    totalPaid: a.integer(),
    //----------------------------------------
    group: a.belongsTo('Group', 'groupId'),
    paycategory: a.belongsTo('PayCategory', 'paycategoryId'),
    //-----------------------------------------------------
    transactions: a.hasMany("Transaction", "payitemId"), // Relationship to Transaction
    pledges: a.hasMany("Pledge", "payitemId"), // Relationship to Transaction
  })
  .authorization(allow => [allow.authenticated()]),

  Transaction: a
  .model({
    amount: a.string(),
    member_fullname:  a.string(),
    //---------
    memberId: a.id(),
    payitemId: a.id(),
    pledgeId: a.id(),
    //-------------
    // createdDate
    //-------------------
    member: a.belongsTo('Member', 'memberId'),
    payitem: a.belongsTo('PayItem', 'payitemId'),
    pledge: a.belongsTo('Pledge', 'pledgeId'),
  })
  .authorization(allow => [allow.authenticated()]),

  
  Pledge: a
  .model({
    amount: a.string(),
    member_fullname:  a.string(),
    //---------
    memberId: a.id(),
    payitemId: a.id(),
    //---------------
    // createdDate
    //----------------------------------
    member: a.belongsTo('Member', 'memberId'),
    payitem: a.belongsTo('PayItem', 'payitemId'),
    //-----------------    
    transactions: a.hasMany("Transaction", "pledgeId"), // Relationship to Transaction
  })
  .authorization(allow => [allow.authenticated()]),

  //----------------------------------------------------------------------------------

  Inbox: a
    .model({
      memberId: a.id(),
      member: a.belongsTo('Member', 'memberId'),
      from: a.string(),
      message: a.string(),
      status: a.string()
    })
    .authorization(allow => [allow.authenticated()]),
});


export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});




// modelling ----------------------------------------------------------------------------------------------

// one-to-one relationship
/*
const schema = a.schema({

  Customer: a.model({
    name: a.string(),
    // 3. Create relationship field with the reference field
    //    from the Cart model
    activeCart: a.hasOne('Cart', 'customerId')
  }),
  Cart: a.model({
    items: a.string().required().array(),
    // 1. Create reference field
    customerId: a.id(),
    // 2. Create relationship field with the reference field
    customer: a.belongsTo('Customer', 'customerId'),
  }),
});
*/


// one-to-many relationship
/*

  Team: a.model({
    mantra: a.string().required(),
    // 3. Create a hasMany relationship with the reference field
    //    from the `Member`s model.
    members: a.hasMany('Member', 'teamId'),
  })
    .authorization(allow => [allow.publicApiKey()]),

  Member: a.model({
    name: a.string().required(),
    // 1. Create a reference field
    teamId: a.id(),
    // 2. Create a belongsTo relationship with the reference field
    team: a.belongsTo('Team', 'teamId'),
  })
    .authorization(allow => [allow.publicApiKey()]),



// many-to-many relationship
 Group: a
    .model({
      long_name: a.string(),
      short_name: a.string(),
      location: a.string(),
      category: a.string(),
      logo: a.string(),
      users: a.hasMany('Member', 'group') // Link to Member join table
    })
    .authorization(allow => [allow.authenticated()]),

  // Define the User model
  User: a
    .model({
      name: a.string(),
      email: a.string(),
      groups: a.hasMany('Member', 'user') // Link to Member join table
    })
    .authorization((allow) => [allow.owner()]),

  // Define the Member join model
  Member: a
    .model({
      userId: a.id(),
      user: a.belongsTo('User', 'userId'), // Reference to the User model
      groupId: a.id(),
      group: a.belongsTo('Group', "groupId"), // Reference to the Group model
    })
    .authorization((allow) => [allow.owner()]),












/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>

import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({

  // Define the User model
  User: a
    .model({
      firstname: a.string().required(),
      middlename: a.string(),
      lastname: a.string().required(),
      role: a.string().required(),
      image: a.string(),
      phone: a.string(),
      fullname: a.string(),
      groups: a.hasMany('UserGroup', 'userId'), // Link to UserGroup join table
    })
    .authorization((allow) => [allow.guest()]),


  // ==== GROUP FEATURES ONLY
  Group: a
    .model({
      long_name: a.string(),
      short_name: a.string(),
      location: a.string(),
      category: a.string(),
      logo: a.string(),
      users: a.hasMany('UserGroup', 'groupId'), // Link to UserGroup join table
    })
    .authorization((allow) => [allow.guest()]),

  // ==== USER with GROUP FEATURES ONLY =======
  //this model is used for all features uniting the user with the group like - inbox, payments
  UserGroup: a
    .model({
      userId: a.id(),
      groupId: a.id(),
      user_status: a.string().default('pending').required(),//"active", "pending", "suspended","rejected"
      status_reason: a.string(),//reason for the status [e.g when a user requests to join a group, the status will be pending]]
      user: a.belongsTo('User', 'userId'), // Reference to the User model
      group: a.belongsTo('Group', "groupId"), // Reference to the Group model
      inbox: a.hasMany('Inbox', 'userGroupId'), // Link to UserGroup join table
    })
    .authorization((allow) => [allow.guest()]),
  //--------------------------------------------------------------------------

  Inbox: a
    .model({
      userGroupId: a.id(),
      userGroup: a.belongsTo('UserGroup', 'userGroupId'),
      from: a.string(),
      message: a.string(),
      status: a.string()
    })
    .authorization((allow) => [allow.guest()]),

});



export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
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
      users: a.hasMany('UserGroup', 'group') // Link to UserGroup join table
    })
    .authorization((allow) => [allow.guest()]),

  // Define the User model
  User: a
    .model({
      name: a.string(),
      email: a.string(),
      groups: a.hasMany('UserGroup', 'user') // Link to UserGroup join table
    })
    .authorization((allow) => [allow.owner()]),

  // Define the UserGroup join model
  UserGroup: a
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

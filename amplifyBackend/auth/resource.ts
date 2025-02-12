// amplify/backend.ts
import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  userAttributes: {
    "custom:display_name": {
      dataType: "String",
      mutable: true,
      maxLen: 10,
      minLen: 3,
    },
  },
  loginWith: {
    email: true
  }
});

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyA_5N3KB-rCbz51BXHi5D9cfs_McKIhVtU",
    authDomain: "grouptly-69eec.firebaseapp.com",  // Likely grouptly-69eec.firebaseapp.com
    projectId: "grouptly-69eec",     // same as Project ID 
    storageBucket: "grouptly-69eec.firebasestorage.app", // Likely grouptly-69eec.appspot.com
    messagingSenderId: "1085120584895", // same as Sender ID 
    appId: "1:1085120584895:android:f5806e13002696b728fa0a", // same as App ID 
  };
  

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const fetchFcmToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BGnND3q25y1Bc3rh1n2kwSjFbkKJbxdRtPIawJci1YA4EQZMFqJXXwVMVH90irmqMBSVk6xW7FnfSZJ0K6Ssbuk", //same as web push certificates
    });
    console.log("FCM Token:", token);
    return token;
  } catch (error) {
    console.error("Error fetching FCM token:", error);
    return null;
  }
};
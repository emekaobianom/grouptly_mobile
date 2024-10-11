import { Storage } from '@ionic/storage';

let storage: Storage | null = null;

/**
 * Initializes the storage instance if it hasn't been initialized yet.
 * @returns {Promise<Storage>} The storage instance.
 */
const initStorage = async () => {
  if (!storage) {
    storage = new Storage();
    await storage.create();
  }
  return storage;
};

/**
 * Sets an item in the storage.
 * 
 * @param {string} key - The key under which the value will be stored.
 * @param {any} value - The value to store. Can be any data type.
 * @returns {Promise<void>} A promise that resolves when the item has been set.
 * 
 * @example
 * ```ts
 * await setItem('username', 'JohnDoe');
 * ```
 */
export const setItem = async (key: string, value: any) => {
  const storageInstance = await initStorage();
  await storageInstance.set(key, value);
  console.log(`Set ${key}: ${value}`);
};

/**
 * Retrieves an item from the storage.
 * 
 * @param {string} key - The key of the item to retrieve.
 * @returns {Promise<any>} A promise that resolves with the retrieved value.
 * 
 * @example
 * ```ts
 * const username = await getItem('username');
 * console.log(username);
 * ```
 */
export const getItem = async (key: string) => {
  const storageInstance = await initStorage();
  const value = await storageInstance.get(key);
  console.log(`Get ${key}: ${value}`);
  return value;
};

/**
 * Removes an item from the storage.
 * 
 * @param {string} key - The key of the item to remove.
 * @returns {Promise<void>} A promise that resolves when the item has been removed.
 * 
 * @example
 * ```ts
 * await removeItem('username');
 * ```
 */
export const removeItem = async (key: string) => {
  const storageInstance = await initStorage();
  await storageInstance.remove(key);
  console.log(`Removed ${key}`);
};

/**
 * Clears all items from the storage.
 * 
 * @returns {Promise<void>} A promise that resolves when all data has been cleared.
 * 
 * @example
 * ```ts
 * await clearStorage();
 * ```
 */
export const clearStorage = async () => {
  const storageInstance = await initStorage();
  await storageInstance.clear();
  console.log('All data cleared');
};




// ### Steps to Install and Setup Ionic Storage in a React Project

// 1. **Install the Correct Packages**
   
//    You need to install `@ionic/storage` and `@capacitor/storage` (optional for Capacitor integration).

//    Run this command:

//    ```bash
//    npm install @ionic/storage @ionic/storage-angular
//    ```

//    *Note: Even though it says "angular," the package is fully usable in React as well.*

// 2. **Set Up Ionic Storage in Your React Project**

//    Here’s how to refactor your utility file using `@ionic/storage` without the need for the `@ionic/storage-react` package.

// ### 1. **Update the `storage.ts` Utility File**

// Modify the storage utility file to work with the `@ionic/storage` package directly:

// ```ts
// // src/utils/storage.ts
// import { Storage } from '@ionic/storage';

// let storage: Storage | null = null;

// const initStorage = async () => {
//   if (!storage) {
//     storage = new Storage();
//     await storage.create();
//   }
//   return storage;
// };

// // Set Item in Storage
// export const setItem = async (key: string, value: any) => {
//   const storageInstance = await initStorage();
//   await storageInstance.set(key, value);
//   console.log(`Set ${key}: ${value}`);
// };

// // Get Item from Storage
// export const getItem = async (key: string) => {
//   const storageInstance = await initStorage();
//   const value = await storageInstance.get(key);
//   console.log(`Get ${key}: ${value}`);
//   return value;
// };

// // Remove Item from Storage
// export const removeItem = async (key: string) => {
//   const storageInstance = await initStorage();
//   await storageInstance.remove(key);
//   console.log(`Removed ${key}`);
// };

// // Clear all Storage
// export const clearStorage = async () => {
//   const storageInstance = await initStorage();
//   await storageInstance.clear();
//   console.log('All data cleared');
// };
// ```

// ### 2. **Use the Updated `storage.ts` in Components**

// Now your component will use the same storage utility functions as before.

// ```tsx
// // src/components/MyComponent.tsx
// import React, { useEffect, useState } from 'react';
// import { getItem, setItem, removeItem } from '../utils/storage';

// const MyComponent: React.FC = () => {
//   const [username, setUsername] = useState<string | null>(null);

//   // Save data to storage
//   const saveUsername = async () => {
//     await setItem('username', 'JohnDoe');
//     console.log('Username saved');
//   };

//   // Retrieve data from storage
//   useEffect(() => {
//     const loadUsername = async () => {
//       const storedUsername = await getItem('username');
//       setUsername(storedUsername);
//     };
//     loadUsername();
//   }, []);

//   // Delete data from storage
//   const deleteUsername = async () => {
//     await removeItem('username');
//     setUsername(null);
//     console.log('Username deleted');
//   };

//   return (
//     <div>
//       <h1>Stored Username: {username}</h1>
//       <button onClick={saveUsername}>Save Username</button>
//       <button onClick={deleteUsername}>Delete Username</button>
//     </div>
//   );
// };

// export default MyComponent;
// ```

// ### Why This Works:

// - **`@ionic/storage`**: Provides the functionality for managing data storage. You initialize it once and reuse it throughout your app.
// - **No Need for React-Specific Package**: Ionic Storage works with any JavaScript framework, including React.

// Now you should be able to store, retrieve, and delete data without encountering the `E404` error!
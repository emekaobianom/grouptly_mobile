// src/utils/createPersistentAtom.ts
import { atomWithStorage } from "jotai/utils";

export const createPersistentAtom = <T>(key: string, initialValue: T) => {
  return atomWithStorage<T>(key, initialValue);
};

// storage.ts

type StorageValue = any; // You can replace `any` with a more specific type if needed

export const storage = {
  get: (key: string): StorageValue | null => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },

  set: (key: string, value: StorageValue): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove: (key: string): void => {
    localStorage.removeItem(key);
  },
};

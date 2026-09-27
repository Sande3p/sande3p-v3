// useLocalStorage.js - migrated from angular-storage usage ($lcl / store)
import { useCallback } from 'react';
import { isLocalStorageSupported } from '../utils/util';

const supported = isLocalStorageSupported();

export function useLocalStorage() {
  const get = useCallback((key) => {
    if (!supported) return undefined;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : undefined;
    } catch {
      return undefined;
    }
  }, []);

  const set = useCallback((key, value) => {
    if (!supported) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota / serialization errors
    }
  }, []);

  return { get, set, supported };
}

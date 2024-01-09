import { useState } from "react";
const useLocalStorage = <T>(key: string, defaultValue: T) => {
    const isLocalStorageAvailable = typeof localStorage !== "undefined";
    const [value, setValue] = useState<T>(() => {
        if (isLocalStorageAvailable) {
            try {
                const jsonValue = localStorage.getItem(key);
                if (jsonValue) {
                    return JSON.parse(jsonValue);
                }
            } catch (error) {
                console.error("Error parsing localStorage:", error);
            }
        }
        return defaultValue;
    });
    const setLocalStorageValue = (newValue: T) => {
        setValue(newValue);
        if (isLocalStorageAvailable) {
            try {
                localStorage.setItem(key, JSON.stringify(newValue));
            } catch (error) {
                console.error("Error storing in localStorage:", error);
            }
        }
    };
    return [value, setLocalStorageValue] as const;
};
export const getLocalStorageValue = <T>(key: string, defaultValue: T): T => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
        try {
            return JSON.parse(storedValue);
        } catch (error) {
            console.error("Error parsing localStorage:", error);
        }
    }
    return defaultValue;
};
export const setLocalStorageValue = <T>(key: string, value: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error storing in localStorage:", error);
    }
};
export default useLocalStorage;
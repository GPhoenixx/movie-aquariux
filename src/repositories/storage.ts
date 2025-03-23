import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToStorage = async (key: string, value: any) => {
    try {
        const json = JSON.stringify(value);
        await AsyncStorage.setItem(key, json);
    } catch (e) {
        console.error('AsyncStorage Save Error:', e);
    }
};

export const removeFromStorage = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error('AsyncStorage Remove Error:', e);
    }
};

export const getFromStorage = async <T>(key: string): Promise<T | null> => {
    try {
        const json = await AsyncStorage.getItem(key);
        return json != null ? JSON.parse(json) : null;
    } catch (e) {
        console.error('AsyncStorage Read Error:', e);
        return null;
    }
};

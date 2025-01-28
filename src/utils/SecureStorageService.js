import * as SecureStore from "expo-secure-store";

export async function saveSecureData(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log(`${key} saved successfully`);
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
}

export async function getSecureData(key) {
  try {
    const value = await SecureStore.getItemAsync(key);
    if (value) {
      console.log("Found Token" + value);
      return value;
    } else {
      console.log(`${key} not found`);
      return null;
    }
  } catch (error) {
    console.error(`Error retrieving ${key}:`, error);
    return null;
  }
}

export async function deleteSecureData(key) {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log(`${key} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting ${key}:`, error);
  }
}

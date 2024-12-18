import * as Keychain from "react-native-keychain";

/**
 * Save user credentials securely using Keychain.
 * @param {string} token - The JWT token.
 */
export async function saveCredentials(token) {
  try {
    await Keychain.setGenericPassword("user", token);
    console.log("Credentials stored securely");
  } catch (error) {
    console.error("Error storing credentials:", error);
  }
}

/**
 * Retrieve user credentials securely from Keychain.
 * @returns {Promise<{token: string} | null>} - The user's ID and token, or null if no credentials are found.
 */
export async function getCredentials() {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log("Credentials retrieved securely");
      return {
        token: credentials.password,
      };
    } else {
      console.log("No credentials stored");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving credentials:", error);
    return null;
  }
}

/**
 * Delete user credentials securely from Keychain.
 */
export async function deleteCredentials() {
  try {
    await Keychain.resetGenericPassword();
    console.log("Credentials deleted securely");
  } catch (error) {
    console.error("Error deleting credentials:", error);
  }
}

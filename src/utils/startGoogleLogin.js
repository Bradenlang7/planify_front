import * as WebBrowser from "expo-web-browser";
import { saveSecureData } from "../utils/SecureStorageService";
import { navigate } from "../../navigationRef";

const BACKEND_OAUTH_URL =
  "https://4285-70-176-250-188.ngrok-free.app/oauth2/authorization/google";

const startGoogleLogin = async () => {
  try {
    console.log("Running Google AUTH");

    // const redirectUri = Linking.createURL("auth/callback");
    // console.log("Generated redirect URI:", redirectUri);

    const authUrl = BACKEND_OAUTH_URL;

    console.log("Auth URL:", authUrl);

    const result = await WebBrowser.openAuthSessionAsync(authUrl);

    if (result.type === "success" && result.url) {
      console.log("Login success, redirect URL:", result.url);

      console.log("Result URL" + result.url);

      const params = new URL(result.url).searchParams;
      const token = params.get("token");
      const userName = params.get("userName");

      if (token && userName) {
        await saveSecureData("token", token);
        await saveSecureData("userName", userName);
        navigate("MainApp");
      } else {
        console.error("Token or userName missing in the redirect URL");
      }
    } else {
      console.log("Login canceled or failed:", result.type);
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
};

export { startGoogleLogin };

import { useEffect } from "react";
import { navigate } from "../../navigationRef";
import planifyApi from "../api/planify";
import { getSecureData } from "../utils/SecureStorageService";
//Screen attempts to sign in and navigate to MainAppScreen using JWT
const ResolveAuthScreen = () => {
  const tryLocalSignIn = async () => {
    console.log("Trying to retrieve token...");
    const token = await getSecureData("token");

    // Check if token exists
    if (token) {
      console.log("Token found:", token);
      try {
        console.log("Sending token to backend for validation...");
        const response = await planifyApi.post("/api/auth/validate-token");
        if (response.status === 200) {
          navigate("MainApp");
        } else {
          navigate("SignIn");
        }
        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data);
      } catch (error) {
        console.error(
          "Error during token validation:",
          error.response?.data || error.message
        );
        navigate("SignIn");
      }
    } else {
      console.log("No token found.");
      navigate("SignIn");
    }

    console.log("Exiting tryLocalSignin.");
  };

  useEffect(() => {
    tryLocalSignIn();
  }, []);

  return null;
};

export default ResolveAuthScreen;

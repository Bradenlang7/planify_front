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
      try {
        console.log("Sending token to backend for validation...");
        const response = await planifyApi.post("/api/auth/validate-token");
        console.log(response.status);
        if (response.status === 200) {
          navigate("ResolveSessionScreen");
        } else {
          navigate("SignIn");
        }
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
  };

  useEffect(() => {
    tryLocalSignIn();
  }, []);

  return null;
};

export default ResolveAuthScreen;

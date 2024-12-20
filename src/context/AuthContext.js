import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import planifyApi from "../api/planify";
import { navigate } from "../../navigationRef";
import { saveSecureData, getSecureData } from "../../SecureStorageService";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await planifyApi.post("/api/auth/login", {
        username: email, // NEED TO FIX
        password,
      });
      await saveSecureData("token", response.data.token);
      navigate("MainApp");
    } catch (err) {
      console.log(err);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };

const signup =
  (dispatch) =>
  async ({ firstname, lastname, username, email, password }) => {
    try {
      console.log(
        "running sign up" + firstname + lastname + username + email + password
      );
      const response = await planifyApi.post("/api/users", {
        firstname,
        lastname,
        username,
        email,
        password,
      });
      await saveSecureData("token", response.data.token);
      navigate("MainApp");
    } catch (err) {
      console.log(err);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signup },
  { token: null, errorMessage: "" }
);

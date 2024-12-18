import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import planifyApi from "../api/planify";
import { navigate } from "../../navigationRef";
import { saveCredentials } from "../../authStorage";

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
      await saveCredentials(response.data.token);
      await AsyncStorage.setItem("id", response.id);

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
      const response = await planifyApi.post("/api/users", {
        firstname,
        lastname,
        username,
        email,
        password,
      });
      await saveCredentials(response.data.token);
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
  { signin },
  { token: null, errorMessage: "" }
);

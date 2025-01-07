import createDataContext from "./createDataContext";
import planifyApi from "../api/planify";
import { navigate } from "../../navigationRef";
import {
  saveSecureData,
  deleteSecureData,
} from "../utils/SecureStorageService";

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

//Dispatch not used for signout need to find better location
const signout = (dispatch) => async () => {
  try {
    await deleteSecureData("token");
    navigate("SignIn");
  } catch (err) {
    console.log(err);
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
  { signin, signup, signout },
  { token: null, errorMessage: "" }
);

import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import planifyApi from "../api/planify";
import { navigate } from "../../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "signin":
      return { ...state, token: action.payload };
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
        username: email,
        password,
      });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      console.log("*********Navigating");
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

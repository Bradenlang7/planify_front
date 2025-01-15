import createDataContext from "./createDataContext";
import { getSecureData } from "../utils/SecureStorageService";

//tracks the logged in user's username for use throughout the app
const userReducer = (state, action) => {
  switch (action.type) {
    case "add_userName":
      return { ...state, userName: action.payload };
    default:
      return state;
  }
};

const loadUserName = (dispatch) => async () => {
  try {
    const userName = await getSecureData("userName");
    if (userName) {
      dispatch({ type: "add_userName", payload: userName });
      console.log(userName);
    } else {
      console.warn("No userName found in secure storage");
    }
  } catch (error) {
    console.error("Failed to retrieve userName from secure storage:", error);
    // Default value provided to prevent crash elsewhere in app
    dispatch({ type: "add_userName", payload: "default" });
  }
};

const updateUserNameContext = (dispatch) => (userName) => {
  dispatch({ type: "add_userName", payload: userName });
  console.log(userName);
};

export const { Provider, Context } = createDataContext(
  userReducer,
  { updateUserNameContext, loadUserName },
  { userName: "" }
);

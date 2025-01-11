import createDataContext from "./createDataContext";

//tracks the logged in user's username for use throughout the app
const userReducer = (state, action) => {
  switch (action.type) {
    case "add_userName":
      return { ...state, userName: action.payload };
    default:
      return state;
  }
};

const updateUserNameContext = (dispatch) => async (userName) => {
  dispatch({ type: "add_userName", payload: userName });
  console.log(userName);
};

export const { Provider, Context } = createDataContext(
  userReducer,
  { updateUserNameContext },
  { userName: "" }
);

import createDataContext from "./createDataContext";
import planifyApi from "../api/planify";

//tracks the logged in user's username for use throughout the app
const userReducer = (state, action) => {
  switch (action.type) {
    case "Set_Approved_Friendships":
      return { ...state, approvedFriendships: action.payload };
    default:
      return state;
  }
};

const fetchApprovedFriendships = (dispatch) => async () => {
  try {
    const approvedFriendships = await planifyApi.get(
      `/api/friendships/status/${"APPROVED"}`
    );

    dispatch({
      type: "Set_Approved_Friendships",
      payload: approvedFriendships,
    });
  } catch (err) {
    console.error("Error fetching friendships:", err);
  }
};

export const { Provider, Context } = createDataContext(
  userReducer,
  { updateUserNameContext },
  { userName: "" }
);

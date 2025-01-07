import createDataContext from "./createDataContext";
import planifyApi from "../api/planify";

const planReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const createPlan =
  (dispatch) =>
  async ({ title, description, location, startTime, endTime }) => {
    try {
      await planifyApi.post("/api/plans", {
        title,
        description,
        location,
        startTime,
        endTime,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "add_error",
        payload: "Something went wrong during plan creation",
      });
    }
  };

export const { Provider, Context } = createDataContext(
  planReducer,
  { createPlan },
  { errorMessage: "" }
);

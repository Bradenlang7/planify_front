import plannrApi from "../plannr";

//Fetches a planDTO from the server based on a plan id
const fetchPlanDetails = async (planId) => {
  console.log("RuNNING FETCH PLAN DETAILS with ", planId);
  try {
    console.log(planId);
    const response = await plannrApi.get(`/api/plans/${planId}/details`);

    return response;
  } catch (err) {
    console.error("Error fetching plan:", err);
  }
};

export default fetchPlanDetails;

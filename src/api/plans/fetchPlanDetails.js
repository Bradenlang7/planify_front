import planifyApi from "../planify";

//Fetches a planDTO from the server based on a plan id
const fetchPlanDetails = async (planId) => {
  try {
    const response = await planifyApi.get(`/api/plans/${planId}/details`);

    return response;
  } catch (err) {
    console.error("Error fetching plan:", err);
  }
};

export default fetchPlanDetails;

import plannrApi from "../plannr";

const deletePlan = async (planId) => {
  try {
    console.log("Running delete plan");
    await plannrApi.delete(`/api/plans/${planId}`);
  } catch (err) {
    console.error("Error deleting plan:", err);
  }
};

export default deletePlan;

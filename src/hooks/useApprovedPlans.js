import { useQuery } from "@tanstack/react-query";
import planifyApi from "../api/planify";

const fetchApprovedPlans = async () => {
  console.log("FETCHINNG APPROVED PLANS");
  const status = "APPROVED";
  const includeOwner = true;
  try {
    const response = await planifyApi.get(
      `/api/approvals/users/status/${status}`,
      {
        params: {
          includeOwner,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("Error fetching ApprovedPlans" + err);
  }
};

export const useApprovedPlans = () => {
  return useQuery({
    queryKey: ["approvedPlans"],
    queryFn: fetchApprovedPlans,
    staleTime: 0,
    enabled: true,
  });
};

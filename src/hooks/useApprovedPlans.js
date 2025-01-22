import { useQuery } from "@tanstack/react-query";
import planifyApi from "../api/planify";

const fetchApprovedPlans = async () => {
  console.log("FETCHINNG APPROVED PLANS");
  const status = "APPROVED";
  const includeOwner = true;
  const response = await planifyApi.get(
    `/api/approvals/users/status/${status}`,
    {
      params: {
        includeOwner,
      },
    }
  );
  return response.data;
};

export const useApprovedPlans = () => {
  return useQuery({
    queryKey: ["approvedPlans"],
    queryFn: fetchApprovedPlans,
    staleTime: 0,
    enabled: true,
  });
};

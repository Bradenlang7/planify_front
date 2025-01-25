import { useQuery } from "@tanstack/react-query";
import planifyApi from "../api/planify";

const fetchOwnedPlans = async () => {
  console.log("FETCHINNG APPROVED PLANS");
  const status = "OWNER";
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
    console.log("Error fetching Owned Plans" + err);
  }
};

export const useOwnedPlans = () => {
  return useQuery({
    queryKey: ["ownedPlans"],
    queryFn: fetchOwnedPlans,
    staleTime: 0,
    enabled: true,
  });
};

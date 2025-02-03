import { useQuery } from "@tanstack/react-query";
import plannrApi from "../api/plannr";

const fetchOwnedPlans = async () => {
  console.log("FETCHINNG APPROVED PLANS");
  const status = "OWNER";
  const includeOwner = true;
  try {
    const response = await plannrApi.get(
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

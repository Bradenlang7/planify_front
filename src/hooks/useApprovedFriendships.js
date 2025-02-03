import plannrApi from "../api/plannr";
import { useQuery } from "@tanstack/react-query";

const fetchApprovedFriendships = async () => {
  try {
    console.log("Fetching APPROVED FRIENDSHIPS");
    const response = await plannrApi.get(
      `/api/friendships/status/${"APPROVED"}`
    );
    return response.data; // Ensure this returns valid data
  } catch (error) {
    console.error("Error during API call:", error.message);
    throw error; // Pass the error to React Query's error handling
  }
};

export const useApprovedFriendships = () => {
  return useQuery({
    queryKey: ["approvedFriendships"],
    queryFn: fetchApprovedFriendships,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
};

import { useQuery } from "react-query";
import { RestaurantSeachResponse } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (city?: string) => {
  const createSearchRequest = async (): Promise<RestaurantSeachResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurants/search/${city}`
    );
    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants"],
    createSearchRequest,
    { enabled: !!city }
  );

  return { results, isLoading };
};

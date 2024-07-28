import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { Restaurant } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
      body: restaurantFormData,
    });
    if (!response.ok) {
      throw new Error(`Error creating restaurant: ${response.statusText}`);
    }
    return response.json();
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurants created successfully");
  }

  if (error) {
    toast.error("Unable to create restaurant");
  }

  return { createRestaurant, isLoading };
};

export default useCreateMyRestaurant;

import { useParams } from "react-router-dom";
import { useSearchRestaurants } from "../api/RestaurantApi";

const SearchPage = () => {
  const { city } = useParams();

  const { results } = useSearchRestaurants(city);

  return (
    <div>
      User searched for {city}
      <span>
        {results?.data.map((restaurant, i) => (
          <p>
            {i + 1} - {restaurant.restaurantName}, {restaurant.city}
          </p>
        ))}
      </span>
    </div>
  );
};

export default SearchPage;

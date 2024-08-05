import { useParams } from "react-router-dom";
import { useSearchRestaurants } from "../api/RestaurantApi";
import SearchResultInfo from "../components/SearchResultInfo";
import SearchResultCard from "../components/SearchResultCard";
import { useState } from "react";
import SearchBar, { SearchForm } from "../components/SearchBar";
import PaginatorSelector from "../components/PaginatorSelector";
import CuisineFilter from "../components/CuisineFilter";
import SortOptionDropdown from "../components/SortOptionDropdown";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({ ...prevState, sortOption, page: 1 }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="" id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      <div className="flex flex-col gap-5" id="main-content">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeholder="Search by Cuisine or Restaurant"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo city={city} total={results.pagination.total} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
        <PaginatorSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;

import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });

    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormValues.searchQuery,
      page: 1,
    }));
  };

  const [searchState, setSearchState] = useState<SearchForm>({
    searchQuery: "",
  });

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeway today
        </h1>
        <span className="text-xl">
          Food is just a click away. Crave It, Get It, Love It!
        </span>
        <SearchBar
          onSubmit={handleSearchSubmit}
          placeholder="Search by City or Town"
          searchQuery={searchState.searchQuery}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} alt="apps" />
        <div className="flex flex-col items-center justify-center gap04 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span className="">
            Download the MernMunch App for faster ordering and personalised
            recommendations
          </span>
          <img src={appDownloadImage} alt="download apps" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

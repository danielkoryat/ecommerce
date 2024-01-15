import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";


const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();


  const handleSearch = async(event) => {
    event.preventDefault();
    if (searchValue) {
      navigate(`/search?query=${encodeURIComponent(searchValue)}`);
      setSearchValue("");
    }

   
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <div className="flex w-full md:max-w-md lg:max-w-lg">
          <Input
            type="text"
            placeholder="Search..."
            className="flex-auto"
            color="green"
            outline="true"
            autoComplete="off"
            label="Search"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <Button
            type="submit"
            size="sm"
            className="ml-2"
            color="green"
          >
            Search
          </Button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;

import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { setAlert } from "../../app/alertSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
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
          />
          <Button
            type="submit"
            size="sm"
            className="ml-2"
            color="green"
            loading={false}
          >
            Search
          </Button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
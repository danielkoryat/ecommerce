import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";

const SearchBar = () => {

  const handleSearch = (event) => {
    console.log("Searching for:", event.target.value);
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
            size="sm"
            outline
            
            autoComplete="off"
            label="Search"
            
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
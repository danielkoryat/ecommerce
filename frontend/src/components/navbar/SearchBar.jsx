import React, { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  //TODO fix the x button position

  const handleSearch = (event) => {
    //TODO Implement your search logic here
    console.log("Searching for:", searchTerm);
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </form>
    </>
  );
};

export default SearchBar;

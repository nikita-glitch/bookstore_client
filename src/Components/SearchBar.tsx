import { InputBase } from '@mui/material';
import * as React from 'react';
import SearchIcon from "@mui/icons-material/Search";


const SearchBar = () => {
  const [input, setInput] = React.useState<string>("");
  const handleSearchInput = (
    ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInput(ev.target.value);
  };

  return (  
    <div className="search">
        <SearchIcon id="searchIcon" />
        <InputBase
          id="searchInput"
          placeholder="Search"
          onChange={handleSearchInput}
          value={input}
        ></InputBase>
      </div>
  );
}
export default SearchBar;
import { Button } from "@mui/material";
import * as React from "react";
import "./NavBar.style.css";
import logo from "../Logos/Group 1.svg";
import SearchBar from "./SearchBar";
import ActionPanel from "./ActionPanel";

const NavBar = () => {

  const handleCatalogButtonClick = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {};

  return (
    <div className="Navbar">
      <img src={logo} className="companyLogo" alt="logo" />
      <Button id="catalogButton" onClick={handleCatalogButtonClick}>
        Catalog
      </Button>
      <SearchBar/>
      <ActionPanel/>
    </div>
  );
};

export default NavBar;

import React, { useState } from "react";
import "../searchbar/searchbar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const Searchbar = () => {

    return (
        <div className="search">
         <div className="searchInputs">
            <input
                type="text"
                placeholder="Search a product"
            />
            <div className="searchIcon">
                <SearchIcon />
            </div>
        </div>
    </div>
    );
}

export default Searchbar;
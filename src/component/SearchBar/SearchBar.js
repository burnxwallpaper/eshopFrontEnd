import React from 'react';
import './SearchBar.css';


function SearchBar({ search, handleChange, value }) {





    return (
        <>
            <div id="searchBar">
                <form onSubmit={search} >


                    <input className="searchTerm" type="text" value={value} onChange={handleChange} placeholder="Search"></input>


                    <button className="searchButton" type='submit' value="Submit"  ><i className="fa fa-search"></i></button>
                </form>
            </div>


        </>
    )
}

export default SearchBar;
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import logo from "./foodlogo.png";
import Home from "../Home/Home";

function Navbar() {
  const [section, setSection] = useState("");
  const [secData, setSecData] = useState(null);
  const [secError, setSecError] = useState(null);

  const [input, setInput] = useState("");
  const [inputData, setInputData] = useState("");
  const [inputError, setInputError] = useState(null);
  console.log(inputError);
  const handleCategoryChange = (e) => {
    setSection(e.target.value);
    setInputData(null);
  };

  const handleInputData = () => {
    setInputData(null); // Reset inputData
    setInputError(null); // Reset inputError
    if (input.trim() !== "") {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.meals === null) {
            throw new Error(
              "No meals found. Please try a different search term."
            );
          }
          setInputData(data);
          setInputError(null);
          setSecData(null)
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setInputError("Error fetching data. Please try again.", error);
          setInputData(null);
          setSecData(null);
        });
    } else {
      setInputError("Please enter a valid search term.");
      console.log("Please enter a valid search term.");
    }
  };

  useEffect(() => {
    if (section.trim() !== "") {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${section}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setSecData(data);
          setInputData(null);
          setSecError(null);
          setInputError(null);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setSecError("Error fetching data. Please try again.",error);
          setSecData(null);
        });
    }
  }, [section]);

  return (
    <div>
      <nav>
        <div className="logo">
          <img src={logo} alt="" />
          <h1>Food Recipe</h1>
        </div>
        <div className="search">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search Your Recipe"
          />
          <button onClick={handleInputData}>
            <SearchIcon className="icon" />
          </button>
        </div>

        <div className="items">
          <label htmlFor="category">Category :</label>
          <select
            name="category"
            id="category"
            value={section}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            <option value="Goat">Goat</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Starter">Starter</option>
            <option value="Side">Side</option>
            <option value="Seafood">Seafood</option>
            <option value="Pork">Pork</option>
            <option value="Pasta">Pasta</option>
            <option value="Miscellaneous">Miscellaneous</option>
            <option value="Lamb">Lamb</option>
            <option value="Dessert">Dessert</option>
            <option value="Chicken">Chicken</option>
            <option value="Beef">Beef</option>
          </select>
        </div>
      </nav>
      {secError && <p>{secError}</p>}
      {secData && <Home secData={secData} />}
      {inputError && <Home inputError={inputError} />}
      {inputData && <Home secData={inputData} />}
    </div>
  );
}

export default Navbar;

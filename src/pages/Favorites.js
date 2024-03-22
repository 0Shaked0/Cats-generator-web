import React, { useEffect, useState, useCallback } from "react";
import { catOptions } from "../options";
import { apiKey } from "../env";
import "../App.css"; // Import CSS file

export default function Favorites() {
  const [favorites, setFavorites] = useState(null);
  const [catData, setCatData] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/favourites?sub_id=my-user-1`,
        catOptions
      );
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error("error during fetching favorites", error);
    }
  };

  const populateArray = useCallback(async () => {
    try {
      const promises = favorites?.map(async (favorite) => {
        const response = await fetch(
          `https://api.thecatapi.com/v1/images/${favorite.image_id}`,
          catOptions
        );
        const data = await response.json();
        return data;
      });
      if (promises) {
        const resolvedData = await Promise.all(promises);
        setCatData(resolvedData);
      }
    } catch (error) {
      console.error("error during populating array", error);
    }
  }, [favorites]);

  useEffect(() => {
    fetchData();
    populateArray();
  }, [populateArray]);

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
    setFilterType(event.target.value);
  };

  const handleDeleteAllFavorites = async () => {
    try {
      await Promise.all(
        favorites.map(async (favorite) => {
          await fetch(
            `https://api.thecatapi.com/v1/favourites/${favorite.id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
              },
            }
          );
        })
      );
      fetchData();
      populateArray();
    } catch (error) {
      console.error("Error deleting all favorites", error);
    }
  };

  return (
    <div>
      <h1 className="title-page">Favorites</h1>
      <button className="favorites-button" onClick={populateArray}>
        Load favorites
      </button>
      <button className="delete-all-button" onClick={handleDeleteAllFavorites}>
        Delete All Favorites
      </button>
      <select
        className="filter-dropdown"
        value={dropdownValue}
        onChange={handleDropdownChange}
      >
        <option value="">Show all Favorites</option>
        <option value="gif">GIFs</option>
        <option value="jpg">JPGs</option>
      </select>
      <div className="favorite-image-grid">
        {catData
          ?.filter((cat) => cat.url.endsWith(filterType))
          .map((cat, index) => (
            <div className="image-button-pair2" key={index}>
              <div>{cat.image_id}</div>
              <img className="grid-image2" src={cat.url} alt="Cat" />
            </div>
          ))}
      </div>
    </div>
  );
}
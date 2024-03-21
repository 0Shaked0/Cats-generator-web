import { useState, useEffect } from "react";
import { apiKey } from "../env";
import { catOptions } from "../options";

const Home = () => {
  const [catData, setCatData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?format=json&limit=10",
        catOptions
      );
      const data = await response.json();
      setCatData(data);
    } catch (error) {
      console.error("error during fetching");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnClick = (e) => {
    e.preventDefault();
    fetchData();
  };

  const onClickAdd = async (event, catId) => {
    event.preventDefault();

    const catAddFavoriteOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        image_id: catId,
        sub_id: "my-user-1",
      }),
    };

    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/favourites",
        catAddFavoriteOptions
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="title-page">Home</h1>
      <section className="main-container">
        <div className="image-grid">
          {catData?.slice(0, 4).map((cat) => (
            <div className="image-button-pair" key={cat.id}>
              <img className="grid-image" src={cat.url} alt="Cat" />
              <button
                className="grid-button"
                onClick={(event) => onClickAdd(event, cat.id)}
              >
                <span className="material-symbols-outlined">
                    <div className="fa-regular fa-heart"></div>
                </span>
              </button>
            </div>
          ))}
        </div>

        <div className="main-container-description">
          <h2 className="main-container-title">Cats Image Generator</h2>
          <div className="main-container-text">
            Click on the Randomize button to start geenrating images of
            cats, and you can add the images you like into the Favorites
            section by pressing the heart button!
          </div>
          <button className="main-container-button" onClick={handleOnClick}>
            Randomize
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;

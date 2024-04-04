import React from "react";
import "./Home.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
function Home({ secData, inputData, inputError }) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    if (secData) {
      setData(secData);
    } else if (inputData) {
      setData(inputData);
    }
  }, [secData, inputData]);

  if (inputError) {
    return (
      <div className="error">
        <h3 className="err">{inputError}</h3>
      </div>
    );
  }

  if (!data) {
    return null; // Hide the component if data is not available
  }

  return (
    <div className="Home">
      {data.meals.map((item) => (
        <div key={item.idMeal}>
          <div className="card-items">
            <div className="card-img">
              <img src={item.strMealThumb} alt="" />
            </div>
            <div className="card-textContent">
              <div className="card-title">
                <h3>{item.strMeal}</h3>
                <p>{item.strArea}</p>
              </div>
              <div className="card-links">
                <a href={item.strYoutube}>
                  Making Video
                  <YouTubeIcon className="icon " />
                </a>
                <a href={item.strSource}>
                  GET RECIPE <ArrowOutwardIcon className="icon-go" />
                </a>
              </div>
              <div className="like-save">
                <span>Save<BookmarkBorderOutlinedIcon className="icon-save save " /> </span>
                <span>Like<FavoriteBorderOutlinedIcon className="icon-save like" /></span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;

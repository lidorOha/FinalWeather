import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Weather from "./components/Weather";
import Favorites from "./components/Favorites";
import Header from "./components/Header";


function App() {
  const [isCityInFavorites , setIsCityInFavorites] = useState(false)
  const [favoriteTitle , setFavoriteTitle] = useState("Add to favorites")
  const [yourFavorites, setyourFavorites] = useState("Your favorites is empty");
  const [height, setheight] = useState(window.innerHeight);
  const [width, setwidth] = useState(window.innerWidth);
  const APIKEY = "3GHIACINrEcf9sMpf8N0qSIq8zLdtV9Z";
  const [cityYouChoose, setCityYouChoose] = useState([
    { LocalizedName: "Tel Aviv", Key: "215854" },
  ]);
  const [clickOnFavorite, setClickOnFavorite] = useState(false);

  useEffect(() => {
    function handleResize() {
      setheight(window.innerHeight);
      setwidth(window.innerWidth);}
    window.addEventListener("resize", handleResize);
  }, []);

  const removeFromFavorite = (index)=>{
    let tempFavorite = yourFavorites.filter((element, i)=> i!=index)
    if(tempFavorite.length == 0){
      setyourFavorites("Your favorites is empty")

    }
    else{setyourFavorites([...tempFavorite]) }
    setFavoriteTitle("Add to favorites")
    setIsCityInFavorites(false)
  
  }

  const addToFavorites = (city, temperature) => {
    if (yourFavorites === "Your favorites is empty") {
      setyourFavorites([
        {
          City: city[0].LocalizedName,
          Temperature: temperature[0].Temperature.Metric.Value,
          Unit: "°" + temperature[0].Temperature.Metric.Unit.toLowerCase(),
          Cloudmode: temperature[0].WeatherText,
          Key: city[0].Key,
        },
      ]);
      setFavoriteTitle("Remove from favorites")
      setIsCityInFavorites(true)
    } 
    else {
      for (let i = 0; i < yourFavorites.length; i++) {
        if (yourFavorites[i].City === city[0].LocalizedName) {
          removeFromFavorite(i)
          return false;
        }
      }
      setyourFavorites([
        ...yourFavorites,
        {
          City: city[0].LocalizedName,
          Temperature: temperature[0].Temperature.Metric.Value,
          Unit: "°" + temperature[0].Temperature.Metric.Unit.toLowerCase(),
          Cloudmode: temperature[0].WeatherText,
          Key: city[0].Key,
        },
      ]);
      setFavoriteTitle("Remove from favorites")
      setIsCityInFavorites(true)
    }
  };

  const setMyFavorite = (mychoose) => {
       setCityYouChoose([
       {
        LocalizedName: mychoose.City,
        Key: mychoose.Key,
       },
       ]);
    setClickOnFavorite(true);
  };

  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      <Router>
        <Header
          clickOnFavorite={clickOnFavorite}
          setClickOnFavorite={setClickOnFavorite}
        />
        <Routes>
          <Route
            path="/FinalWeather" 

            element={
              <Weather
              setIsCityInFavorites={setIsCityInFavorites}
                isCityInFavorites={isCityInFavorites}
                setFavoriteTitle={setFavoriteTitle}
                favoriteTitle={favoriteTitle}
                yourFavorites={yourFavorites}
                cityYouChoose={cityYouChoose}
                setCityYouChoose={setCityYouChoose}
                addToFavorites={addToFavorites}
                APIKEY={APIKEY}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                setMyFavorite={setMyFavorite}
                yourFavorites={yourFavorites}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

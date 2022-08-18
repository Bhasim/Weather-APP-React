import React, { useState, useEffect } from "react";
//import Weather from './components/weather';

import "./App.css";

function App() {
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("hamburg");
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    ifClicked();
  }, []);

  function ifClicked() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=d69a692c94a60061e2b515cfdc4daa0c&units=metric`
    ) // https://home.openweathermap.org/api_keys (id) for the free weather api
      .then((res) => {
        if (res.ok) {
          console.log(res.status);
          return res.json();
        } else {
          if (res.status === 404) {
            return alert("Oops, there seems to be an error!(wrong location)");
          }
          alert("Oops, there seems to be an error!");
          throw new Error("You have an error");
        }
      })
      .then((object) => {
        setWeather(object);
        console.log(weather);
      })
      .catch((error) => console.log(error));
    fetch(
      `https://api.unsplash.com/search/photos?query=${locations}&client_id=dBRW-3qplnsJCFR6GrbtIwUlXdXYe32vuL3LL0mudzc`
    ) // https://unsplash.com/oauth/applications/356475 Unsplash Developers  Access Key (id) for photos
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("You made a mistake");
        }
      })
      .then((data) => {
        console.log(data);
        setPhotos(data?.results[0]?.urls?.raw);
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="app">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location_input"
          />
          <button className="location_searcher" onClick={ifClicked}>
            Search Location
          </button>
        </div>
        <div className="app__data">
          <p className="temp">
            Current Temperature: {`${Math.floor(weather?.main?.temp )} °C`}  
          </p>
  
          {/* {` | ${weather?.weather[0].description}`}  */}
          
          {/* <p className="temp">Feels like: {`${Math.floor(weather?.main?.feels_like )} °C`}</p>  */}
          <p className="temp">Humidity: {weather?.main?.humidity} %</p>
          <p className="temp">
            Sunrise:{" "}
            {new Date(weather?.sys?.sunrise * 1000).toLocaleTimeString("en-IN")}
          </p>
          <p className="temp">
            Sunset:{" "}
            {new Date(weather?.sys?.sunset * 1000).toLocaleTimeString("en-IN")}
          </p>
        </div>
        <img className="app_image" src={photos} alt="" />
      </div>
    </div>
  );
}

export default App;

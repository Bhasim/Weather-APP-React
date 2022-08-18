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
      `http://api.weatherapi.com/v1/forecast.json?key=0984da71e52645f3b8280356221808&q=${locations}&days=5&aqi=no&alerts=no`
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
          <div>
            <img src={weather?.current?.condition?.icon} alt="wthr img" />
            <p className="temp">
              Condition: {weather?.current?.condition.text}{" "}
            </p>
          </div>
          <p className="temp">
            Current Temperature: {`${Math.floor(weather?.current?.temp_c)} °C`}
          </p>
          <p className="temp">Humidity: {weather?.current?.humidity} %</p>

          <p className="temp">
            Sunrise:{weather?.forecast?.forecastday[0].astro.sunrise}
          </p>
          <p className="temp">
            Sunset:{weather?.forecast?.forecastday[0].astro.sunset}
          </p>
        </div>
        <img className="app_image" src={photos} alt="" />
      </div>
    </div>
  );
}

export default App;

// my API key = 0984da71e52645f3b8280356221808

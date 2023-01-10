import React, { useState, useEffect } from "react";
//import Weather from './components/weather';

import "./App.css";

function App() {
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("");
  const [photos, setPhotos] = useState([]);
  const [success, setSuccess] = useState(false);

  const [unit, setUnit] = useState('metric');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [temp, setTemp] = useState(0);
  const [iconId, setIconId] = useState('');
  const [description, setDescription] = useState('');
  const [windStatus, setWindStatus] = useState('');
  const [airPressure, setAirPressure] = useState('');
  

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      ifClicked();
    }
  }


 

  function ifClicked() {
    fetch(
      // `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_KEY}&q=${locations}&days=5&aqi=no&alerts=no`
      `https://api.openweathermap.org/data/2.5/weather?q=${locations}&appid=69644e28c6a9c6d7c04f95ff1035a799&units=${unit}`
    ) // https://home.openweathermap.org/api_keys (id) for the free weather api

      .then((res) => {
        if (res.ok) {
          console.log(res.status);
          setSuccess(true);
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
        setTemp(Math.round(weather?.main?.temp));
        setIconId(weather?.weather[0]?.icon);
        setLat((weather?.coord.lat).toString());
        setLon((weather.coord.lon).toString());
        setDescription(weather?.weather[0]?.main);
        setWindStatus((weather?.wind.speed).toFixed(1));
        setAirPressure(weather?.main.pressure);
       
        console.log(weather);
      })
      .catch((error) => console.log(error));
    fetch(
      `https://api.unsplash.com/search/photos?query=${locations}&client_id=${process.env.REACT_APP_CLIEN_ID}`
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
            onKeyPress={handleKeyPress}
          />
          <button className="location_searcher" onClick={ifClicked} onKeyPress={handleKeyPress}>
            Search Location
          </button>

        </div>
        {success ? (
          <>
            <div className="app__data">
              <div>

                <img className="imagCondition" src={`http://openweathermap.org/img/wn/${iconId}@2x.png`} alt="Press Enter again"



                />
                <p className="temp">
                  Condition: {description}

                </p>
              </div>
              <p className="temp">
                Current Temperature:{" "}
                {`${Math.round(weather?.main?.temp)} °C`}
              </p>
              <p className="temp">Humidity: {weather?.main?.humidity} %</p>

              <p className="temp">
              Wind Status: {windStatus} m/s
              </p>
              <p className="temp">
                Air Pressure:  {airPressure} mb
              </p>
            </div>
            <img className="app_image" src={photos} alt="" />
          </>
        ) : (
          <div className="guide">Search for your City</div>
        )}{" "}
      </div>
    </div>
  );
}

export default App;


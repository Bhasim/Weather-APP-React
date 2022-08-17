import "./App.css";
import React, { useEffect, useState } from "react";
const REACT_APP_API_URL = 'https://api.openweathermap.org/data/2.5'
const REACT_APP_API_KEY = '89cd40acd4e49f8b943d53ce7dfce170'       
const REACT_APP_ICON_URL = 'https://openweathermap.org/img/w'

//import Weather from './components/weather';
export default function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      const response= await fetch(
        `${REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${REACT_APP_API_KEY}`
      )
      const data = await response.json()
      console.log(data);
// console.log(data);
      // .then(result => {
      //   setData(result)
      //   console.log(result);
      // });
    };
    fetchData();
  }, [lat, long]);

  return (
    <div className="App">
      {/* {(typeof data.main != 'undefined') ? (
        <Weather weatherData={data}/>
      ): (
        <div></div>
      )} */}
    </div>
  );
}

import { useEffect, useState } from "react";
import './search.css';
import Forecast from "../forecast/Forecast";
import Current from "../current/Current";

const API = "4507e771078f90cf447ae3b8f1bb7822";

export default function Search() {
  const [search, setSearch] = useState("");

  const [results, setResults] = useState(null);

  const [sending, setSending] = useState({ lat: 19.66,
                      lng: -71.84});

  const [weathers, setWeathers] = useState(null);

  const [forecast, setForecast] = useState(null);

  const url = "https://wft-geo-db.p.rapidapi.com/v1/geo";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0052c13387msh7b1123180ceb511p12e492jsn23841d6b054d",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  useEffect(() => {
    fetch(`${url}/cities?minPopulation=100&namePrefix=${search}`, options)
      .then((response) => response.json())
      .then((response) => setResults(response.data))
      .catch((err) => console.error(err));
  }, [search]);

  useEffect(() => {
    if (sending) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${sending.lat}&lon=${sending.lng}&appid=${API}&units=metric`,
      )
        .then((response) => response.json())
        .then((response) => {
          setWeathers(response);
          setResults(null);
          
        })
        .catch((err) => console.error(err));

    } else {
      setWeathers(null);
    }
  }, [sending]);

useEffect(() => {
    if (sending) {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${sending.lat}&lon=${sending.lng}&appid=2bd712a97c15cb8490bc0b381d5960a7&units=metric`,
      )
        .then((response) => response.json())
        .then((response) => {
          console.log("forescast",response); // Log the response to inspect its structure
          setForecast(response);
        })
        .catch((err) => console.error("Error fetching forecasts:", err));
    } else {
      setForecast(null);
    }
  }, [sending]);

  function searchT(e) {
    setSearch(e.target.value);
  }


  return (
    <div className="search">
      <div className="search-bar">
        <div className="input-op">
          <input type="text" placeholder="Search" onChange={searchT} />
          
        </div>
        <div className="searchOption">
          {Array.isArray(results) &&
            results.map((result) => (
              <div className="searchResult" key={result.id}>
                
                <button className="btn-opt"
                  onClick={() => {
                    setSending({
                      lat: result.latitude,
                      lng: result.longitude,
                    });
                    setResults(null);
                  }}
                >
                  {result.name}
                </button>
              </div>
            ))}
        </div>
      </div>
      {weathers === null ? null : <Current data={weathers} />}
      {forecast === null ? null : <Forecast data={forecast} />}
    </div>
  );
}

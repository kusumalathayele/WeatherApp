import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";

import { ReactComponent as Moonsvg } from "../../Assets/svgs/clear_night_FILL1_wght400_GRAD0_opsz24.svg";
import { ReactComponent as Cloudsvg } from "../../Assets/svgs/cloud_FILL1_wght400_GRAD0_opsz24.svg";

const Weather = ({ location }) => {
  const [weatherdata, setweatherdata] = useState(null);

  useEffect(() => {
    if (location.length) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=18ac8ac4c15169bd77b1c0efed1ba22c&`
        )
        .then((response) => {
          setweatherdata(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [location]);

  if (!weatherdata) return <div>Loading...</div>;

  const currentTimeUTC = new Date().getTime();
  const localTime = currentTimeUTC + weatherdata.timezone;
  const isDayTime =
    localTime > weatherdata.sys.sunrise && localTime < weatherdata.sys.sunset;
  const cloudSize = weatherdata.clouds.all;

  return (
    <div className="kusuma">
      {isDayTime ? <div className="sun"></div> : <Moonsvg className="moon" />}
      <div className="cloudlatha">
        {cloudSize > 50 && <Cloudsvg className="cloud" />}
      </div>
      <div className="temperature">{Math.round(weatherdata.main.temp)}°C </div>
      <div className="weather">{weatherdata.weather[0].main}</div>
      <div className="Low-High">{Math.round(weatherdata.main.temp_min)} /{" "}{Math.round(weatherdata.main.temp_max)} </div>
      <div className="feels-like"> Feels-like {Math.round(weatherdata.main.feels_like)}</div>
      <div className="location">{weatherdata.name}</div>
      <div className="humidity">Humidity: {weatherdata.main.humidity}</div>
    </div>
  );
};

export default Weather;


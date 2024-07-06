import React from "react";

const WeatherBox = ({weather}) => {
    console.log("weather?",weather);
  return (
    <div class="weather-box box">
        <div>{weather?.name}</div>  {/*삼항연산식을 통한 조건부 렌더링*/}
        <h2>{weather?.main.temp}°C/{weather?.main.temp*1.8+32}°F</h2>
        <h3>{weather?.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;
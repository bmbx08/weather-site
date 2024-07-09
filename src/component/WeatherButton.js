import React from "react";
import { Button } from 'react-bootstrap';


const WeatherButton = ({cities,setCity,getLocation}) => {
    console.log("cities?",cities)
  return (
    <div className="button-box box"> 
        <Button variant="warning" className="button-style" onClick={()=>getLocation()}>내 위치</Button>
        {cities.map((item)=>(
            <Button variant="warning" onClick={()=>setCity(item)} className="button-style">{item}</Button>
        ))}
        {/* <Button variant="warning">오사카</Button>
        <Button variant="warning">제주도</Button>
        <Button variant="warning">파리</Button>
        <Button variant="warning">뉴저지</Button> */}
      {/* <button class="btn btn-warning" onClick={() => getCurrentLocation()}>
        내 위치
      </button>
      <button class="btn btn-warning">오사카</button>
      <button class="btn btn-warning">제주도</button>
      <button class="btn btn-warning">파리</button>
      <button class="btn btn-warning">뉴저지</button> */}
    </div>
  );
};

export default WeatherButton;

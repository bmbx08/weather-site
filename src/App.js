import {useState,useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";

const API_KEY="6320e21052b10fe9eaa63c37ff048228";
let lang = "kr" //en for english

//1. 앱 실행되자마자 현재위치기반의 날씨 정보가 보인다
//2. 도씨, 섭씨, 화씨 날씨 정보가 보인다.
//3. 5개의 버튼이 있다. (1개는 현재위치, 4개는 다른 도시)
//4. 도시버튼을 클릭할 때마다 도시별 날씨가 나온다.
//5. 현재위치 버튼을 누르면 다시 현재위치 기반 날씨가 나온다.
//6. 데이터를 로딩하는 동안 로딩 스피너가 돈다.

function App() {
  const[weather,setWeather]=useState(null);
  const[city,setCity]=useState("")
  const cities=['New York','France','Osaka','Paris']

  const getCurrentLocation=async()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat= position.coords.latitude;
      let lon=position.coords.longitude;
      console.log("Current Location",lat, lon);
      getWeatherByCurrentLocation(lat,lon);
    });
  }
  
  const getWeatherByCurrentLocation=async(lat,lon)=>{
    let url=new URL(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=${lang}&units=metric`);
    const response = await fetch(url);
    const data= await response.json();
    setWeather(data);
  }

  const getWeatherByCity=async()=>{
    let url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=${lang}&units=metric`
    let response = await fetch(url);
    let data= await response.json()
    console.log("data",data);
    setWeather(data);
  }

  useEffect(()=>{
    if(city==""){
    getCurrentLocation();
    } else{
      getWeatherByCity(); //city state가 바뀐 뒤에 함수를 호출해야 되므로 useEffect안에 넣는다.
    }
  },[city])


  return (
    <div>
      <div class="container">
        <WeatherBox weather={weather}/>
        <WeatherButton cities={cities} setCity={setCity}/>
      </div>
    </div>
  );
}

export default App;

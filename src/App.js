import {useState, useEffect} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

const API_KEY = "6320e21052b10fe9eaa63c37ff048228";
let lang = "kr"; //en for english

//1. 앱 실행되자마자 현재위치기반의 날씨 정보가 보인다
//2. 도씨, 섭씨, 화씨 날씨 정보가 보인다.
//3. 5개의 버튼이 있다. (1개는 현재위치, 4개는 다른 도시)
//4. 도시버튼을 클릭할 때마다 도시별 날씨가 나온다.
//5. 현재위치 버튼을 누르면 다시 현재위치 기반 날씨가 나온다.
//6. 데이터를 로딩하는 동안 로딩 스피너가 돈다.

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  // const[errorExists,setErrorExists]=useState(false);
  // const[errorMessage,setErrorMessage]=useState("");
  const cities = ["New York", "France", "Osaka", "Paris"];

  const getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("Current Location", lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = new URL(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=${lang}&units=metric`
    );
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const getWeatherByCity = async () => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=${lang}&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    console.log("response",response);
    let data = await response.json();
    console.log("data", data);
    if (response.status===200){
    setWeather(data);
    setLoading(false);
    } else{
      throw new Error(data.message);
    }} catch(error){
      console.log("error message", error);
    }
    
    
  };

  useEffect(() => {
    if (city == "") {
      getCurrentLocation();
    } else {
      getWeatherByCity(); //city state가 바뀐 뒤에 함수를 호출해야 되므로 useEffect안에 넣는다.
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader
            color="#f88c6b"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} setCity={setCity} getLocation={getCurrentLocation} />
        </div>
      )}
    </div>
  );
}

//

export default App;


//꾸미기 ideas
//장소들 카드로 만들고 누르면 밑에 박스에 날씨 정보 보여주기
//지도에 위치들 점으로 표시하고 누르면 날씨 정보 출력하기
//*날씨를 이모티콘으로 표시하기(비-비이모티콘,맑음-해 이모티콘)
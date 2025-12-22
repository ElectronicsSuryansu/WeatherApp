import { useState } from 'react'
import './App.css'

function App() {
  const [city,setCity] = useState("");
  const [weather , setWeather] = useState("");
  const [error, setError]=useState("");
  async function getweather(){
    if(!city)
    {
      alert("enter the city name")
      return;
    }
    setWeather(null);
    setError("");

    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bba36ba99c9b1e642f6a45b53ac208ba&units=metric`);
      const data = await res.json();

      if(data.cod!==200){
        setError("city not found!!")
        return;}
    setWeather(data);
    } catch (error) {
       setError("failed to fetch weather");
    }
  }

  return (
    <>
      <div className="header">
      <h1>Weather App</h1>
      <p>see the weather of your town!</p>
       </div>
      <input type="text" className='cityname' placeholder='Enter city' value={city} onChange={(e)=> setCity(e.target.value)} 
      onKeyDown={(e)=>{
        if(e.key === "Enter")
          getweather()
      }}
      
      />
      <button type="submit" className='submit' onClick={getweather}>Enter</button>
      {/* {error && <p> {error} </p>} */}
      {
        error ? <p> {error} </p> : null
      }
      { weather && (
        <div className='weatherdetails'>
          <h3> {weather.name} </h3>
          <p>
            Discription : {weather.weather[0].description} <br />
            Temperature : {weather.main.temp} °C <br />
            Feels like  : {weather.main.feels_like} <br />
            Humidity    : {weather.main.humidity}% <br />


          </p>
          

        </div>
      )
      

      }


    </>
  )
}

export default App

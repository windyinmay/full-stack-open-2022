import React, {useEffect, useState} from 'react';
import axios from "axios";

export default function FoundCountry({countriesFilter}) {
    const languages = countriesFilter.map(c => c.languages);
    const api_key = process.env.REACT_APP_API_KEY;
    const [weather, setWeather] = useState(null);
    const URLBase = 'https://api.openweathermap.org/data/2.5/weather?';
    const lat = countriesFilter.map(c => c.capitalInfo.latlng[0])
    const lon = countriesFilter.map(c => c.capitalInfo.latlng[1])
    useEffect(() => {
        axios
            .get(`${URLBase}lat=${lat}&lon=${lon}&appid=${api_key}`)
            .then(res => setWeather(res.data))

    }, [countriesFilter])

    const tempInCelcius = weather && (Number(weather.main.temp) - 273.15).toFixed(2)
    const iconCode = weather && weather.weather[0].icon
    const icon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`
    console.log(iconCode)
    return(
        <div>
            <br/>
            <div>
                <h1>{countriesFilter.map(c=> c.name.common)}</h1>
            </div>
            <br/>
            <div>
                <p>capital {countriesFilter.map(c => c.capital)}</p>
                <p>area {countriesFilter.map(c => c.area)}</p>
            </div>
            <br/>
            <div>
                <p><b>languages:</b></p>
                <br/>
                <p>{Object.values(languages[0]).map((l, index) => <li key={index}>{l}</li>)}</p>
            </div>
            <br/>
            <div>
                <img src = {countriesFilter.map(c => c.flags.png)}  alt='Country flag' />


                <h2>Weather in  {countriesFilter.map(c => c.capital)}</h2>

                <p>temperature {tempInCelcius} Celcius</p>

                <img src = {icon}  alt = 'Captial weather' width={150}/>

                {weather && <p>wind {weather.wind.speed} m/s</p>}
            </div>
        </div>
    )
}
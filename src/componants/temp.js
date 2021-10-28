import React, { useState, useEffect } from "react";
import Weathercard from "./weathercard";
import "./style.css";



const Temp = () => {
    const [searchValue, setSearchValue] = useState("ahmedabad");
    const [tempInfo, setTempInfo] = useState({});
    // got your current location 
   
    const getUserGeolocationDetails = async () => {
        let url = "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572";
        let res = await fetch(url);
        let data = await res.json();
        const { city } = data;
            
        setSearchValue(city);
    };
   



    const getWeatherInfo = async () => {
        // if(searchValue===""){
        //     alert("Please Enter the name....")
        // }
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&
            units=metric&appid=f9c363a93dffe56335b8c4c88d89812a`;
 
            let res = await fetch(url);
            let data = await res.json();
            

            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };

            setTempInfo(myNewWeatherInfo);
        } catch (error) {
            // alert("Please enter a valid name....")
            // setSearchValue("");
            console.log("error");

        }
    };

    useEffect(() => {
        getWeatherInfo();
    }, []);

    return (
        <>
            <div className="wrap" style={{marginTop:"80px"}}>
                <div className="search">
                    <input
                        type="search"
                        placeholder="search..."
                        autoFocus
                        id="search"
                        className="searchTerm"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />

                    <button
                        className="searchButton"
                        type="button"
                        onClick={getWeatherInfo}>
                        Search
                    </button>
                    <button 
                        className="searchButton"
                        type="button"
                        onClick={getUserGeolocationDetails}>
                        YourLocation
                    </button>
                </div>
            </div>

            {/* our temp card  */}
            <Weathercard tempInfo={tempInfo} />
            <br />
            <br />
            <br />
            <br />
            {/* <h1 onClick={getUserGeolocationDetails}>sssss</h1> */}
        </>
    );
};

export default Temp;

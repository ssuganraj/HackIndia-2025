import React, { useState, useEffect, useCallback } from "react";

const App = () => {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [airQuality, setAirQuality] = useState("...");
    const [airQualityStatus, setAirQualityStatus] = useState("...");
    const [components, setComponents] = useState({});
    const [error, setError] = useState("");
    
    const appId = "df936748669869fb0b65135ef3e67fff";
    const apiUrl = "https://api.openweathermap.org/data/2.5/air_pollution";

    const fetchAirQuality = useCallback(async (lat, lon) => {
        try {
            const response = await fetch(`${apiUrl}?lat=${lat}&lon=${lon}&appid=${appId}`);
            const data = await response.json();
            updateAirQuality(data);
            setComponents(data.list[0].components);
        } catch (error) {
            setError("Something went wrong. Check your internet connection.");
        }
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const lat = pos.coords.latitude.toFixed(4);
                    const lon = pos.coords.longitude.toFixed(4);
                    setLatitude(lat);
                    setLongitude(lon);
                    fetchAirQuality(lat, lon);
                },
                (err) => setError("Can't access your location. Please enter coordinates.")
            );
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    }, [fetchAirQuality]);

    const updateAirQuality = (data) => {
        const aqi = data.list[0].main.aqi;
        let status = "";
        let color = "";

        switch (aqi) {
            case 1:
                status = "Good"; color = "rgb(19, 201, 28)"; break;
            case 2:
                status = "Fair"; color = "rgb(15, 134, 25)"; break;
            case 3:
                status = "Moderate"; color = "rgb(201, 204, 13)"; break;
            case 4:
                status = "Poor"; color = "rgb(204, 83, 13)"; break;
            case 5:
                status = "Very Poor"; color = "rgb(204, 13, 13)"; break;
            default:
                status = "Unknown";
        }

        setAirQuality(aqi);
        setAirQualityStatus({ status, color });
    };

    return (
        <div className="root">
            <h1 className="heading">Pasumaicholai Air Pollution Indicator</h1>
            <div className="location-container">
                <h2 className="sub-heading">Your Location:</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <input
                    type="number"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    className="loc-input"
                />
                <input
                    type="number"
                    placeholder="Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className="loc-input"
                />
                <button className="search-btn" onClick={() => fetchAirQuality(latitude, longitude)}>Search</button>
            </div>

            <div className="air-info">
                <h2 className="sub-heading">Air Quality Index:</h2>
                <span className="air-quality">{airQuality}</span>
                <span className="arr">&nbsp;&rarr;&nbsp;</span>
                <span className="air-quality-status" style={{ color: airQualityStatus.color }}>
                    {airQualityStatus.status}
                </span>

                <div className="component-container">
                    <h2 className="sub-heading">Concentration of pollutants in air:</h2>
                    {Object.keys(components).map((comp) => (
                        <div key={comp}>
                            <h3 className="component-names">{comp.replace("_", " ").toUpperCase()}:</h3>
                            <span className="component-val">{components[comp]} μg/m³</span>
                        </div>
                    ))}
                </div>
            </div>
            <footer>pasumaicholai 0990@gmail.com</footer>
        </div>
    );
};

export default App;

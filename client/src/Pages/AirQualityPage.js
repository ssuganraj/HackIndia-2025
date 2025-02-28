import React, { useState, useEffect, useCallback } from "react";
import NavBar from "./../Components/AirQualityNavBar/NavBar";

const App = () => {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [airQuality, setAirQuality] = useState("...");
    const [airQualityStatus, setAirQualityStatus] = useState({ status: "...", color: "text-gray-500" });
    const [components, setComponents] = useState({});
    const [error, setError] = useState("");
    
    const appId = "df936748669869fb0b65135ef3e67fff";
    const apiUrl = "https://api.openweathermap.org/data/2.5/air_pollution";

    const fetchAirQuality = useCallback(async (lat, lon) => {
        try {
            const response = await fetch(`${apiUrl}?lat=${lat}&lon=${lon}&appid=${appId}`);
            if (!response.ok) throw new Error("Failed to fetch air quality data.");
            const data = await response.json();
            if (!data?.list?.length) throw new Error("Invalid data received.");
            
            updateAirQuality(data);
            setComponents(data.list[0].components);
            setError("");
        } catch (error) {
            setError("Something went wrong. Check your internet connection or try again.");
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
                () => setError("Can't access your location. Please enter coordinates."),
                { enableHighAccuracy: true }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    }, [fetchAirQuality]);

    const updateAirQuality = (data) => {
        const aqi = data.list[0].main.aqi;
        let status = "Unknown", color = "text-gray-500";

        switch (aqi) {
            case 1: status = "Good"; color = "text-green-500"; break;
            case 2: status = "Fair"; color = "text-green-400"; break;
            case 3: status = "Moderate"; color = "text-yellow-500"; break;
            case 4: status = "Poor"; color = "text-orange-500"; break;
            case 5: status = "Very Poor"; color = "text-red-500"; break;
        }

        setAirQuality(aqi);
        setAirQualityStatus({ status, color });
    };

    return (
        <div className="flex flex-col items-center h-screen bg-gray-100 p-6 lg:p-12 relative">
            <NavBar />
            <div className="absolute top-1 w-full h-full flex justify-center items-center flex-col">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Pasumaicholai Air Quality Indicator</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-700 mb-2">Your Location:</h2>
                        <div className="flex space-x-2 mb-4">
                            <input
                                type="number"
                                placeholder="Latitude"
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                                className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                type="number"
                                placeholder="Longitude"
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                                className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <button
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                            onClick={() => fetchAirQuality(latitude, longitude)}
                        >
                            Search
                        </button>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <h2 className="text-lg font-medium text-gray-700 mb-2">Air Quality Index:</h2>
                        <p className="text-2xl font-semibold">
                            {airQuality} - <span className={airQualityStatus.color}>{airQualityStatus.status}</span>
                        </p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl mt-6">
                    <h2 className="text-lg font-medium text-gray-700 mb-2">Pollutant Concentrations (μg/m³):</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Object.keys(components).map((comp) => (
                            <div key={comp} className="p-2 bg-gray-50 rounded-md text-center">
                                <h3 className="text-sm font-semibold text-gray-600">{comp.replace("_", " ").toUpperCase()}</h3>
                                <p className="text-lg font-bold text-gray-800">{components[comp]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        
        </div>
    );
};

export default App;
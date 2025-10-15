import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./App.css";

const customIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/fluency/48/marker.png",
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [15,15]
});

const searchIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/ios-glyphs/30/marker--v1.png",
  iconSize: [25, 25], 
  iconAnchor: [15, 30], 
  popupAnchor: [1, -30],
  shadowSize: [15,15]
});




const locations = [
  { name: "Cuttack", coords: [20.4625, 85.8828] },
  { name: "Kanpur", coords: [26.4499, 80.3319] },
  { name: "Chandigarh", coords: [30.7333, 76.7794] },
  { name: "Bangalore", coords: [12.9716, 77.5946] },
  { name: "Pune", coords: [18.5204, 73.8567] }
];

const WEATHER_API_KEY = "3574bbddf1e723b80494eedcd578822f";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const GEO_API_URL = "https://nominatim.openstreetmap.org/search?format=json&q=";

const ChangeMapView = ({ coords }) => {
  const map = useMap();
  map.setView(coords, 10);
  return null;
};

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState([20, 80]);
  const [searchedLocation, setSearchedLocation] = useState(null);

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
      );
      const data = await response.json();
      setWeather({
        temperature: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        precipitation: data.rain ? data.rain["1h"] : 0
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchCoordinates = async (city) => {
    try {
      const response = await fetch(`${GEO_API_URL}${city}`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
        fetchWeather(lat, lon);
        const newLocation = { name: city, coords: [parseFloat(lat), parseFloat(lon)] };
        setSelectedLocation(newLocation);
        setSearchedLocation(newLocation);
      }
    } catch (error) {
      console.error("Error fetching location coordinates:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    fetchCoordinates(e.target.value);
  };


  return (
    <div className="app-container">
      <div className="search-bar-container">
        <input 
          type="text" 
          placeholder="Search location..." 
          value={searchQuery} 
          onChange={handleSearch} 
          className="search-bar"
        />
      </div>
      <MapContainer center={mapCenter} zoom={4} className="map-container" key={mapCenter.join()}> 
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ChangeMapView coords={mapCenter} />
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={location.coords}
            icon={customIcon}
            eventHandlers={{ click: () => {
              setSelectedLocation(location);
              fetchWeather(location.coords[0], location.coords[1]);
              setMapCenter(location.coords);
            } }}
          >
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
        {searchedLocation && (
          <Marker 
            position={searchedLocation.coords} 
            icon={searchIcon}
          >
            <Popup>{searchedLocation.name}</Popup>
          </Marker>
        )}
      </MapContainer>
      <div className="stats-container">
        <h2>Statistics</h2>
        <p>Total Markers: {locations.length}</p>
        <p>Marker Names: {locations.map(loc => loc.name).join(", ")}</p>
        {selectedLocation && (
          <div>
            <h3>Selected Location</h3>
            <p>Name: {selectedLocation.name}</p>
            <p>Coordinates: {selectedLocation.coords.join(", ")}</p>
            {weather && (
              <div>
                <h4>Weather Info</h4>
                <p>Temperature: {weather.temperature}°C</p>
                <p>Humidity: {weather.humidity}%</p>
                <p>Description: {weather.description}</p>
                <p>Precipitation: {weather.precipitation} mm</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

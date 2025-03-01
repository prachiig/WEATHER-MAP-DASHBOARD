# Interactive Map Dashboard

## Project Overview
This project is an **Interactive Web Dashboard** that integrates a map with predefined location markers and real-time weather data retrieval. Users can also search for a city, and the dashboard will automatically fetch and display its weather details.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript, React.js
- **Map Library**: Leaflet.js for rendering the interactive map
- **Weather API**: OpenWeatherMap API to fetch real-time weather details
- **Geolocation API**: OpenStreetMap Nominatim API for fetching coordinates of searched cities

## Features Implemented
### 1. Display an Interactive Map
- Used **Leaflet.js** to render a dynamic map.
- Added **predefined markers** for six cities (Chicago, Cuttack, Kanpur, Chandigarh, Bangalore, Pune).
- Clicking on a marker displays weather information for that location.

### 2. Responsive UI
- Implemented **CSS Grid and Flexbox** for a smooth and adaptable layout.
- The UI adjusts based on screen size for both **desktop and mobile** users.

### 3. Location Search Feature
- Implemented a **search bar** that allows users to enter a city name.
- Used OpenStreetMap’s **Nominatim API** to fetch the city’s coordinates.
- Dynamically places a **custom marker** on the searched location.
- Displays real-time **weather data** from OpenWeatherMap API.

### 4. Weather Data Integration
- On selecting a location (either predefined or searched), the dashboard retrieves:
  - Temperature (°C)
  - Humidity (%)
  - Weather Description
  - Precipitation (if available)
- Weather data is displayed dynamically in the **Stats Panel**.

### 5. Differentiating Searched Location
- Used a **custom marker icon** for the searched location, different from predefined markers.
- Allows visual distinction between user-searched and preset locations.

## How It Works
1. **Predefined Markers**: Users can click on any existing marker to fetch its weather data.
2. **Search Functionality**:
   - User enters a city name.
   - The app fetches the latitude and longitude using OpenStreetMap’s API.
   - A new marker is placed for that location with a distinct icon.
   - Weather data is retrieved and displayed dynamically.

## Future Enhancements
- Implementing additional weather parameters (e.g., wind speed, visibility).
- Allowing users to add custom markers permanently.
- Storing past searches for quick access.

This project successfully integrates mapping, weather data retrieval, and search-based location tracking in an interactive web dashboard using **React.js and Leaflet.js**. 🚀


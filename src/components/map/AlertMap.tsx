'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamically import map components because they require the window object
const MapContainer = dynamic(() => import('react-leaflet').then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((m) => m.TileLayer), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((m) => m.Popup), { ssr: false });
const Circle = dynamic(() => import('react-leaflet').then((m) => m.Circle), { ssr: false });

export default function AlertMap() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setPosition([lat, lon]);
          
          // Fetch real-time weather data
          const timestamp = new Date().getTime();
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&_t=${timestamp}`, { cache: 'no-store' })
            .then(res => res.json())
            .then(data => setWeather(data.current_weather))
            .catch(err => console.error("Error fetching weather:", err));
        },
        (err) => {
          console.error("Geolocation error:", err);
          setPosition([28.6139, 77.2090]);
        }
      );
    } else {
      setPosition([28.6139, 77.2090]);
    }
  }, []);

  if (!position) {
    return <div className="glass-panel p-8 text-center" style={{ padding: '2rem' }}>Acquiring satellite data...</div>;
  }

  // Determine circle color based on actual weather
  let circleColor = '#00ffaa'; // Green for all clear
  let statusText = 'Safe Zone';
  
  if (weather) {
    if (weather.weathercode >= 61 || weather.windspeed > 40 || weather.temperature > 40) {
      circleColor = '#ff007a'; // Red for severe
      statusText = 'Hazardous Weather Detected';
    } else if (weather.weathercode >= 45 && weather.weathercode <= 55) {
      circleColor = '#ffaa00'; // Orange for mild alerts like fog/drizzle
      statusText = 'Mild Advisory';
    }
  }

  return (
    <div style={{ height: '600px', width: '100%', borderRadius: '20px', overflow: 'hidden' }} className="glass-panel">
      <MapContainer center={position} zoom={11} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User Location Marker colored by actual real-time weather */}
        <Circle 
          center={position} 
          radius={8000} 
          pathOptions={{ color: circleColor, fillColor: circleColor, fillOpacity: 0.3 }}
        >
          {weather && (
            <Popup>
              <strong>Real-Time Weather Status</strong><br/>
              Status: {statusText}<br/>
              Current Temp: {weather.temperature}°C<br/>
              Wind Speed: {weather.windspeed} km/h<br/>
            </Popup>
          )}
        </Circle>
      </MapContainer>
    </div>
  );
}

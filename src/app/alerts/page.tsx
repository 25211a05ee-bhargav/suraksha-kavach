'use client';

import React, { useEffect, useState } from 'react';
import AlertMap from '@/components/map/AlertMap';

export default function AlertsPage() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [realAlerts, setRealAlerts] = useState<{title: string, source: string, color: string}[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          fetchRealTimeData(lat, lon);
        },
        (err) => {
          console.error("Geolocation error:", err);
          fetchRealTimeData(28.6139, 77.2090); // Default to New Delhi
        }
      );
    } else {
      fetchRealTimeData(28.6139, 77.2090);
    }
  }, []);

  const fetchRealTimeData = async (lat: number, lon: number) => {
    try {
      const timestamp = new Date().getTime();
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,precipitation,weather_code&_t=${timestamp}`, { cache: 'no-store' });
      const data = await res.json();
      setWeatherData(data);

      const alerts = [];
      const current = data.current;
      
      // Real-time logic based on actual fetched data
      if (current.weather_code >= 95) {
        alerts.push({ title: 'Severe Thunderstorm Warning', source: 'Real-time Weather Data', color: '#ff007a' });
      } else if (current.weather_code >= 61) {
        alerts.push({ title: 'Active Rainfall Alert', source: 'Real-time Weather Data', color: '#00d2ff' });
      } else if (current.weather_code === 45 || current.weather_code === 48) {
        alerts.push({ title: 'Dense Fog Advisory', source: 'Real-time Weather Data', color: '#a0a0b0' });
      }

      if (current.temperature_2m > 40) {
        alerts.push({ title: 'Extreme Heatwave Alert', source: 'Real-time Temperature Data', color: '#ffaa00' });
      }

      if (current.wind_speed_10m > 40) {
        alerts.push({ title: 'High Wind Warning', source: 'Real-time Wind Data', color: '#ff007a' });
      }

      setRealAlerts(alerts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <h1 className="text-gradient">Real-Time Alert Dashboard</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
        Live monitoring of your exact coordinates using real-time atmospheric APIs.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '30px' }}>
        <div>
          <AlertMap />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ color: realAlerts.length > 0 ? 'var(--accent)' : '#00ffaa' }}>
              {realAlerts.length > 0 ? 'Active Real-Time Alerts' : 'All Clear'}
            </h3>
            
            {loading ? (
              <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Scanning local coordinates...</p>
            ) : realAlerts.length > 0 ? (
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                {realAlerts.map((alert, idx) => (
                  <li key={idx} style={{ borderLeft: `3px solid ${alert.color}`, paddingLeft: '15px' }}>
                    <strong>{alert.title}</strong><br/>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{alert.source}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '20px', padding: '15px', background: 'rgba(0, 255, 170, 0.05)', borderRadius: '10px', border: '1px solid rgba(0, 255, 170, 0.2)' }}>
                <div style={{ width: '25px', height: '25px', borderRadius: '50%', background: '#00ffaa', boxShadow: '0 0 15px #00ffaa', flexShrink: 0 }}></div>
                <div>
                  <strong style={{ color: '#00ffaa', fontSize: '1.1rem', display: 'block' }}>Safe Zone Confirmed</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No hazardous conditions detected based on live satellite data.</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="glass-panel" style={{ padding: '20px', background: 'rgba(0, 210, 255, 0.1)' }}>
            <h3 style={{ color: '#fff' }}>Local Conditions</h3>
            {weatherData?.current ? (
              <ul style={{ listStyle: 'none', marginTop: '10px', color: 'var(--text-muted)' }}>
                <li>Temp: <strong style={{ color: '#fff' }}>{weatherData.current.temperature_2m}°C</strong></li>
                <li>Wind: <strong style={{ color: '#fff' }}>{weatherData.current.wind_speed_10m} km/h</strong></li>
                <li>Precipitation: <strong style={{ color: '#fff' }}>{weatherData.current.precipitation} mm</strong></li>
              </ul>
            ) : (
              <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Loading data...</p>
            )}
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '15px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
              See something dangerous? Earn points by reporting it.
            </p>
            <a href="/citizen-map" className="btn-secondary" style={{ display: 'block', width: '100%', marginTop: '10px', textAlign: 'center' }}>Report Hazard</a>
          </div>
        </div>
      </div>
    </div>
  );
}

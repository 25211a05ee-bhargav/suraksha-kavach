'use client';

import React, { useState, useRef } from 'react';

export default function AdminPanelPage() {
  const [certUploaded, setCertUploaded] = useState(false);
  const [drillLogged, setDrillLogged] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCertUploaded(true);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleLogDrill = () => {
    const drillName = prompt("Enter the name of the new mock drill (e.g. Fire Evacuation):");
    if (drillName) {
      alert(`Drill "${drillName}" successfully logged. Processing report...`);
      setDrillLogged(true);
    }
  };

  const handleUpdateChecklist = () => {
    alert("Successfully updated !!");
  };

  return (
    <div>
      {/* Disclaimer Banner */}
      <div style={{ 
        background: 'rgba(255, 0, 0, 0.1)', 
        borderBottom: '2px solid red', 
        overflow: 'hidden' 
      }}>
        <p style={{ 
          color: '#ff4444', 
          fontWeight: 'bold', 
          fontSize: '1.2rem', 
          padding: '8px', 
          whiteSpace: 'nowrap', 
          animation: 'scroll-left 12s linear infinite' 
        }}>
          ⚠️ DISCLAIMER: ANY FALSE INFORMATION SUBMITTED WILL RESULT IN SEVERE ACTION TAKEN...
        </p>
      </div>

      {/* Scoped CSS for animation */}
      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      {/* Main Container */}
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <header style={{ marginBottom: '40px' }}>
          <h1 className="text-gradient">School Admin & Compliance Panel</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Manage structural safety, mock drills, and school fortifications.
          </p>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px' 
        }}>
          
          {/* Safety Certificates */}
          <div className="glass-panel" style={{ padding: '25px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--primary)' }}>
              Safety Certificates
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Upload structural safety certificates issued by the municipality.
            </p>
            
            <div 
              onClick={triggerFileInput}
              style={{ 
                width: '100%', 
                height: '100px', 
                border: '2px dashed var(--glass-border)', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'var(--text-muted)', 
                marginBottom: '15px', 
                cursor: 'pointer', 
                background: 'rgba(255,255,255,0.02)' 
              }}
            >
              Click to Access Files or Drag & Drop PDF here
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept=".pdf,.jpg,.jpeg,.png" 
              onChange={handleFileUpload} 
            />
            
            {certUploaded && (
              <div style={{ 
                color: '#ff4444', 
                fontWeight: 'bold', 
                marginBottom: '20px', 
                textAlign: 'center', 
                fontSize: '1.1rem', 
                textShadow: '0 0 10px rgba(255,0,0,0.5)' 
              }}>
                [ Your work will be verified and will be awarded ]
              </div>
            )}
            
            <ul style={{ 
              listStyle: 'none', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '10px' 
            }}>
              <li style={{ 
                background: 'rgba(255,255,255,0.05)', 
                padding: '10px', 
                borderRadius: '5px', 
                display: 'flex', 
                justifyContent: 'space-between' 
              }}>
                <span>Building Safety 2024</span>
                <span style={{ color: '#00ffaa' }}>Verified</span>
              </li>
              <li style={{ 
                background: 'rgba(255,255,255,0.05)', 
                padding: '10px', 
                borderRadius: '5px', 
                display: 'flex', 
                justifyContent: 'space-between' 
              }}>
                <span>Fire Safety NOC</span>
                <span style={{ color: '#ffaa00' }}>Pending Renewal</span>
              </li>
            </ul>
          </div>

          {/* Mock Drills Tracker */}
          <div className="glass-panel" style={{ padding: '25px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--secondary)' }}>
              Mock Drills Tracker
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Mandatory drills must be repeated every six months.
            </p>
            
            <div style={{ 
              background: 'rgba(255,255,255,0.05)', 
              padding: '15px', 
              borderRadius: '10px', 
              marginBottom: '20px' 
            }}>
              <h4 style={{ marginBottom: '5px' }}>Next Mandatory Drill</h4>
              <div className="text-gradient" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                Earthquake Evacuation
              </div>
              <div style={{ color: '#ffaa00', fontSize: '0.9rem' }}>
                Due by: Oct 15, 2025 (45 days left)
              </div>
            </div>
            
            {drillLogged && (
              <div style={{ 
                background: 'rgba(0, 255, 170, 0.1)', 
                border: '1px solid #00ffaa', 
                padding: '10px', 
                borderRadius: '5px', 
                marginBottom: '15px', 
                color: '#00ffaa', 
                textAlign: 'center' 
              }}>
                Recent Drill Logged Successfully!
              </div>
            )}

            <button className="btn-secondary" style={{ width: '100%' }} onClick={handleLogDrill}>
              Log New Drill
            </button>
          </div>

          {/* Fortifications Checklist */}
          <div className="glass-panel" style={{ padding: '25px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--accent)' }}>
              Physical Fortifications
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Checklist for mandatory school infrastructure safety.
            </p>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" defaultChecked />
                <span>Boundary Wall Height {'>'} 8ft</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" defaultChecked />
                <span>CCTV Cameras Active (All Gates)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" />
                <span>Emergency Exits Clear</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" defaultChecked />
                <span>First Aid Kits Restocked</span>
              </label>
              
              <button 
                type="button" 
                className="btn-primary" 
                style={{ marginTop: '10px' }} 


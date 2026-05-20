'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useScore } from '@/context/ScoreContext';

export default function CitizenMapPage() {
  const { addScore } = useScore();
  const [activeTab, setActiveTab] = useState<'hazard' | 'sensor'>('hazard');
  const [cameraActive, setCameraActive] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  
  // Form states
  const [hazardTitle, setHazardTitle] = useState('');
  const [hazardLocation, setHazardLocation] = useState('');
  const [hazardType, setHazardType] = useState('waterlogging');
  const [hazardDesc, setHazardDesc] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("WebRTC not supported or insecure context");
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
      setPhoto(null);
    } catch (err) {
      console.warn("Camera streaming unavailable, falling back to native file picker:", err);
      // Fallback to native device camera/file picker
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  const handleNativeFileCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target?.result as string);
        setCameraActive(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        // Set canvas dimensions to video dimensions
        canvasRef.current.width = videoRef.current.videoWidth || 640;
        canvasRef.current.height = videoRef.current.videoHeight || 480;
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // Convert to data URL
        const dataUrl = canvasRef.current.toDataURL('image/png');
        setPhoto(dataUrl);
        stopCamera();
      }
    }
  };

  const submitHazard = () => {
    if (!hazardTitle || !hazardLocation) {
      alert('Please fill in the Hazard Title and Location.');
      return;
    }
    if (!photo) {
      alert('Please attach a photo of the hazard using the camera.');
      return;
    }

    addScore(20);
    alert(`Hazard "${hazardTitle}" at "${hazardLocation}" successfully submitted with geo-tagged photo! +20 Pts awarded.`);
    
    // Reset form
    setPhoto(null);
    setHazardTitle('');
    setHazardLocation('');
    setHazardDesc('');
    setHazardType('waterlogging');
  };

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="text-gradient">Active Citizen Mapping</h1>
        <p style={{ color: 'var(--text-muted)' }}>Report local hazards or perform health checks on IoT sensors to earn Suraksha Points.</p>
      </header>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
        <button 
          className={activeTab === 'hazard' ? 'btn-primary' : 'btn-secondary'} 
          onClick={() => setActiveTab('hazard')}
        >
          Report Hazard
        </button>
        <button 
          className={activeTab === 'sensor' ? 'btn-primary' : 'btn-secondary'} 
          onClick={() => setActiveTab('sensor')}
        >
          Sensor Health Check
        </button>
      </div>

      <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '30px' }}>
        {activeTab === 'hazard' ? (
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2>Upload Hazard Report</h2>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Hazard Title</label>
              <input type="text" value={hazardTitle || ''} onChange={(e) => setHazardTitle(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'white' }} placeholder="e.g. Flooded Underpass" />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Location / Landmark</label>
              <input type="text" value={hazardLocation || ''} onChange={(e) => setHazardLocation(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'white' }} placeholder="e.g. MG Road Junction" />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Hazard Type</label>
              <select value={hazardType || 'waterlogging'} onChange={(e) => setHazardType(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'white' }}>
                <option value="waterlogging">Waterlogging</option>
                <option value="fallen_tree">Fallen Tree</option>
                <option value="infrastructure">Damaged Infrastructure</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Geo-Tagged Photo</label>
              
              {!cameraActive && !photo && (
                <div onClick={startCamera} style={{ width: '100%', height: '150px', border: '2px dashed var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', cursor: 'pointer', background: 'rgba(0, 255, 170, 0.05)' }}>
                  Click to Open Camera
                </div>
              )}

              {cameraActive && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ position: 'relative', width: '100%', paddingTop: '75%', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--primary)', boxShadow: '0 0 15px rgba(0,255,170,0.2)' }}>
                    <video ref={videoRef} autoPlay playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}></video>
                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,0,0,0.8)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%', display: 'inline-block' }}></span> LIVE
                    </div>
                  </div>
                  <button type="button" onClick={capturePhoto} className="btn-secondary" style={{ width: '100%', background: '#ff007a', borderColor: '#ff007a', color: 'white' }}>
                    Capture Photo
                  </button>
                </div>
              )}

              {photo && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ position: 'relative', width: '100%', paddingTop: '75%', borderRadius: '8px', overflow: 'hidden', border: '2px solid var(--glass-border)' }}>
                    <img src={photo} alt="Captured hazard" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <button type="button" onClick={startCamera} className="btn-secondary" style={{ width: '100%' }}>
                    Retake Photo
                  </button>
                </div>
              )}
              
              {/* Hidden canvas for processing */}
              <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
              {/* Native file input fallback */}
              <input 
                type="file" 
                accept="image/*" 
                capture="environment" 
                ref={fileInputRef} 
                onChange={handleNativeFileCapture} 
                style={{ display: 'none' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Description</label>
              <textarea value={hazardDesc || ''} onChange={(e) => setHazardDesc(e.target.value)} rows={4} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'white' }} placeholder="Describe the severity..."></textarea>
            </div>

            <button type="button" className="btn-primary" onClick={submitHazard}>Submit Report (+20 Pts)</button>
          </form>
        ) : (
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2>IoT Sensor Health Check</h2>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Sensor ID (QR Code Scan)</label>
              <input type="text" style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'white' }} placeholder="e.g. IIT-MANDI-SENS-001" />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Status</label>
              <div style={{ display: 'flex', gap: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="radio" name="status" value="OK" /> Operational</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="radio" name="status" value="DAMAGED" /> Damaged</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="radio" name="status" value="VANDALIZED" /> Vandalized</label>
              </div>
            </div>

            <button type="button" className="btn-primary" onClick={() => {
              addScore(50);
              alert('Sensor status verified! +50 Pts awarded.');
            }}>Verify Sensor (+50 Pts)</button>
          </form>
        )}
      </div>
    </div>
  );
}

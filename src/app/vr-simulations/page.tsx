'use client';

import React from 'react';
import Link from 'next/link';

export default function VRSimulationsPage() {
  const handleLaunch = (simName: string) => {
    alert(`The ${simName} VR Simulation environment is currently under development for the SIH prototype. Please check back later!`);
  };

  const simulations = [
    {
      id: 'earthquake',
      title: 'Earthquake Response',
      description: 'Navigate through a shattered city street, identify structural vulnerabilities, and rescue trapped civilians.',
      image: '/images/vr_earthquake_1779279763289.png',
      pts: 200,
      difficulty: 'Hard'
    },
    {
      id: 'flood',
      title: 'Urban Flood Rescue',
      description: 'Operate a virtual rescue raft through flooded urban streets, managing electrical hazards and rapid currents.',
      image: '/images/vr_flood_1779279780606.png',
      pts: 150,
      difficulty: 'Medium'
    },
    {
      id: 'fire',
      title: 'High-Rise Fire Evacuation',
      description: 'Clear a burning multi-story building, manage smoke inhalation risks, and guide civilians to safety.',
      image: '/images/vr_fire_1779279799909.png',
      pts: 150,
      difficulty: 'Medium'
    },
    {
      id: 'cyclone',
      title: 'Coastal Cyclone Alert',
      description: 'Establish emergency communications, secure coastal infrastructure, and coordinate large-scale evacuations.',
      image: '/images/vr_cyclone_1779279815814.png',
      pts: 300,
      difficulty: 'Extreme'
    }
  ];

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem' }}>VR Disaster Modules</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Select a hyper-realistic disaster scenario to train your first-responder skills. Earn Aapda Score points for successful completions.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        {simulations.map((sim) => (
          <div key={sim.id} className="glass-panel" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', width: '100%', height: '200px' }}>
              <img 
                src={sim.image} 
                alt={sim.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderBottom: '1px solid var(--glass-border)' }} 
              />
              <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0, 0, 0, 0.7)', padding: '4px 10px', borderRadius: '15px', border: '1px solid var(--glass-border)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                {sim.difficulty}
              </div>
            </div>
            
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{sim.title}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px', flexGrow: 1 }}>
                {sim.description}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>+{sim.pts} Pts</span>
                <button 
                  className="btn-primary" 
                  onClick={() => handleLaunch(sim.title)}
                  style={{ padding: '8px 20px' }}
                >
                  Launch VR
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link href="/dashboard" className="btn-secondary">
          &larr; Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

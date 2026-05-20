import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: 'calc(100vh - 120px)', 
      padding: '20px',
      backgroundImage: 'linear-gradient(rgba(10, 10, 15, 0.7), rgba(10, 10, 15, 0.9)), url("/images/bg_dashboard.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div className="vr-container">
          <div className="vr-element" style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', padding: '60px 40px', borderRadius: '30px', maxWidth: '800px', margin: '0 auto', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            <h1 className="text-gradient" style={{ fontSize: '4rem', marginBottom: '20px', lineHeight: '1.2' }}>
              Suraksha Kavach
            </h1>
            <h2 style={{ color: 'var(--text-main)', fontSize: '1.8rem', marginBottom: '15px', fontWeight: '400' }}>
              A Gamified Disaster Response Prototype
            </h2>
            
            <div style={{ display: 'inline-block', background: 'rgba(0, 210, 255, 0.1)', border: '1px solid var(--primary)', padding: '8px 20px', borderRadius: '30px', color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '30px' }}>
              PROTOTYPE DEVELOPED BY BHARGAV
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 40px' }}>
              Suraksha Kavach is an innovative prototype designed to transform citizens into certified virtual first responders. It integrates immersive VR training modules, real-time satellite weather alerts, and crowdsourced hazard mapping into a single, unified disaster management ecosystem.
            </p>
            
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <Link href="/login" className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.2rem' }}>
                Proceed to Login Dashboard &rarr;
              </Link>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '40px', marginTop: '60px', opacity: 0.7, justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)' }}>VR</div>
            <div style={{ color: 'var(--text-muted)' }}>Simulation Training</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--secondary)' }}>Live</div>
            <div style={{ color: 'var(--text-muted)' }}>Satellite Weather</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent)' }}>Map</div>
            <div style={{ color: 'var(--text-muted)' }}>Crowdsourced Hazards</div>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <footer style={{ marginTop: '50px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', textAlign: 'center' }}>
        <p style={{ color: '#ff4444', fontSize: '0.85rem', margin: '0 0 5px 0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
          [ THIS WEB IS NOT FULLY DEVELOPED JUST A PROTOTYPE ]
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
          Contact: <a href="mailto:bhargav.penapaka7@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'none' }}>bhargav.penapaka7@gmail.com</a>
        </p>
      </footer>
      
    </div>
  );
}

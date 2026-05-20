'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useScore } from '@/context/ScoreContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { data: session, status } = useSession();
  const { score } = useScore();

  return (
    <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
      <style>
        {`
          @keyframes pulseRed {
            0% { background-color: rgba(255, 0, 0, 0.1); }
            50% { background-color: rgba(255, 0, 0, 0.4); }
            100% { background-color: rgba(255, 0, 0, 0.1); }
          }
        `}
      </style>
      <div style={{ borderBottom: '2px solid red', width: '100%', overflow: 'hidden', animation: 'pulseRed 2s infinite ease-in-out' }}>
        <marquee style={{ color: '#ff4444', fontWeight: 'bold', fontSize: '1.2rem', padding: '10px 0', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', width: '100%' }}>
          ANY FALSE INFORMATION LEADS TO CRICTICAL ACTION . LETS DEVELOP COUNTRY TOGETHER !! JAI HIND
        </marquee>
      </div>
      <nav className={styles.navbar} style={{ position: 'relative' }}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
          <span className="text-gradient">Suraksha Kavach</span>
        </Link>

        <div className={styles.navLinks}>
          <Link href="/dashboard" className={styles.navLink}>VR Lab</Link>
          <Link href="/alerts" className={styles.navLink}>Alerts</Link>
          <Link href="/citizen-map" className={styles.navLink}>Citizen Map</Link>
          {session?.user && (
            <Link href="/admin" className={styles.navLink}>Admin</Link>
          )}
        </div>

        <div className={styles.actions}>
          {status === 'loading' ? (
            <div className="btn-secondary">Loading...</div>
          ) : session?.user ? (
            <div className={styles.userProfile} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: 'rgba(0, 210, 255, 0.1)', padding: '5px 12px', borderRadius: '20px', border: '1px solid var(--primary)', color: 'var(--primary)', fontWeight: 'bold' }}>
                ⭐ {score} Pts
              </div>
              <button onClick={() => signOut()} className="btn-secondary" style={{ padding: '5px 12px', fontSize: '0.9rem' }}>Sign Out</button>
              {session.user.image && (
                <img src={session.user.image} alt={session.user.name || 'User'} className={styles.avatar} style={{ width: '35px', height: '35px', borderRadius: '50%' }} />
              )}
            </div>
          ) : (
            <Link href="/login" className="btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
      </nav>
    </div>
  );
}

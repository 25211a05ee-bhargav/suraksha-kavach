'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './Dashboard.module.css';
import { useScore } from '@/context/ScoreContext';

// In a real scenario, this data would come from the database based on the session
const mockLeaderboard = [
  { id: '1', name: 'Kavya Singh', score: 2450, school: 'IIT Bombay' },
  { id: '2', name: 'Aarav Patel', score: 2100, school: 'DPS RK Puram' },
  { id: '3', name: 'Riya Sharma', score: 1850, school: 'Modern School' },
  { id: '4', name: 'Vikram Mehta', score: 1400, school: 'BITS Pilani' },
  { id: '5', name: 'You', score: 750, school: 'KV JNU' },
];

export default function DashboardPage() {
  const { score, deductScore } = useScore();
  const router = useRouter();

  const handleVREnter = () => {
    router.push('/vr-simulations');
  };

  const handleRedeem = (itemName: string, cost: number) => {
    if (deductScore(cost)) {
      alert(`Success! You have redeemed the ${itemName}. ${cost} points have been deducted from your Aapda Score.`);
    } else {
      alert(`Insufficient points. You need ${cost - score} more points to unlock this reward.`);
    }
  };

  return (
    <div className={`container ${styles.dashboardContainer}`} style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem' }}>VR Simulation Lab</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Immersive First-Responder Training Environment</p>
      </header>

      <div className={styles.vrGrid}>
        {/* Aapda Score Tracker */}
        <div className={styles.vrCard}>
          <div className={styles.vrContent}>
            <h2 style={{ textAlign: 'center', color: 'var(--text-main)' }}>Your Aapda Score</h2>
            <div className={styles.scoreCircle}>
              <span className={styles.scoreValue}>{score}</span>
            </div>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Level: Intermediate Responder</p>
            <div style={{ marginTop: '30px', textAlign: 'center' }}>
              <button onClick={handleVREnter} className="btn-primary" style={{ width: '100%' }}>Enter VR Simulation</button>
            </div>
          </div>
        </div>

        {/* Reward Redemption */}
        <div className={styles.vrCard}>
          <div className={styles.vrContent}>
            <h2 style={{ color: 'var(--accent)' }}>Reward Redemption</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Exchange points for real-world benefits.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px' }}>
                <div className="flex-between">
                  <strong>NDRF Certification Course</strong>
                  <span style={{ color: 'var(--primary)' }}>2000 pts</span>
                </div>
                <button 
                  className={score >= 2000 ? "btn-primary" : "btn-secondary"} 
                  style={{ width: '100%', marginTop: '10px', padding: '8px', opacity: score >= 2000 ? 1 : 0.5 }} 
                  onClick={() => handleRedeem('NDRF Certification Course', 2000)}
                  disabled={score < 2000}
                >
                  {score >= 2000 ? 'Redeem Now' : 'Locked'}
                </button>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px' }}>
                <div className="flex-between">
                  <strong>Academic Credits (2.0)</strong>
                  <span style={{ color: 'var(--primary)' }}>1000 pts</span>
                </div>
                <button 
                  className={score >= 1000 ? "btn-primary" : "btn-secondary"} 
                  style={{ width: '100%', marginTop: '10px', padding: '8px', opacity: score >= 1000 ? 1 : 0.5 }} 
                  onClick={() => handleRedeem('Academic Credits (2.0)', 1000)}
                  disabled={score < 1000}
                >
                  {score >= 1000 ? 'Redeem Now' : 'Locked'}
                </button>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px' }}>
                <div className="flex-between">
                  <strong>Basic Rescue Kit</strong>
                  <span style={{ color: 'var(--primary)' }}>500 pts</span>
                </div>
                <button 
                  className={score >= 500 ? "btn-primary" : "btn-secondary"} 
                  style={{ width: '100%', marginTop: '10px', padding: '8px', opacity: score >= 500 ? 1 : 0.5 }} 
                  onClick={() => handleRedeem('Basic Rescue Kit', 500)}
                  disabled={score < 500}
                >
                  {score >= 500 ? 'Redeem Now' : 'Locked'}
                </button>
              </div>
              
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px' }}>
                <div className="flex-between">
                  <strong>Suraksha Kavach T-Shirt</strong>
                  <span style={{ color: 'var(--primary)' }}>300 pts</span>
                </div>
                <button 
                  className={score >= 300 ? "btn-primary" : "btn-secondary"} 
                  style={{ width: '100%', marginTop: '10px', padding: '8px', opacity: score >= 300 ? 1 : 0.5 }} 
                  onClick={() => handleRedeem('Suraksha Kavach T-Shirt', 300)}
                  disabled={score < 300}
                >
                  {score >= 300 ? 'Redeem Now' : 'Locked'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className={styles.vrCard} style={{ gridColumn: 'span auto' }}>
          <div className={styles.vrContent}>
            <h2>National Leaderboard</h2>
            <ul className={styles.leaderboardList}>
              {[...mockLeaderboard]
                .map(u => u.name === 'You' ? { ...u, score: score } : u)
                .sort((a, b) => b.score - a.score)
                .map((user, idx) => (
                <li key={user.id} className={styles.leaderboardItem} style={{ border: user.name === 'You' ? '1px solid var(--primary)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className={styles.rank}>#{idx + 1}</span>
                    <div>
                      <strong>{user.name}</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user.school}</div>
                    </div>
                  </div>
                  <strong style={{ color: 'var(--primary)' }}>{user.score}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

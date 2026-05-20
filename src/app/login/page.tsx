'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleMockLogin = async (role: string) => {
    const res = await signIn('credentials', {
      redirect: false,
      role: role,
    });

    if (res?.ok) {
      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)' }}>
      <div className="vr-container">
        <div className="glass-panel vr-element" style={{ padding: '50px', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
          <h1 className="text-gradient" style={{ marginBottom: '10px' }}>System Access</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Select your portal profile to enter the Suraksha Kavach network.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <button 
              className="btn-primary" 
              style={{ padding: '15px', fontSize: '1.2rem', width: '100%', background: '#fff', color: '#000', borderColor: '#ccc' }}
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: '20px', height: '20px', display: 'inline-block', verticalAlign: 'middle', marginRight: '10px' }} />
              Sign in with Google
            </button>

            <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
              <span style={{ padding: '0 10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>OR (Mock Access)</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
            </div>

            <button 
              className="btn-primary" 
              style={{ padding: '15px', fontSize: '1.2rem', width: '100%' }}
              onClick={() => handleMockLogin('student')}
            >
              Login as Student (VR Lab)
            </button>
            
            <button 
              className="btn-secondary" 
              style={{ padding: '15px', fontSize: '1.2rem', width: '100%' }}
              onClick={() => handleMockLogin('admin')}
            >
              Login as School Admin
            </button>
          </div>
          
          <p style={{ marginTop: '30px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            * This is a mocked authentication portal for the SIH prototype. No real credentials are required.
          </p>
        </div>
      </div>
    </div>
  );
}

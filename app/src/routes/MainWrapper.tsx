import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FormAnalysisHistory } from './FormAnalysisHistory';
import { Rounds } from './Rounds';

export function MainWrapper() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { currentUser, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="main-wrapper">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Custom App Bar */}
      <div className="custom-app-bar">
        <div className="app-bar-left">
          <button className="settings-btn" onClick={handleLogout}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </button>
        </div>
        <div className="app-bar-center">
          <div className="app-bar-title">
            <span className="title-icon">🥏</span>
            <h1>ScoreSensei</h1>
          </div>
        </div>
        <div className="app-bar-right">
          <div className="user-email">{currentUser?.email}</div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {selectedIndex === 0 && <Rounds />}
        {selectedIndex === 1 && <FormAnalysisHistory />}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bottom-nav-bar">
        <button
          className={`nav-item ${selectedIndex === 0 ? 'active' : ''}`}
          onClick={() => setSelectedIndex(0)}
        >
          <span className="nav-icon">🥏</span>
          <span className="nav-label">Rounds</span>
        </button>
        <button
          className={`nav-item ${selectedIndex === 1 ? 'active' : ''}`}
          onClick={() => setSelectedIndex(1)}
        >
          <span className="nav-icon">📹</span>
          <span className="nav-label">Form coach</span>
        </button>
      </div>
    </div>
  );
}

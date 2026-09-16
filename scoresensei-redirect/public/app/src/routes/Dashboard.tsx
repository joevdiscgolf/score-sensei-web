import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Dashboard() {
  const { currentUser, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      {/* Animated Background */}
      <div className="animated-background">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="user-profile">
            <img
              className="user-avatar"
              src={currentUser?.photoURL || 'https://via.placeholder.com/48'}
              alt="User"
            />
            <div className="user-info-text">
              <h3>Account</h3>
              <p>{currentUser?.email}</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Sign out
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="dashboard-content">
          <div className="info-card">
            <h3>🎉 Welcome to ScoreSensei!</h3>
            <p>
              Your account has been created successfully. To access the full ScoreSensei experience
              with all features, download our mobile app.
            </p>
            <p>The web dashboard is coming soon with stats, round history, and more!</p>
          </div>

          <div className="info-card">
            <h3>🎯 Form Analysis</h3>
            <p>
              View your disc golf form analysis videos and insights. Review checkpoint breakdowns,
              coaching tips, and track your form improvement over time.
            </p>
            <Link to="/form-analysis" className="primary-btn">
              View Form Analyses →
            </Link>
          </div>

          <div className="info-card">
            <h3>📱 Mobile App Features</h3>
            <p>
              • Voice-activated scoring
              <br />
              • AI-powered round analysis
              <br />
              • Detailed putting stats (C1X)
              <br />
              • Form analysis with video
              <br />
              • The Judge (brutally honest feedback)
              <br />• Shot pattern insights
            </p>
          </div>

          <div className="info-card">
            <h3>🔜 Coming to Web</h3>
            <p>
              • View your round history
              <br />
              • Access detailed statistics
              <br />
              • Share rounds with friends
              <br />
              • Course management
              <br />• Profile settings
            </p>
          </div>
        </div>

        {/* App Download Section */}
        <div className="app-download-section">
          <h2>Download ScoreSensei</h2>
          <p>Get the full experience on iOS and Android</p>
          <div className="store-buttons-dashboard">
            <a href="#" className="store-button-dashboard">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              App Store
            </a>
            <a href="#" className="store-button-dashboard">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              Google Play
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

// Toggle this to switch between landing page variants
const FORM_ANALYSIS_FOCUS = true;

export function Landing() {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [formAnalysisFocus, setFormAnalysisFocus] = useState(FORM_ANALYSIS_FOCUS);

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

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
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Main Content */}
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-top">
            <div className="logo-container">
              <img src="/assets/images/logo.png" alt="ScoreSensei" className="logo-icon" />
              <h1 className="logo-text">ScoreSensei</h1>
            </div>
            <div className="header-auth">
              {currentUser ? (
                <>
                  <div className="user-info">
                    <span>{currentUser.email}</span>
                  </div>
                  <button className="logout-link" onClick={handleLogout}>
                    Sign out
                  </button>
                </>
              ) : (
                <Link to="/login" className="login-link">
                  Sign in
                </Link>
              )}
            </div>
          </div>

          {/* Mode Toggle (for development) */}
          <button
            onClick={() => setFormAnalysisFocus(!formAnalysisFocus)}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              zIndex: 1000,
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              background: formAnalysisFocus ? '#9b59b6' : '#4ECDC4',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease',
            }}
          >
            {formAnalysisFocus ? 'Form Analysis Mode' : 'Full Features Mode'}
          </button>

          {formAnalysisFocus ? (
            <>
              <p className="tagline">Instant feedback on every throw</p>
              <p style={{
                color: '#6B7280',
                fontSize: '1.1rem',
                maxWidth: '600px',
                margin: '0 auto 1.5rem',
                lineHeight: 1.6
              }}>
                Pick a skill to work on, hit record, and throw. Get real-time coaching cues
                focused on exactly what you're trying to fix—no stopping, no reviewing, just reps and results.
              </p>
            </>
          ) : (
            <p className="tagline">See the story behind every throw</p>
          )}

          {/* Hero Store Buttons */}
          <div className="hero-store-buttons">
            <a href="#" className="store-button-hero app-store">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="button-text">
                <span className="small">Download on the</span>
                <span className="large">App Store</span>
              </div>
            </a>
            <a href="#" className="store-button-hero google-play">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="button-text">
                <span className="small">Get it on</span>
                <span className="large">Google Play</span>
              </div>
            </a>
          </div>
        </header>

        {/* Feature Cards */}
        {formAnalysisFocus ? (
          <div className="features">
            {/* Primary Feature - Live Form Analysis */}
            <div className="feature-card featured" style={{ ['--accent-color' as any]: '#9b59b6', gridColumn: 'span 2' }}>
              <div className="card-icon">🎥</div>
              <h3>Continuous Field Session Coaching</h3>
              <p>
                Keep the camera rolling during your entire practice session. Every throw gets analyzed in real-time—the
                moment your disc leaves your hand, you see the breakdown on screen and hear exactly what to fix.
                Visual overlays and voice coaching work together so you never have to stop and review footage.
                Just throw, listen, adjust, repeat.
              </p>
            </div>

            <div className="feature-card" style={{ ['--accent-color' as any]: '#5B7EFF' }}>
              <div className="card-icon">🎯</div>
              <h3>See It, Hear It, Fix It</h3>
              <p>On-screen highlights show where your form broke down while spoken cues tell you exactly how to correct it—all within seconds of each throw.</p>
            </div>

            <div className="feature-card" style={{ ['--accent-color' as any]: '#4ECDC4' }}>
              <div className="card-icon">📐</div>
              <h3>Form Checkpoints</h3>
              <p>Track critical moments in your throw: reach-back, power pocket, release point, and follow-through.</p>
            </div>

            <div className="feature-card" style={{ ['--accent-color' as any]: '#B8E986' }}>
              <div className="card-icon">📈</div>
              <h3>Progress Tracking</h3>
              <p>See your form scores improve over time. Identify patterns and track which corrections stick.</p>
            </div>

            <div className="feature-card" style={{ ['--accent-color' as any]: '#FF7F7F' }}>
              <div className="card-icon">🔍</div>
              <h3>Pro Comparison</h3>
              <p>See exactly how your mechanics differ from touring pros. Know where you're losing power or accuracy.</p>
            </div>

            {/* Secondary Feature - Round Analysis */}
            <div className="feature-card" style={{ ['--accent-color' as any]: '#e67e22', opacity: 0.9 }}>
              <div className="card-icon">📊</div>
              <h3>Round Tracking</h3>
              <p>Voice-scored rounds with deep stats and round stories when you're on the course.</p>
            </div>
          </div>
        ) : (
          <div className="features">
            <div className="feature-card" style={{ ['--accent-color' as any]: '#4ECDC4' }}>
              <div className="card-icon">📊</div>
              <h3>Voice scoring</h3>
              <p>Record your rounds hands-free with voice commands. Focus on your game, not the scorecard.</p>
            </div>

            <div className="feature-card" style={{ ['--accent-color' as any]: '#5B7EFF' }}>
              <div className="card-icon">🎯</div>
              <h3>C1X putting stats</h3>
              <p>Track your putting performance in Circle 1 Extended (11-33 feet) with detailed analytics.</p>
            </div>

            <div className="feature-card" style={{ ['--accent-color' as any]: '#B8E986' }}>
              <div className="card-icon">📖</div>
              <h3>Round stories</h3>
              <p>Get AI-generated narratives of your rounds highlighting key moments and turning points.</p>
            </div>

            <div className="feature-card" style={{ ['--accent-color' as any]: '#FF7F7F' }}>
              <div className="card-icon">⚖️</div>
              <h3>The Judge</h3>
              <p>Receive brutally honest feedback on your performance. Can you handle the truth?</p>
            </div>

            <div className="feature-card" style={{ ['--accent-color' as any]: '#9b59b6' }}>
              <div className="card-icon">🎥</div>
              <h3>Form analysis</h3>
              <p>Upload videos of your throws to get AI-powered form feedback and improvement tips.</p>
            </div>

            <div className="feature-card" style={{ ['--accent-color' as any]: '#e67e22' }}>
              <div className="card-icon">🥏</div>
              <h3>Shot patterns</h3>
              <p>Discover your throwing tendencies and identify areas for improvement with detailed shot analysis.</p>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="cta-section">
          {formAnalysisFocus ? (
            <>
              <h2>Your next field session just got smarter</h2>
              <p className="cta-description">
                Set up your phone, hit record, and get coached on every throw
              </p>
            </>
          ) : (
            <>
              <h2>Ready to level up your disc golf game?</h2>
              <p className="cta-description">Join thousands of players improving their skills with ScoreSensei</p>
            </>
          )}
          <div className="store-buttons">
            <a href="#" className="store-button app-store">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="button-text">
                <span className="small">Download on the</span>
                <span className="large">App Store</span>
              </div>
            </a>
            <a href="#" className="store-button google-play">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="button-text">
                <span className="small">Get it on</span>
                <span className="large">Google Play</span>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2024 ScoreSensei. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <span>•</span>
            <a href="#">Terms of Service</a>
            <span>•</span>
            <a href="#">Contact</a>
          </div>
        </footer>
      </div>
    </>
  );
}

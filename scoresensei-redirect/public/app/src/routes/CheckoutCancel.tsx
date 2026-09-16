import { Link } from 'react-router-dom';

export function CheckoutCancel() {
  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Cancel Icon */}
        <div className="checkout-icon cancel">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>

        <h1>Checkout cancelled</h1>

        <p className="checkout-message">
          No worries! Your subscription was not processed. You can try again whenever you're ready.
        </p>

        <div className="checkout-info">
          <h3>What you're missing:</h3>
          <div className="info-list">
            <div className="info-item">
              <span className="info-icon">🎥</span>
              <span>Unlimited form analyses</span>
            </div>
            <div className="info-item">
              <span className="info-icon">🎯</span>
              <span>Real-time coaching feedback</span>
            </div>
            <div className="info-item">
              <span className="info-icon">📊</span>
              <span>Pro comparison overlays</span>
            </div>
            <div className="info-item">
              <span className="info-icon">📈</span>
              <span>Advanced statistics & tracking</span>
            </div>
          </div>
        </div>

        <div className="checkout-actions">
          <div className="app-buttons">
            <a href="scoresensei://subscription/cancel" className="primary-button">
              Return to App
            </a>
          </div>

          <p className="help-text">
            Questions? <a href="mailto:support@scoresensei.app">Contact support</a>
          </p>

          <p className="web-fallback">
            <Link to="/">Back to ScoreSensei home</Link>
          </p>
        </div>
      </div>

      <style>{`
        .checkout-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%);
          padding: 20px;
        }

        .checkout-container {
          max-width: 480px;
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 48px 32px;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .checkout-icon {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }

        .checkout-icon.cancel {
          background: linear-gradient(135deg, #6B7280 0%, #4B5563 100%);
          color: white;
          box-shadow: 0 8px 32px rgba(107, 114, 128, 0.3);
        }

        .checkout-page h1 {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 16px;
        }

        .checkout-message {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .checkout-info {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
          text-align: left;
        }

        .checkout-info h3 {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
        }

        .info-icon {
          font-size: 1.2rem;
        }

        .checkout-actions {
          margin-top: 24px;
        }

        .app-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .primary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 32px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .primary-button:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .help-text {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
          margin-bottom: 16px;
        }

        .help-text a {
          color: #9b59b6;
          text-decoration: none;
        }

        .help-text a:hover {
          text-decoration: underline;
        }

        .web-fallback {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
        }

        .web-fallback a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
        }

        .web-fallback a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

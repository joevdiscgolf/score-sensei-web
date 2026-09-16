import { Link, useSearchParams } from 'react-router-dom';

export function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Success Icon */}
        <div className="checkout-icon success">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        <h1>Welcome to Pro!</h1>

        <p className="checkout-message">
          Your subscription is now active. You have unlimited access to all premium features.
        </p>

        <div className="checkout-details">
          <div className="detail-item">
            <span className="detail-icon">✓</span>
            <span>Unlimited form analyses</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">✓</span>
            <span>Real-time coaching feedback</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">✓</span>
            <span>Pro comparison overlays</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">✓</span>
            <span>Advanced statistics</span>
          </div>
        </div>

        <div className="checkout-actions">
          <p className="return-message">
            Return to the ScoreSensei app to start using your Pro features.
          </p>

          <div className="app-buttons">
            <a href="scoresensei://subscription/success" className="primary-button">
              Open ScoreSensei App
            </a>
          </div>

          <p className="web-fallback">
            Don't have the app? <Link to="/">Download it here</Link>
          </p>
        </div>

        {sessionId && (
          <p className="session-id">
            Confirmation: {sessionId.substring(0, 20)}...
          </p>
        )}
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

        .checkout-icon.success {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: white;
          box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
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

        .checkout-details {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1rem;
        }

        .detail-item:not(:last-child) {
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .detail-icon {
          color: #10B981;
          font-weight: 600;
        }

        .checkout-actions {
          margin-top: 24px;
        }

        .return-message {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
          margin-bottom: 20px;
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
          background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
          color: white;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(155, 89, 182, 0.3);
        }

        .primary-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(155, 89, 182, 0.4);
        }

        .web-fallback {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
        }

        .web-fallback a {
          color: #9b59b6;
          text-decoration: none;
        }

        .web-fallback a:hover {
          text-decoration: underline;
        }

        .session-id {
          margin-top: 24px;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.3);
          font-family: monospace;
        }
      `}</style>
    </div>
  );
}

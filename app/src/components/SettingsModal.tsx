import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { deleteUserAccount } from '../services/userApi';
import { SenseiColors } from '../utils/colors';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ConfirmStep = 'none' | 'first' | 'final';

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { currentUser, signOut } = useAuth();
  const [confirmStep, setConfirmStep] = useState<ConfirmStep>('none');
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      await signOut();
      onClose();
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const handleDeleteClick = () => {
    setConfirmStep('first');
    setError(null);
  };

  const handleFirstConfirm = () => {
    setConfirmStep('final');
  };

  const handleFinalConfirm = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await deleteUserAccount();
      // Account deleted, sign out and close
      await signOut();
      onClose();
    } catch (err) {
      console.error('Error deleting account:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to delete account. Please try again.'
      );
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setConfirmStep('none');
    setError(null);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && confirmStep === 'none') {
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '16px',
      }}
      onClick={handleOverlayClick}
    >
      <div
        style={{
          backgroundColor: SenseiColors.white,
          borderRadius: '16px',
          maxWidth: '420px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: `1px solid ${SenseiColors.gray[200]}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: 600,
              color: SenseiColors.darkGray,
            }}
          >
            Settings
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={SenseiColors.gray[400]}
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* User Info */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px',
              padding: '16px',
              backgroundColor: SenseiColors.gray[50],
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: SenseiColors.cleanAccentColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: SenseiColors.white,
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  color: SenseiColors.gray[500],
                }}
              >
                Signed in as
              </p>
              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: SenseiColors.darkGray,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {currentUser?.email}
              </p>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '14px 20px',
              backgroundColor: SenseiColors.gray[100],
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 500,
              color: SenseiColors.darkGray,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '16px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = SenseiColors.gray[200])
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = SenseiColors.gray[100])
            }
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16,17 21,12 16,7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>

          {/* Divider */}
          <div
            style={{
              height: '1px',
              backgroundColor: SenseiColors.gray[200],
              margin: '24px 0',
            }}
          />

          {/* Danger Zone */}
          <div>
            <h3
              style={{
                margin: '0 0 12px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#DC2626',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Danger Zone
            </h3>

            {confirmStep === 'none' && (
              <>
                <p
                  style={{
                    margin: '0 0 16px',
                    fontSize: '14px',
                    color: SenseiColors.gray[500],
                    lineHeight: '1.5',
                  }}
                >
                  Permanently delete your account and all associated data
                  including rounds, form analyses, and putt sessions.
                </p>
                <button
                  onClick={handleDeleteClick}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    backgroundColor: 'transparent',
                    border: '2px solid #DC2626',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#DC2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#DC2626';
                    e.currentTarget.style.color = SenseiColors.white;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#DC2626';
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                  Delete Account
                </button>
              </>
            )}

            {confirmStep === 'first' && (
              <div
                style={{
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <h4
                  style={{
                    margin: '0 0 12px',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#991B1B',
                  }}
                >
                  Are you sure?
                </h4>
                <p
                  style={{
                    margin: '0 0 20px',
                    fontSize: '14px',
                    color: '#7F1D1D',
                    lineHeight: '1.5',
                  }}
                >
                  This will permanently delete your account and all your data.
                  This action cannot be undone.
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={handleCancel}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      backgroundColor: SenseiColors.white,
                      border: `1px solid ${SenseiColors.gray[300]}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: SenseiColors.darkGray,
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFirstConfirm}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      backgroundColor: '#DC2626',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: SenseiColors.white,
                    }}
                  >
                    Yes, Continue
                  </button>
                </div>
              </div>
            )}

            {confirmStep === 'final' && (
              <div
                style={{
                  backgroundColor: '#FEF2F2',
                  border: '2px solid #DC2626',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <h4
                  style={{
                    margin: '0 0 12px',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#991B1B',
                  }}
                >
                  Final Confirmation
                </h4>
                <p
                  style={{
                    margin: '0 0 8px',
                    fontSize: '14px',
                    color: '#7F1D1D',
                    lineHeight: '1.5',
                  }}
                >
                  You are about to permanently delete:
                </p>
                <ul
                  style={{
                    margin: '0 0 20px',
                    paddingLeft: '20px',
                    fontSize: '14px',
                    color: '#7F1D1D',
                    lineHeight: '1.7',
                  }}
                >
                  <li>Your user profile</li>
                  <li>All recorded rounds</li>
                  <li>All form analysis videos and data</li>
                  <li>All putt practice sessions</li>
                </ul>

                {error && (
                  <div
                    style={{
                      marginBottom: '16px',
                      padding: '12px',
                      backgroundColor: '#FEE2E2',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#991B1B',
                    }}
                  >
                    {error}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={handleCancel}
                    disabled={isDeleting}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      backgroundColor: SenseiColors.white,
                      border: `1px solid ${SenseiColors.gray[300]}`,
                      borderRadius: '8px',
                      cursor: isDeleting ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: SenseiColors.darkGray,
                      opacity: isDeleting ? 0.5 : 1,
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFinalConfirm}
                    disabled={isDeleting}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      backgroundColor: '#991B1B',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: isDeleting ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: SenseiColors.white,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    {isDeleting ? (
                      <>
                        <span
                          style={{
                            width: '16px',
                            height: '16px',
                            border: '2px solid rgba(255,255,255,0.3)',
                            borderTopColor: 'white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                          }}
                        />
                        Deleting...
                      </>
                    ) : (
                      'Delete Forever'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Keyframe animation for spinner */}
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

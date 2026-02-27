import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Landing } from './routes/Landing';
import { Login } from './routes/Login';
import { Signup } from './routes/Signup';
import { MainWrapper } from './routes/MainWrapper';
import { FormAnalysisDetail } from './routes/FormAnalysisDetail';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainWrapper />
              </ProtectedRoute>
            }
          />
          <Route
            path="/form-analysis/:id"
            element={
              <ProtectedRoute>
                <FormAnalysisDetail />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

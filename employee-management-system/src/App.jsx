import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import { useAuth } from './hooks/useAuth'
const App = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Employee Management System</h1>
      <Routes>
        <Route
          path="/"
          element={<LoginPage />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}
export default App
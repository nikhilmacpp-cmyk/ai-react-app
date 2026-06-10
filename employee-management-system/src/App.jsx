import {useSelector,useDispatch} from 'react-redux';
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import {useAuth} from './hooks/useAuth'
const App = () =>{
  const {isAuthenticated} = useAuth();
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Employee Management System</h1>
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <LoginPage />
      )}
    </div>
  )
}
export default App
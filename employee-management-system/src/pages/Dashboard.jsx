import {useSelector,useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import {logout} from '../features/auth/authSlice'
import {useAuth} from '../hooks/useAuth'
const Dashboard = ()=> {
  const {user} = useAuth()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () =>{
    dispatch(logout())
    navigate("/");
  }
  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Welcome {user?.name}</h3>
      <button onClick={()=>handleLogout()}>Logout</button>
    </div>
  );
}

export default Dashboard;
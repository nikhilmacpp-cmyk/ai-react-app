import {useSelector,useDispatch} from 'react-redux';
import {logout} from '../features/auth/authSlice'
import {useAuth} from '../hooks/useAuth'
const Dashboard = ()=> {
  const {user} = useAuth()
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Welcome {user?.name}</h3>
      <button onClick={()=>dispatch(logout())}>Logout</button>
    </div>
  );
}

export default Dashboard;
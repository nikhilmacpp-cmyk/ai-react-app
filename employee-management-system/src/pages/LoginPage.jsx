import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

function LoginPage() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    if(name?.length)dispatch(login({ name }));
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;
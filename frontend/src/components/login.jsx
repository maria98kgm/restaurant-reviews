import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    props.login(user);
    navigate("/");
  };

  return (
    <div className="submit-form" style={{ maxWidth: "380px" }}>
      <div>
        <div className="form-group mb-3">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            className="form-control mt-1"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control mt-1"
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
          />
        </div>

        <button onClick={login} className="btn btn-success" style={{ marginTop: "2rem" }}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

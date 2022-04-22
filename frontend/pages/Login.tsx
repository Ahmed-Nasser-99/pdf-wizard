import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isUser, setIsUser] = React.useState(
    localStorage.getItem("userId") ? true : false
  );
  const navigate = useNavigate();

  useEffect(() => {
    isUser && navigate("/");
  }, [isUser, navigate]);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });
      setError("");

      localStorage.setItem("token", data.data.data.token);
      localStorage.setItem("userId", data.data.data.user._id);
      setIsUser(true);
      navigate("/");
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      {error && <p className="alert alert-danger">{error}</p>}
      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary my-2">
        Submit
      </button>
    </form>
  );
}

export default Login;

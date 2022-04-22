import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [loading, setLoading] = React.useState(false);

  const [isUser, setIsUser] = React.useState(
    localStorage.getItem("userId") ? true : false
  );
  const navigate = useNavigate();

  useEffect(() => {
    isUser && navigate("/");
  }, [isUser, navigate]);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [name, setName] = React.useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const data = await axios.post(
        "https://pdfwizard.herokuapp.com/api/users/register",
        {
          email,
          password,
          name,
        }
      );
      setLoading(false);
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
      {loading && <p className="alert alert-info">Loading...</p>}
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
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
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
      <div className="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

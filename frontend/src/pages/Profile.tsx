import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const [isUser] = React.useState(
    localStorage.getItem("userId") ? true : false
  );
  useEffect(() => {
    !isUser && navigate("/login");
  }, [isUser, navigate]);

  React.useEffect(() => {
    document.title = "Profile";
    axios
      .get("http://localhost:8080/api/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.user);
        loading && setLoading(false);
        setUser(res.data.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loading]);
  return (
    <>
      {loading ? (
        <div className="d-flex">
          <div
            className="spinner-border text-primary "
            role="status"
            style={{ width: "5rem", height: "5rem", margin: "auto" }}
          ></div>
        </div>
      ) : (
        <>
          <h1>
            Update My Data <code>You Uploaded {user.noOfDocs} File</code>
          </h1>
          <form>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={user?.email}
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
                placeholder="Enter email"
                value={user?.name}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>

            <button type="submit" className="btn btn-primary my-2">
              Submit
            </button>
          </form>
        </>
      )}
    </>
  );
}

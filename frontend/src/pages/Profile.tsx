import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
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
      .get("https://pdfwizard.herokuapp.com/api/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
      loading && setLoading(false);
      setUser(res.data.data.user);
      setName(res.data.data.user.name)
      setEmail(res.data.data.user.email)
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={name}
                onChange={(e) => setName(e.target.value)}

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
                onChange={(e) => setPassword(e.target.value)}

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
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary my-2" onClick={(e) => {
              e.preventDefault();
              if (password === confirmPassword) {
                setLoading(true);
                axios
                  .put(
                    "https://pdfwizard.herokuapp.com/api/users/" + user._id,
                    {
                      name,
                      email,
                      password,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    }
                  )
                  .then((res) => {
                    setLoading(false);
                    setUser(res.data.data.user);
                    setName(res.data.data.user.name)
                    setEmail(res.data.data.user.email)
                    setPassword("")
                    setConfirmPassword("")
                  })
                  

            }}}>
              Submit
            </button>
          </form>
        </>
      )}
    </>
  );
}

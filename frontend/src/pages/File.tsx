import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function File() {
  const { id } = useParams();
  const [file, setFile] = React.useState<any>();
  const [description, setDescription] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const [isUser] = React.useState(
    localStorage.getItem("userId") ? true : false
  );
  useEffect(() => {
    !isUser && navigate("/login");
  }, [isUser, navigate]);

  useEffect(() => {
    try {
      axios
        .get(`https://pdfwizard.herokuapp.com/api/files/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setFile(res.data.data);
          setDescription(res.data.data.description);
          setName(res.data.data.name);
        });
    } catch (error: any) {
      console.log(error.response.data.message);
      alert("error");
      setError(error.response.data.message);
    }
  }, [id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(
        "https://pdfwizard.herokuapp.com/api/files/" + file.id,
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setFile(res.data.data);
      });
  };
  return (
    <div>
      <h1>
        <code>Update My File</code>
        {error && <p className="alert alert-danger">{error}</p>}
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>File Name</label>
          <input
            type="text"
            className="form-control my-3"
            id="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>File Description</label>
          <input
            type="text"
            className="form-control my-3"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

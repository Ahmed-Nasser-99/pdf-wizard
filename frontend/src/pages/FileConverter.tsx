import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function FileConverter() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [description, setDescription] = React.useState("true");
  const [file, setFile] = React.useState<any>("");
  const [isUser] = React.useState(
    localStorage.getItem("userId") ? true : false
  );
  React.useEffect(() => {
    !isUser && navigate("/login");
  }, [isUser, navigate]);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const data = new FormData(e.currentTarget);
      data.append("file", e.currentTarget.file.value);
      data.append("description", description);
      const resData = await axios.post(
        "https://pdfwizard.herokuapp.com/api/files/convert",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      navigate(`/myfiles`);
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };
  return (
    <>
      <code className="display-6">Upload Doc or PPTX to be Converted</code>
      <form onSubmit={onSubmit}>
        {error && <p className="alert alert-danger my-3">{error}</p>}
        {loading && <p className="alert alert-info my-3">Loading...</p>}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <label htmlFor="file">File</label>
          <input
            type="file"
            className="form-control"
            id="file"
            placeholder="Enter file"
            value={file}
            name="file"
            onChange={(event: any) => setFile(event.target.file)}
          />
          <button type="submit" className="btn btn-primary my-3">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default FileConverter;

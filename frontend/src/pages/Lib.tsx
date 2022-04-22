import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Lib() {
  const [files, setFiles] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);

  const navigate = useNavigate();
  const [isUser] = React.useState(
    localStorage.getItem("userId") ? true : false
  );
  useEffect(() => {
    !isUser && navigate("/login");
  }, [isUser, navigate]);

  useEffect(() => {
    let data;
    axios
      .get("https://pdfwizard.herokuapp.com/api/files", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res: any) => {
        setLoading(false);
        setFiles(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(data);
  }, [isUser, navigate]);

  const [file, setFile] = React.useState<any>();
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      console.log(e.currentTarget.file.value);
      const data = new FormData(e.currentTarget);
      data.append("file", e.currentTarget.file.value);
      data.append("description", description);
      const resData = await axios.post(
        "https://pdfwizard.herokuapp.com/api/files",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(resData.data.data);
      setFiles((currFiles: any[]) => [...currFiles, resData.data.data]);
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <div>
        <div className="col-md-6">
          <code className="display-6">Welcome to my Library</code>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quidem.
          </p>
        </div>
        <form onSubmit={onSubmit}>
          {error && <p className="alert alert-danger">{error}</p>}

          <div className="form-group">
            <h2>Upload File</h2>
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
      </div>
      <div className="d-flex flex-wrap justify-content-center ">
        {files.map((file: any) => (
          <div className="card my-3 mx-2 w-30 w-md-100 " key={file.id}>
            <div className="card-body">
              <div className="card-title">{file.name}</div>
              <img
                className="w-100 m-auto"
                style={{ height: "250px" }}
                src="/pdfimage.png"
                alt=""
                loading="lazy"
              />
              <p className="card-text">{file.description}</p>
              <a
                href={file.link}
                className="card-link btn btn-primary"
                download={true}
                target="_blank"
              >
                Download
              </a>
              <div
                className="card-link btn btn-danger"
                onClick={async () => {
                  try {
                    await axios.delete(
                      `https://pdfwizard.herokuapp.com/api/files/${file._id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    );
                    setFiles((currFiles: any[]) =>
                      currFiles.filter(
                        (currFile: any) => currFile._id !== file._id
                      )
                    );
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Delete
              </div>
              <div
                className="card-link btn btn-secondary"
                onClick={() => {
                  navigate(`/files/${file._id}`);
                }}
              >
                Update
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div
            className="spinner-border text-primary m-auto my-5"
            role="status"
          ></div>
        )}
      </div>
    </>
  );
}

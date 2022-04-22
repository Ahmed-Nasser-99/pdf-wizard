import React from "react";

export default function Footer() {
  return (
    <div className="footer w-100 text-center bg-secondary p-2 text-light d-flex justify-content-center align-items-center">
      <div>
        <div style={{ fontSize: "20px" }}>
          Go To Our Github Repo
          <span className="mx-4">
            <i className="fab fa-github"></i>
          </span>
        </div>
      </div>
    </div>
  );
}

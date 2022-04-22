import React from "react";

export default function Footer() { 

  return (
    <div className="footer w-100 text-center bg-secondary p-2 text-light d-flex justify-content-center align-items-center">
      <div>
        <a
          href="https://github.com/Ahmed-Nasser-99/pdf-wizard"
          style={{ color: "white", textDecoration: "none" }}
          target="_blank"
          rel="noreferrer"
        >
          <div style={{ fontSize: "20px" }}>
            Go To Our Github Repo
            <span className="mx-4">
              <i className="fab fa-github"></i>
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}

import React from "react";

export default function Home() {
  const [isUser] = React.useState(
    localStorage.getItem("userId") ? true : false
  );
  return (
    <div>
      <code className="display-5">Welcome To PDF WIZARD</code>
      <p>This is a simple tool to upload PDF files from your HTML.</p>
      <div>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
      {!isUser && (
        <>
          <a href="./login.html" className="btn btn-primary ">
            Login
          </a>
          <a href="./register.html" className="btn btn-primary mx-2">
            Register
          </a>
        </>
      )}
    </div>
  );
}

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import FileConverter from "./pages/FileConverter";
import Header from "./components/Header";
import File from "./pages/File";
import Home from "./pages/Home";
import Lib from "./pages/Lib";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="content p-5 bg-light my-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myfiles" element={<Lib />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/files/:id" element={<File />} />
          <Route path="/converter" element={<FileConverter />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

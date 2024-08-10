import { useState } from "react";
import "./App.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Routes, Route } from "react-router-dom";
import Home from "./compent/Home";
import Comment from "./compent/Comment";
import Users from "./compent/Users";
import Profil from "./compent/Profil";
import First from "./compent/First";
import Login from "./compent/Login";
import Register from "./compent/Register";
// context posts
import PostsProvider from "./context/ContextPosts";
import Newpost from "./compent/Newpost";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1dcaff",
      },
      secondary: {
        main: "#ff0050",
      },
    },
  });

  return (
    <>
      <PostsProvider>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/commenter" element={<Comment />} />
            <Route path="/profile" element={<Profil />} />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<First />} />
            <Route path="/register" element={<Register />} />
            <Route path="/newPost" element={<Newpost />} />
          </Routes>
        </ThemeProvider>
      </PostsProvider>
    </>
  );
}

export default App;

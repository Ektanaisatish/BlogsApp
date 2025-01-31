import React from "react";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store";
import { Toaster } from "react-hot-toast";

function App() {
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispath(authActions.login());
    }
  }, [dispath]);

  return (
    <React.Fragment>
      <header></header>
      <main>
        <Header />
        <Routes>
          {!isLoggedIn ? (
            <Route path="/auth" element={<Auth />} />
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />
              <Route path="/blogs/add" element={<AddBlog />} />
            </>
          )}
        </Routes>
      </main>
      <Toaster />
    </React.Fragment>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { API_BASE_URL, USER_BLOGS_ENDPOINT } from "../config/Constants";
const UserBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`${API_BASE_URL}${USER_BLOGS_ENDPOINT}/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data, "data");
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);
  console.log(user);
  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  );
};

export default UserBlogs;

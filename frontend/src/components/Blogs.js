import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import { getblogs } from "../redux/Actions";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page starts from 1

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(getblogs);
        const data = res.data;
        return data;
      } catch (err) {
        console.log(err);
        return null;
      }
    };

    fetchBlogs().then((data) => {
      if (data && data.blogs) {
        setBlogs(data.blogs);
      }
    });
  }, []);

  console.log(blogs);

  const itemsPerPage = 5; // Number of blogs per page
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBlogs = blogs.slice(startIndex, endIndex);

  // theme for Pagination buttons
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 700, 
            fontSize: '1.2rem', 
            color: 'red', 
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: "pink", color: "green", padding: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          {displayedBlogs.map((blog, index) => (
            <Blog
              key={index}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog.title}
              description={blog.description}
              imageURL={blog.image}
              userName={blog.user.name}
              style={{ marginBottom: "10px" }} 
            />
          ))}
        </div>
        <Stack spacing={5} direction="row" justifyContent="center">
          <Pagination
            count={totalPages}
            shape="rounded"
            page={currentPage}
            onChange={handlePageChange}
            style={{ color: "yellow" }} 
          />
        </Stack>
      </div>
    </ThemeProvider>
  );
};

export default Blogs;

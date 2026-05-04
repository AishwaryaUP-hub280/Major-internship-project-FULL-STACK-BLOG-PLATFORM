import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  // Fetch all posts
  useEffect(() => {
    axios.get("http://localhost:5000/api/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, []);

  // Delete post
  const deletePost = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: token
        }
      });

      // remove deleted post from UI
      setPosts(posts.filter(post => post._id !== id));

    } catch (err) {
      alert("Error deleting post");
    }
  };

  return (
    <div>
      <h1>All Blogs</h1>

      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map(post => (
          <div
            key={post._id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px"
            }}
          >
            <h2>{post.title}</h2>
            <p>{post.content}</p>

            <p><b>Tags:</b> {post.tags?.join(", ")}</p>
            <p><b>Likes:</b> {post.likes}</p>

            <p>
              <b>Date:</b>{" "}
              {new Date(post.createdAt).toLocaleString()}
            </p>

            <button onClick={() => deletePost(post._id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
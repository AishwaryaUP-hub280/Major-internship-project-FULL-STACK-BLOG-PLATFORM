import axios from "axios";
import { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/posts",
        { title, content },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Post Created");

    } catch {
      alert("Error creating post");
    }
  };

  return (
    <form onSubmit={createPost}>
      <h2>Create Post</h2>

      <input
        placeholder="Title"
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        onChange={e => setContent(e.target.value)}
      />

      <button type="submit">Create</button>
    </form>
  );
}
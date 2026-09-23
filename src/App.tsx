import { useState } from "react";
import { posts } from "./data/posts";
import type { Post } from "./data/posts";
import type { Comment } from "./types";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PostList from "./components/PostList";
import "./App.css";

function App() {
  // App owns the state
  const [selectedPost, setSelectedPost] = useState<Post>(posts[0]);
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [lastCommenter, setLastCommenter] = useState("");

  // CommentForm will call this later
  const addComment = (name: string, text: string) => {
    const newComment: Comment = {
      id: Date.now(),
      name,
      text,
      date: new Date().toLocaleString(),
    };

    setComments((prev) => ({
      ...prev,
      [selectedPost.id]: [...(prev[selectedPost.id] || []), newComment],
    }));
    setLastCommenter(name);
  };

  // comments for the selected post only
  const postComments = comments[selectedPost.id] || [];

  return (
    <div>
      <Navbar />
      <Hero />

      <PostList
        posts={posts}
        selectedId={selectedPost.id}
        onSelect={setSelectedPost}
      />

      <h2>Selected: {selectedPost.title}</h2>
      <p>Comments on this post: {postComments.length}</p>
      <p>Last commenter: {lastCommenter}</p>

      <button onClick={() => addComment("Test", "This is a test comment")}>
        Add test comment
      </button>
    </div>
  );
}

export default App;
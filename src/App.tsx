import { useState } from "react";
import { posts } from "./data/posts";
import type { Post } from "./data/posts";
import type { Comment } from "./types";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
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
    <div className="app">
      <Navbar />

      <main className="container">
        <Hero />

        <div className="layout">
          {/* Left column */}
          <PostList
            posts={posts}
            selectedId={selectedPost.id}
            onSelect={setSelectedPost}
          />

          {/* Right column (sidebar) */}
          <aside className="sidebar">
            <PostDetail post={selectedPost} />

            <div className="widget">
              <h3>Comments</h3>
              {/* GROUPMATE: CommentList + CommentForm go here */}
              <p>Comments on this post: {postComments.length}</p>
              <p>Last commenter: {lastCommenter}</p>
              <button onClick={() => addComment("Test", "This is a test comment")}>
                Add test comment
              </button>
            </div>

            <div className="widget">
              <h3>Categories</h3>
              {/* GROUPMATE: CategoryList goes here */}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;
import { useState } from "react";
import { posts } from "./data/posts";
import type { Post } from "./data/posts";
import type { Comment } from "./types";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";

import CommentList from "./components/CommentList";
import CommentForm from "./components/CommentForm";
import CategoryList from "./components/CategoryList";

import "./App.css";

function App() {
  const [selectedPost, setSelectedPost] = useState<Post>(posts[0]);

  const [comments, setComments] = useState<Record<number, Comment[]>>({});

  const [lastCommenter, setLastCommenter] = useState("");

  const addComment = (name: string, text: string) => {
    const newComment: Comment = {
      id: Date.now(),
      name,
      text,
      date: new Date().toLocaleString(),
    };

    setComments((prev) => ({
      ...prev,
      [selectedPost.id]: [
        ...(prev[selectedPost.id] || []),
        newComment,
      ],
    }));

    setLastCommenter(name);
  };

  const postComments = comments[selectedPost.id] || [];

  const categories = [
    ...new Set(posts.map((post) => post.category)),
  ];

  return (
    <div className="app">
      <Navbar />

      <main className="container">
        <Hero />

        <div className="layout">
          <PostList
            posts={posts}
            selectedId={selectedPost.id}
            onSelect={setSelectedPost}
          />

          <aside className="sidebar">
            <PostDetail post={selectedPost} />

            <div className="widget">
              <h3>Comments</h3>

              <CommentList comments={postComments} />

              {lastCommenter && (
                <p className="last-commenter">
                  Last commenter: {lastCommenter}
                </p>
              )}

              <CommentForm onAddComment={addComment} />
            </div>

            <div className="widget">
              <h3>Categories</h3>

              <CategoryList categories={categories} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;
import { useEffect, useState } from "react";
import type { Comment, Post, PostsResponse } from "./types";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";

import CommentList from "./components/CommentList";
import CommentForm from "./components/CommentForm";
import CategoryList from "./components/CategoryList";

import "./App.css";

function App() {
  // Posts now come from the API
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Loading + error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [lastCommenter, setLastCommenter] = useState("");

  // Runs ONCE when the app loads (because of [])
  useEffect(() => {
    fetch("https://dummyjson.com/posts?limit=10")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then((data: PostsResponse) => {
        setPosts(data.posts);
        setSelectedPost(data.posts[0]); // first post selected by default
      })
      .catch(() => {
        setError("Unable to load blog posts. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addComment = (name: string, text: string) => {
    if (!selectedPost) return;

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

  const postComments = selectedPost ? comments[selectedPost.id] || [] : [];

  // Categories now come from the API tags (Parwinder will improve this)
  const categories = [...new Set(posts.flatMap((post) => post.tags))];

  return (
    <div className="app">
      <Navbar />

      <main className="container">
        <Hero />

        <div className="layout">
          {/* Left column: loading, error, or posts */}
          <section>
            {loading && <p className="status">Loading posts...</p>}

            {error && <p className="status error">{error}</p>}

            {!loading && !error && (
              <PostList
                posts={posts}
                selectedId={selectedPost?.id ?? 0}
                onSelect={setSelectedPost}
              />
            )}
          </section>

          {/* Right column (sidebar) */}
          <aside className="sidebar">
            {selectedPost && <PostDetail post={selectedPost} />}

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
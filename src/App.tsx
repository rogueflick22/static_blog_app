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

// Type for comments coming from DummyJSON
type ApiComment = {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
};

type CommentsResponse = {
  comments: ApiComment[];
  total: number;
  skip: number;
  limit: number;
};

function App() {
  // =========================
  // POSTS STATE
  // =========================

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Loading + error states for posts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // COMMENTS STATE
  // =========================

  // Comments coming from API
  const [comments, setComments] = useState<Record<number, Comment[]>>({});

  // Comments added by the user
  const [userComments, setUserComments] = useState<
    Record<number, Comment[]>
  >({});

  const [lastCommenter, setLastCommenter] = useState("");

  // =========================
  // CATEGORY STATE
  // =========================

  const [selectedTag, setSelectedTag] = useState("All");

  // =========================
  // FETCH POSTS
  // =========================

  // Runs ONCE when the application loads because of []
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

        // Select first post automatically
        if (data.posts.length > 0) {
          setSelectedPost(data.posts[0]);
        }
      })
      .catch(() => {
        setError("Unable to load blog posts. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // =========================
  // FETCH COMMENTS
  // =========================

  // Runs whenever selectedPost changes
  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    fetch(
      `https://dummyjson.com/posts/${selectedPost.id}/comments`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load comments");
        }

        return response.json();
      })
      .then((data: CommentsResponse) => {
        // Convert API comments to our Comment type
        const apiComments: Comment[] = data.comments.map(
          (comment) => ({
            id: comment.id,
            name: comment.user.fullName,

            // DummyJSON comments do not provide email
            email: "",

            text: comment.body,
            date: "API Comment",
          })
        );

        // Save comments for the selected post
        setComments((prev) => ({
          ...prev,
          [selectedPost.id]: apiComments,
        }));
      })
      .catch((error) => {
        console.log("Unable to load comments:", error);
      });
  }, [selectedPost]);

  // =========================
  // ADD NEW COMMENT
  // =========================

  const addComment = (
    name: string,
    email: string,
    text: string
  ) => {
    if (!selectedPost) {
      return;
    }

    const newComment: Comment = {
      id: Date.now(),
      name,
      email,
      text,
      date: new Date().toLocaleString(),
    };

    // Store user-created comments separately
    setUserComments((prev) => ({
      ...prev,

      [selectedPost.id]: [
        ...(prev[selectedPost.id] || []),
        newComment,
      ],
    }));

    setLastCommenter(name);
  };

  // =========================
  // COMBINE COMMENTS
  // =========================

  // API comments + comments added by user
  const postComments = selectedPost
    ? [
        ...(comments[selectedPost.id] || []),
        ...(userComments[selectedPost.id] || []),
      ]
    : [];

  // =========================
  // CATEGORIES
  // =========================

  // Get all unique tags from API posts
  const categories = [
    ...new Set(posts.flatMap((post) => post.tags)),
  ];

  // =========================
  // FILTER POSTS
  // =========================

  const filteredPosts =
    selectedTag === "All"
      ? posts
      : posts.filter((post) =>
          post.tags.includes(selectedTag)
        );

  return (
    <div className="app">
      <Navbar />

      <main className="container">
        <Hero />

        <div className="layout">
          {/* =========================
              LEFT COLUMN
          ========================= */}

          <section>
            {loading && (
              <p className="status">
                Loading posts...
              </p>
            )}

            {error && (
              <p className="status error">
                {error}
              </p>
            )}

            {!loading && !error && (
              <PostList
                posts={filteredPosts}
                selectedId={selectedPost?.id ?? 0}
                onSelect={setSelectedPost}
                selectedTag={selectedTag}
              />
            )}
          </section>

          {/* =========================
              RIGHT COLUMN
          ========================= */}

          <aside className="sidebar">

            {/* Selected post */}
            {selectedPost && (
              <PostDetail post={selectedPost} />
            )}

            {/* Comments */}
            <div className="widget">
              <h3>Comments</h3>

              <CommentList comments={postComments} />

              {lastCommenter && (
                <p className="last-commenter">
                  Last commenter: {lastCommenter}
                </p>
              )}

              <CommentForm
                onAddComment={addComment}
              />
            </div>

            {/* Categories */}
            <div className="widget">
              <h3>Categories</h3>

              <CategoryList
                categories={categories}
                selectedTag={selectedTag}
                onSelectTag={setSelectedTag}
              />
            </div>

          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;
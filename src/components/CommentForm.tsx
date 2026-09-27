import { useState } from "react";

type Props = {
  onAddComment: (name: string, text: string) => void;
};

export default function CommentForm({ onAddComment }: Props) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const [nameError, setNameError] = useState("");
  const [commentError, setCommentError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    setNameError("");
    setCommentError("");

    if (name.trim().length < 2) {
      setNameError("Name must be at least 2 characters.");
      isValid = false;
    }

    if (comment.trim().length < 10) {
      setCommentError("Comment must be at least 10 characters.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    onAddComment(name.trim(), comment.trim());

    setName("");
    setComment("");
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h3>Add a Comment</h3>

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {nameError && <p className="error">{nameError}</p>}

      <textarea
        placeholder="Write a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {commentError && <p className="error">{commentError}</p>}

      <button type="submit">Post Comment</button>
    </form>
  );
}
import type { Comment } from "../types";

type Props = {
  comment: Comment;
};

export default function CommentItem({ comment }: Props) {
  const isApiComment = comment.date === "API Comment";

  return (
    <div className="comment-item">
      <div className="comment-header">
        <strong className="comment-name">
          {comment.name}
        </strong>

        {isApiComment ? (
          <span className="api-comment-label">
            API Comment
          </span>
        ) : (
          <span className="comment-date">
            {comment.date}
          </span>
        )}
      </div>

      <p className="comment-text">
        {comment.text}
      </p>
    </div>
  );
}
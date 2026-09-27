import type { Comment } from "../types";

type Props = {
  comment: Comment;
};

export default function CommentItem({ comment }: Props) {
  return (
    <div className="comment-item">
      <p className="comment-name">
        <strong>{comment.name}</strong>
      </p>

      <p className="comment-date">{comment.date}</p>

      <p>{comment.text}</p>
    </div>
  );
}
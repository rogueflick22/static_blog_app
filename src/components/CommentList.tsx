import type { Comment } from "../types";
import CommentItem from "./CommentItem";

type Props = {
  comments: Comment[];
};

export default function CommentList({ comments }: Props) {
  return (
    <div className="comment-list">
      {comments.length === 0 ? (
        <p className="no-comments">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      )}
    </div>
  );
}
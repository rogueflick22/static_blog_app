import type { Post } from "../data/posts";

type Props = {
  post: Post;
  isSelected: boolean;
  onSelect: (post: Post) => void;
};

export default function PostCard({ post, isSelected, onSelect }: Props) {
  return (
    <div className={isSelected ? "post-card selected" : "post-card"}>
      <img src={post.imageUrl} alt={post.title} />
      <div className="post-info">
        <h3>{post.title}</h3>
        <p className="post-date">{post.date}</p>
        <span className="tag">{post.category}</span>
        <p>{post.excerpt}</p>
        <button onClick={() => onSelect(post)}>Read</button>
      </div>
    </div>
  );
}
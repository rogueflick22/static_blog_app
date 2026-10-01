import type { Post } from "../types";

type Props = {
  post: Post;
  isSelected: boolean;
  onSelect: (post: Post) => void;
};

export default function PostCard({ post, isSelected, onSelect }: Props) {
  // API has no images, so we reuse our 4 images
  const imageUrl = `/images/post${((post.id - 1) % 4) + 1}.jpg`;

  // API has no excerpt, so we cut the body short
  const excerpt =
    post.body.length > 100 ? post.body.slice(0, 100) + "..." : post.body;

  return (
    <div className={isSelected ? "post-card selected" : "post-card"}>
      <img src={imageUrl} alt={post.title} />
      <div className="post-info">
        <h3>{post.title}</h3>
        <p className="post-date">
          👍 {post.reactions.likes} • 👁 {post.views} views
        </p>
        <div className="tags">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <p>{excerpt}</p>
        <button onClick={() => onSelect(post)}>Read</button>
      </div>
    </div>
  );
}
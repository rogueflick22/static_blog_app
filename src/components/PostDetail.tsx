import type { Post } from "../types";

type Props = {
  post: Post;
};

export default function PostDetail({ post }: Props) {
  const imageUrl = `/images/post${((post.id - 1) % 4) + 1}.jpg`;

  return (
    <section className="post-detail">
      <h2>Selected Post</h2>
      <h3>{post.title}</h3>
      <p className="post-date">
        👍 {post.reactions.likes} 👎 {post.reactions.dislikes} • 👁 {post.views} views
      </p>
      <div className="tags">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <img src={imageUrl} alt={post.title} />
      <p className="post-content">{post.body}</p>
    </section>
  );
}
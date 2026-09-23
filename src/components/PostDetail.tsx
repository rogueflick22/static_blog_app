import type { Post } from "../data/posts";

type Props = {
  post: Post;
};

export default function PostDetail({ post }: Props) {
  return (
    <section className="post-detail">
      <h2>Selected Post</h2>
      <h3>{post.title}</h3>
      <p className="post-date">
        {post.date} • {post.category}
      </p>
      <img src={post.imageUrl} alt={post.title} />
      <p className="post-content">{post.content.trim()}</p>
    </section>
  );
}
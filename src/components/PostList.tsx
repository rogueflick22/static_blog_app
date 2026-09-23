import type { Post } from "../data/posts";
import PostCard from "./PostCard";

type Props = {
  posts: Post[];
  selectedId: number;
  onSelect: (post: Post) => void;
};

export default function PostList({ posts, selectedId, onSelect }: Props) {
  return (
    <section className="post-list">
      <h2>Recent Posts</h2>
      {posts.map((p) => (
        <PostCard
          key={p.id}
          post={p}
          isSelected={p.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </section>
  );
}
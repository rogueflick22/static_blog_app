import type { Post } from "../types";
import PostCard from "./PostCard";

type Props = {
  posts: Post[];
  selectedId: number;
  onSelect: (post: Post) => void;
  selectedTag: string;
};

export default function PostList({ posts, selectedId, onSelect, selectedTag }: Props) {
  return (
    <section className="post-list">
      <div className="post-list-heading">
        <h2>Recent Posts</h2>

        {selectedTag !== "All" && (
          <span className="filtered-by">
            Filtered by: {selectedTag}
          </span>
        )}
      </div>
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
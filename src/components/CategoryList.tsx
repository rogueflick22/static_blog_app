type Props = {
  categories: string[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
};

export default function CategoryList({
  categories,
  selectedTag,
  onSelectTag,
}: Props) {
  return (
    <div className="category-list">
      <button
        className={selectedTag === "All" ? "category-active" : ""}
        onClick={() => onSelectTag("All")}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          className={
            selectedTag === category ? "category-active" : ""
          }
          onClick={() => onSelectTag(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
type Props = {
  categories: string[];
};

export default function CategoryList({ categories }: Props) {
  return (
    <div className="category-list">
      {categories.map((category) => (
        <p key={category}>{category}</p>
      ))}
    </div>
  );
}
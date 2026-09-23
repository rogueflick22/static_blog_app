export default function Hero() {
  return (
    <section className="hero">
      <div>
        <h2>Welcome to MyBlog</h2>
        <p>A WordPress-style static blog UI: recent posts, categories, and comments.</p>
      </div>
      <input type="text" placeholder="Search posts..." className="search" />
    </section>
  );
}
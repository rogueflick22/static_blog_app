export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">MyBlog</h1>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Posts</a></li>
        <li><a href="#">Categories</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  );
}
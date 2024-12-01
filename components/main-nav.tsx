import Link from "next/link";

const MainNav = () => {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link className="text-black hover:text-blue-500" href="/posts">
            PostsPage
          </Link>
        </li>
        <li>
          <Link className="text-black hover:text-blue-500" href="/addservice">
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;

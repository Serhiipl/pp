import { auth } from "@/auth";
import Link from "next/link";

const MainNav = async () => {
  const session = await auth();
  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link className="text-black hover:text-blue-500" href="/posts">
            PostsPage
          </Link>
        </li>
        {session?.user && (
          <li>
            <Link className="text-black hover:text-blue-500" href="/addservice">
              Dashboard
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNav;

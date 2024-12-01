import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";

const Header = () => {
  return (
    <div className="w-full bg-slate-200">
      <Container>
        <div className="w-full border-b border-gray-900 h-16 flex flex-row justify-between items-center mb-0 px-4">
          <Link className="text-black" href="/">
            Home
          </Link>
          <MainNav />
          <div className="flex items-center gap-x-5">
            <Link href={"/sign-in"}>
              <div className="bg-indigo-600 text-white px-4 py-2 rounded-md">
                Sign-In
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;

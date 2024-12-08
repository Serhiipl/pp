import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import { auth } from "@/auth";
import Image from "next/image";
import Logout from "./logout";

const Header = async () => {
  const session = await auth();
  return (
    <div className="w-full bg-slate-200">
      <Container>
        <div className="w-full border-b border-gray-900 h-16 flex flex-row justify-between items-center mb-0 px-4">
          <Link className="text-black" href="/">
            Home
          </Link>
          <MainNav />
          <div className="flex items-center gap-x-5">
            {!session?.user ? (
              <div className="bg-red-200 text-white px-4 py-2 rounded-lg">
                <Link href={"/sign-in"}>Sign-In</Link>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-x-2 text-sm">
                  {session.user.name}
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      alt="User Avatar"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  )}
                </div>
                <Logout />
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;

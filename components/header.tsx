import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";

const Header = () => {
  return (
    <div className="w-full bg-slate-200">
      <Container>
        <div className=" h-16 flex flex-row justify-around items-center mb-0">
          <Link href="/">Test</Link>
          <MainNav />
        </div>
      </Container>
    </div>
  );
};

export default Header;

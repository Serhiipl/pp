// "use client";

// import AddService from "@/components/AddService";
import AddServicePage from "@/app/addservice/page";
import Container from "./ui/container";
import PostsPage from "@/app/posts/page";

const Main: React.FC = () => {
  return (
    <div className="bg-white flex">
      <Container>
        <PostsPage />
        <AddServicePage />
      </Container>
    </div>
  );
};

export default Main;

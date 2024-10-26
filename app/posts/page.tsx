"use client";

import React, { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface Post {
  id: number;
  slug: string;
  title: string;
  content: string;
  image?: string;
  thumbnail?: string;
  status?: string;
  category?: string;
  publishedAt?: string;
  updatedAt?: string;
  userId?: number;
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.org/posts");
        if (!response.ok) {
          throw new Error(
            "Huston we got a problem=))) Response is not ok! We cant fetch posts"
          );
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);
  return (
    // <div className="mb-20">
    //   <h2 className="text-center text-3xl my-5 text-gray-700">Getting Posts</h2>
    //   {posts ? (
    //     <ul>
    //       {posts.map((post) => (
    //         <li
    //           className="my-3 min-w-[672px] w-full flex flex-col"
    //           key={post.id}
    //         >
    //           <div className="flex flex-row items-end gap-4 mb-4 text-black">
    //             <Avatar>
    //               <AvatarImage src={post.thumbnail} />
    //               <AvatarFallback>{post.userId}</AvatarFallback>
    //             </Avatar>
    //             <p> User: {post.userId}</p>
    //           </div>
    //           <Accordion className="min-w-2xl" type="single" collapsible>
    //             <AccordionItem value={`item-${post.id}`}>
    //               <AccordionTrigger className="text-black text-xl">
    //                 {post.title}
    //               </AccordionTrigger>
    //               <AccordionContent className="max-w-2xl text-black">
    //                 <p className="my-4">Category: {post.category}</p>
    //                 {post.content}
    //                 <p className="my-4">Published: {post.publishedAt}</p>
    //               </AccordionContent>
    //             </AccordionItem>
    //           </Accordion>

    //           {/* <h3 className="text-xl ">{post.title}</h3>
    //           <p>Category: {post.category}</p>
    //           <div>
    //             <p>{post.content}</p>
    //             <div>
    //               <p>Published: {post.publishedAt}</p>
    //             </div>
    //           </div> */}
    //         </li>
    //       ))}
    //     </ul>
    //   ) : (
    //     <p>Loading posts...</p>
    //   )}
    // </div>
    <div className="mb-20">
      <h2 className="text-center text-3xl my-5 text-gray-700">Getting Posts</h2>
      {posts ? (
        <ul>
          {posts.map((post) => (
            <li
              className="my-3 min-w-[672px] w-full flex flex-col"
              key={post.id}
            >
              <div className="flex flex-row items-end gap-4 mb-4 text-black">
                <Avatar>
                  {post.thumbnail ? (
                    <AvatarImage src={post.thumbnail} />
                  ) : (
                    <AvatarFallback>{post.userId}</AvatarFallback>
                  )}
                </Avatar>
                <p> User: {post.userId}</p>
              </div>
              <Accordion className="min-w-2xl" type="single" collapsible>
                <AccordionItem value={`item-${post.id}`}>
                  <AccordionTrigger className="text-black text-xl">
                    {post.title}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-2xl text-black">
                    {post.category && (
                      <p className="my-4">Category: {post.category}</p>
                    )}
                    <p>{post.content}</p>
                    {post.publishedAt && (
                      <p className="my-4">Published: {post.publishedAt}</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
};

export default PostsPage;

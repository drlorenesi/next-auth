import Link from "next/link";
import { Suspense } from "react";
import { FaCirclePlus } from "react-icons/fa6";

// Components
import PostList from "./PostList";
import Loading from "../loading";

export default async function Posts() {
  return (
    <>
      <h2 className="d-flex border-bottom">
        Posts
        <Link href="/posts/new" className="btn btn-outline-primary ms-auto">
          Add Post <FaCirclePlus />
        </Link>
      </h2>
      <p>Recent posts shown here.</p>
      <Suspense fallback={<Loading />}>
        <PostList />
      </Suspense>
    </>
  );
}

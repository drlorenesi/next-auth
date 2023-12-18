import Link from "next/link";
import { notFound } from "next/navigation";

// Display 404 if page hasn't been pre-rendered ahead of time.
export const dynamicParams = false;

// Statically generate routes at build time instead of on-demand at request time.
export async function generateStaticParams() {
  const res = await fetch("http://localhost:3000/api/posts/");
  const posts = await res.json();
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

async function getPost(id) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) notFound();
  return res.json();
}

export default async function PostDetails({ params }) {
  const post = await getPost(params.id);

  return (
    <>
      <h2 className="border-bottom">{post.title}</h2>
      <div className="col-lg-6 col-md-6 col-sm-6">
        <div className="row mb-2">
          <p>{post.body}</p>
          <small>Created at: {post.created_at}</small>
        </div>
        <Link href="/posts" className="btn btn-outline-primary">
          &laquo; Back
        </Link>
      </div>
    </>
  );
}

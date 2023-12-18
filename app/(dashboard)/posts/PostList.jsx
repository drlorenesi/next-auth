import Link from "next/link";

async function getPosts() {
  const res = await fetch("http://localhost:3000/api/posts/", {
    // Use "0" to opt out of data caching
    // next: { revalidate: 0 },
    // or add time in seconds to re-fetch
    next: { revalidate: 30 },
  });
  return res.json();
}

export default async function PostList() {
  // Imitate delay
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const posts = await getPosts();

  return (
    <>
      {posts.length === 0 && <p className="text-center">There are no posts</p>}
      <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1">
        {posts.map((post) => (
          <div key={post.id} className="col">
            <div className="card text-bg-light mb-3 rounded-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>
                <div className="btn-group">
                  <Link
                    href={`/posts/${post.id}`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

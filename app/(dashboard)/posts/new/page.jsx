import Link from "next/link";

// Components
import NewPostForm from "./NewPostForm";

export default function NewPost() {
  return (
    <>
      <h2 className="d-flex border-bottom">
        Add Post
        <Link href="/posts" className="btn btn-outline-primary ms-auto">
          &laquo; Back
        </Link>
      </h2>
      <p>Add new post here.</p>
      <div className="col-lg-4 col-md-6 col-sm-7">
        <NewPostForm />
      </div>
    </>
  );
}

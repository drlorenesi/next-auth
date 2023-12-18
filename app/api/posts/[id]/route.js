import { NextResponse } from "next/server";
import { execute } from "@/config/db";
import postSchema from "@/app/_lib/schemas/postSchema";

// Add to prevent caching on GET requests
export const dynamic = "force-dynamic";

// GET by id Request
// ---------
export async function GET(_, { params }) {
  // Add 'request' to prevent caching
  // Fetch data from db
  const { rows } = await execute("SELECT * FROM posts WHERE id = ?", [
    params.id,
  ]);
  // If not found, return 404 error
  if (rows.length === 0)
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  return NextResponse.json(rows[0]);
}

// PUT Request
// -----------
export async function PUT(request, { params }) {
  // Check the content type of the request
  const contentType = request.headers.get("content-type");
  if (contentType !== "application/json") {
    return NextResponse.json(
      { error: "Invalid content type. Expected application/json." },
      { status: 400 }
    );
  }
  // Get the body of the request
  const body = await request.json();
  // Validate the request body. If invalid, return 400
  try {
    await postSchema.validate(body, { abortEarly: false });
  } catch (err) {
    let fieldErrors = {};
    err.inner.forEach((error) => {
      if (error.path) {
        fieldErrors[error.path] = error.message;
      }
    });
    return NextResponse.json(fieldErrors, { status: 400 });
  }
  // If validation OK, update
  const { rows } = await execute(
    "UPDATE posts SET title = ?, body = ? WHERE id = ?",
    [body.title, body.body, params.id]
  );
  return NextResponse.json({
    id: params.id,
    title: body.title,
    price: body.body,
  });
}

// DELETE by id Request
// --------------------
export async function DELETE(_, { params }) {
  // Add 'request' to prevent caching
  // Fetch data from db, If post does not exist return 404
  const { rows } = await execute("SELECT * FROM posts WHERE id = ?", [
    params.id,
  ]);
  // If not found, return 404 error
  if (rows.length === 0)
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  await execute("DELETE FROM posts WHERE id = ?", [params.id]);
  // If ok
  return NextResponse.json({ message: "Product deleted." });
}

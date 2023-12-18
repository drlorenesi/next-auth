import { NextResponse } from "next/server";
import { query, execute } from "@/config/db";
import postSchema from "@/app/_lib/schemas/postSchema";

// Add to prevent caching on GET requests
export const dynamic = "force-dynamic";

// GET Request
// -----------
export async function GET() {
  const { rows } = await query("SELECT * FROM posts ORDER BY created_at DESC");
  return NextResponse.json(rows);
}

// POST Request
// ------------
export async function POST(request) {
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
  // If validation OK, add to DB and return object with 'id'
  const { rows } = await execute(
    "INSERT INTO posts (title, body) VALUES (?, ?)",
    [body.title, body.body]
  );
  return NextResponse.json(
    { id: rows.insertId, title: body.title, body: body.body },
    { status: 201 }
  );
}

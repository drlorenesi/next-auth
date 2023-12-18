import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// GET Request
// -----------
export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  try {
    if (code) {
      const supabase = createRouteHandlerClient({ cookies });
      await supabase.auth.exchangeCodeForSession(code);
      return NextResponse.redirect(`${url.origin}/exito`);
    } else {
      return NextResponse.redirect(`${url.origin}/verificar`);
    }
  } catch (error) {
    return NextResponse.redirect(`${url.origin}/verificar`);
  }
}

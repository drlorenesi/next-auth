import { Button } from "@/components/ui/button";
import { query } from "@/lib/query";

export default async function Home() {
  // Example query
  const sql = `SELECT ? AS StartDate, ? AS EndDate`;
  const params = ["2025-10-01", "2025-10-22"];
  const { rows, fields, duration } = await query(sql, params);
  console.log({ rows, fields, duration });

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Test</h1>
        Environment:<pre>{process.env.NODE_ENV}</pre>
        {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
      </main>
      <div>
        <Button>Click me</Button>
      </div>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Footer</p>
      </footer>
    </div>
  );
}

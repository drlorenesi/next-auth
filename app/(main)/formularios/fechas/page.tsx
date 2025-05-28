// import { query } from "@/utils/db/mssql";
import DateForm from "./date-form";

export default async function DataFetching() {
  // Fetch the list of users from the database.
  // const result = await query("SELECT * FROM products");
  // const products = result.recordset;
  // console.log(products);

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold tracking-tight border-b pb-2 first:mt-0">
        Fechas
      </h2>
      <DateForm />
    </div>
  );
}

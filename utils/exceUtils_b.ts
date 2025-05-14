import * as XLSX from "xlsx";

export const downloadExcel = (
  tableRef: React.RefObject<HTMLTableElement | null>
) => {
  if (!tableRef.current) return; // Ensure tableRef is not null

  /* Create worksheet from HTML DOM TABLE */
  const wb = XLSX.utils.table_to_book(tableRef.current);

  /* Export to file (start a download) */
  XLSX.writeFile(wb, "SheetJSTable.xlsx");
};

// How to use this function:
// import { downloadExcel } from "@/utils/exceUtils";
//
// const tableRef = React.useRef<HTMLTableElement | null>(null);
// <Table ref={tableRef}>
// <Button onClick={() => downloadExcel(tableRef)}>Download</Button>

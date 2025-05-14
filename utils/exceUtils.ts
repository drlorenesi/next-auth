import * as XLSX from "xlsx";

export const downloadExcel = (
  tableRef: React.RefObject<HTMLTableElement | null>
) => {
  if (!tableRef.current) return;

  /* Create worksheet from HTML DOM TABLE */
  const wb = XLSX.utils.table_to_book(tableRef.current);
  const ws = wb.Sheets[wb.SheetNames[0]]; // Get first sheet

  /* Auto-calculate column widths */
  const calculateColumnWidths = () => {
    const colWidths: number[] = [];

    // Get all rows of the table
    const rows = tableRef.current?.querySelectorAll("tr");
    if (!rows) return [];

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td, th");
      cells.forEach((cell, colIndex) => {
        const text = (cell as HTMLElement).innerText; // Type cast `cell` to `HTMLElement`
        const textLength = text.length; // Get text length
        colWidths[colIndex] = Math.max(colWidths[colIndex] || 0, textLength);
      });
    });

    return colWidths.map((width) => ({ wch: width + 2 })); // Add padding for better spacing
  };

  ws["!cols"] = calculateColumnWidths(); // Apply auto-sized column widths

  /* Export to file */
  XLSX.writeFile(wb, "SheetJSTable.xlsx");
};

// How to use this function:
// import { downloadExcel } from "@/utils/exceUtils";
//
// const tableRef = React.useRef<HTMLTableElement | null>(null);
// <Table ref={tableRef}>
// <Button onClick={() => downloadExcel(tableRef)}>Download</Button>

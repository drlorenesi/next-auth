"use client";
import { utils, writeFile } from "xlsx";

export default function Excel() {
  const handleClick = () => {
    // Get the table element
    const table = document.getElementById("Table2XLSX");
    // Convert the table to a worksheet object
    const ws = utils.table_to_sheet(table);
    // Calculate column widths based on content length
    let columnWidths = [];
    utils.sheet_to_json(ws, { header: 1 }).forEach((row) => {
      row.forEach((cell, colIndex) => {
        let cellContentLength = String(cell).length;
        columnWidths[colIndex] = Math.max(
          columnWidths[colIndex] || 0,
          cellContentLength
        );
      });
    });
    // Adjust column widths to be at least wch: 10
    columnWidths = columnWidths.map((width) => Math.max(width, 10));
    // Set the column widths in the worksheet
    ws["!cols"] = columnWidths.map((width) => ({ wch: width }));
    // Create a workbook with the worksheet
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");
    // Export the workbook to Excel
    writeFile(wb, "exported_data.xlsx");
  };

  return (
    <>
      <div>
        <h2 className="border-bottom">Download to Excel</h2>
        <div>
          <table
            id="Table2XLSX"
            className="table table-striped table-hover table-bordered table-sm"
          >
            <tbody>
              <tr>
                <th>Header 1</th>
                <th>Header 2</th>
                <th>Header 3</th>
              </tr>
              <tr>
                <td>Author</td>
                <td>ID</td>
                <td>74.99</td>
              </tr>
              <tr>
                <td>SheetJS Community</td>
                <td>007262</td>
                <td>SheetJS Community Edition</td>
              </tr>
            </tbody>
          </table>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClick}
          >
            Export XLSX!
          </button>
        </div>
      </div>
    </>
  );
}

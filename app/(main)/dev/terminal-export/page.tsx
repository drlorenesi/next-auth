"use client";

import type React from "react";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, RefreshCw, Info, AlertTriangle, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DataTable } from "@/components/data-table";
import { exportToExcel } from "@/utils/export-utils";
import { copyToClipboard } from "@/utils/clipboard-utils";
import {
  readAndParseFile,
  findQFColumnIndices,
  countErrors,
  type ParsedData,
} from "@/utils/file-utils";

export default function Home() {
  const [data, setData] = useState<ParsedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setError(null);
    setIsLoading(true);

    try {
      const parsedData = await readAndParseFile(file);
      setData(parsedData);
    } catch (err) {
      console.error("File upload error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An unknown error occurred while processing the file"
      );
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportToExcel = async () => {
    if (!data) return;

    setIsExporting(true);
    try {
      await exportToExcel(data, fileName);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to export to Excel"
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyToClipboard = async () => {
    if (!data) return;

    try {
      await copyToClipboard(data);
      // Show success indicator
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to copy data to clipboard"
      );
    }
  };

  const clearData = () => {
    setData(null);
    setFileName(null);
    setError(null);

    // Reset the file input
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  // Find QF columns and their corresponding data columns
  const qfColumnIndices = useMemo(() => {
    if (!data) return [];
    return findQFColumnIndices(data.headers);
  }, [data]);

  // Count total errors in the data
  const errorCount = useMemo(() => {
    if (!data) return 0;
    return countErrors(data.rows, qfColumnIndices);
  }, [data, qfColumnIndices]);

  return (
    <main className="container mx-auto py-4 sm:py-6 md:py-10 px-2 sm:px-4">
      <Card className="w-full">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 pb-4 sm:pb-6">
          <div>
            <CardTitle>Data File Upload</CardTitle>
            <CardDescription>
              Upload a data file to parse and display in a table
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <div className="flex flex-col items-center justify-center gap-4 sm:gap-6">
            {/* Button container with max width on larger screens */}
            <div className="w-full sm:w-auto sm:flex sm:justify-center">
              <div className="flex flex-col xs:flex-row gap-2 w-full xs:w-auto">
                <Button
                  className="w-full xs:w-auto h-10 sm:h-9 md:h-8 text-sm md:text-xs px-4"
                  size="default"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                  disabled={isLoading}
                >
                  <Upload className="mr-2 h-4 w-4 md:h-3.5 md:w-3.5" />
                  {isLoading ? "Loading..." : "Upload File"}
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept=".txt,.csv,.tsv"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isLoading}
                />

                {data && (
                  <Button
                    className="w-full xs:w-auto h-10 sm:h-9 md:h-8 text-sm md:text-xs px-4"
                    variant="secondary"
                    size="default"
                    onClick={clearData}
                    disabled={isLoading}
                  >
                    <RefreshCw className="mr-2 h-4 w-4 md:h-3.5 md:w-3.5" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {fileName && !isLoading && (
              <p className="mt-0 text-sm text-muted-foreground self-start">
                Uploaded: <span className="font-medium">{fileName}</span>
              </p>
            )}

            {error && (
              <Alert variant="destructive" className="w-full">
                <div className="flex items-start justify-between">
                  <AlertDescription className="mt-0.5">
                    {error}
                  </AlertDescription>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-7 px-2 ml-2"
                    onClick={clearData}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                </div>
              </Alert>
            )}

            {data && (
              <>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                  {/* File Metadata Card */}
                  <div className="w-full space-y-4">
                    <Card className="w-full">
                      <CardHeader className="pb-2 px-4">
                        <CardTitle className="text-base sm:text-lg">
                          File Metadata
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-4 py-2">
                        <div className="space-y-1 sm:space-y-2">
                          {data.metadata.map((line, index) => (
                            <p
                              key={index}
                              className="font-mono text-xs sm:text-sm break-words"
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Legend Card */}
                  <Card className="w-full h-full">
                    <CardHeader className="pb-2 px-4">
                      <CardTitle className="text-base sm:text-lg flex items-center">
                        <Info className="mr-2 h-4 w-4" />
                        Legend
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 py-2">
                      <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                        <p>
                          <span className="font-semibold">A_speed:</span>{" "}
                          machine speed
                        </p>
                        <p>
                          <span className="font-semibold">B_prod:</span> total
                          packaged products
                        </p>
                        <p>
                          <span className="font-semibold">X_*:</span> variety of
                          rejected products
                        </p>
                        <p>
                          <span className="font-semibold">s_*:</span> machine
                          stopped time
                        </p>
                        <p>
                          <span className="font-semibold">w_*:</span> machine
                          operating time
                        </p>
                        <div className="mt-3 p-2 border border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-900 rounded-md">
                          <p className="flex items-start text-amber-800 dark:text-amber-300">
                            <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span>
                              The QF columns indicate that the data was saved
                              correctly if the value is 0.
                              {errorCount > 0 && (
                                <span className="block mt-1 font-medium">
                                  Found {errorCount} rows with errors in this
                                  dataset.
                                </span>
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Data Table Component */}
                <DataTable
                  headers={data.headers}
                  rows={data.rows}
                  initialPageSize={10}
                  onExport={handleExportToExcel}
                  onCopy={handleCopyToClipboard}
                  isExporting={isExporting}
                  isCopied={isCopied}
                  qfColumnIndices={qfColumnIndices}
                />
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

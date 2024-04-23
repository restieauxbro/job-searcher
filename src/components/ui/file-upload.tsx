"use client";
import { ChangeEvent, FC, useState } from "react";

interface IFileUploadProps {}

const FileUpload: FC<IFileUploadProps> = (props) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      alert("File selected: " + files[0].name);
    }
  };

  const handleUpload = () => {
    if (file) {
      setIsUploading(true);
      // Simulate an upload
      setTimeout(() => {
        setIsUploading(false);
        alert("File uploaded successfully: " + file.name);
      }, 2000); // Simulate upload time
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-purple-300 border-dashed rounded-lg cursor-pointer bg-purple-50 dark:hover:bg-purple-800 dark:bg-purple-700 hover:bg-purple-100 dark:border-purple-600 dark:hover:border-purple-500"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-purple-500 dark:text-purple-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>

          {file ? (
            <p className="mb-2 text-sm text-purple-500 dark:text-purple-400">
              File ready to upload:{" "}
              <span className="font-semibold">{file.name}</span>
            </p>
          ) : (
            <p className="mb-2 text-sm text-purple-500 dark:text-purple-400">
              <span className="font-semibold text-purple-600">Click to upload</span> or drag and
              drop
            </p>
          )}

          <p className="text-xs text-purple-500 dark:text-purple-400">PDF, DOCX (Max 5MB)</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept=".pdf,.docx"
          onChange={handleFileChange}
        />
        {file && (
          <button
            type="button"
            className="mt-2 text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        )}
      </label>
    </div>
  );
};

export default FileUpload;

"use client";
import { ChangeEventHandler, FC } from "react";

interface IFileUploadProps {
  handleFileChange: ChangeEventHandler<HTMLInputElement>;
}

const FileUpload: FC<IFileUploadProps> = (props) => {
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
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>

          <p className="mb-2 text-sm text-purple-500 dark:text-purple-400">
            <span className="font-semibold text-purple-600">
              Click to upload
            </span>{" "}
            or drag and drop
          </p>

          <p className="text-xs text-purple-500 dark:text-purple-400">
            PDF, DOCX (Max 5MB)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept=".pdf,.docx"
          onChange={props.handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileUpload;

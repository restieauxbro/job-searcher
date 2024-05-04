"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeEventHandler, FC } from "react";

interface IFileUploadProps {
  handleFileChange: ChangeEventHandler<HTMLInputElement>;
  loading?: boolean;
}

const FileUpload: FC<IFileUploadProps> = (props) => {
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-purple-300 border-dashed rounded-lg cursor-pointer bg-purple-50 dark:hover:bg-purple-800 dark:bg-purple-700 hover:bg-purple-100 dark:border-purple-600 dark:hover:border-purple-500"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <div className="relative h-14 flex items-center">
            <AnimatePresence mode="wait">
              {props.loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.5 } }}
                  exit={{ opacity: 0 }}
                  className="loading-spinner bg-purple-500 w-8 p-1"
                />
              ) : (
                <motion.svg
                  exit={{ opacity: 0 , transition: { duration: 3 }}}
                  className="w-8 h-8 text-purple-500 dark:text-purple-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <motion.path
                  exit={{ y: 100 }}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </div>

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
          //  accept=".pdf,.docx"
          onChange={props.handleFileChange}
          disabled={props.loading}
        />
      </label>
    </div>
  );
};

export default FileUpload;

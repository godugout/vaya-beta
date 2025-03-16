
import { useState } from 'react';
import { FileInput } from "../FileInput";
import { FormatInfo } from "./FormatInfo";

interface FileUploadTabProps {
  file: File | null;
  handleFileUpload: (file: File) => void;
}

export const FileUploadTab = ({ file, handleFileUpload }: FileUploadTabProps) => {
  const [showFormat, setShowFormat] = useState(false);

  return (
    <div className="space-y-4">
      <FormatInfo showFormat={showFormat} setShowFormat={setShowFormat} />
      
      <FileInput onFileSelected={handleFileUpload} />
      
      {file && (
        <div className="text-sm text-green-600 dark:text-green-400">
          File selected: {file.name}
        </div>
      )}
      
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>Supported formats:</p>
        <ul className="list-disc list-inside ml-2">
          <li>Excel (.xlsx, .xls)</li>
          <li>CSV (.csv)</li>
          <li>JSON (.json)</li>
        </ul>
      </div>
    </div>
  );
};

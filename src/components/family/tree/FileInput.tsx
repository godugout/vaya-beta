
import { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';

interface FileInputProps {
  onFileSelected: (file: File) => void;
  acceptedFileTypes?: string;
  className?: string;
}

export const FileInput = ({ 
  onFileSelected, 
  acceptedFileTypes = ".csv,.json,.xlsx", 
  className = ""
}: FileInputProps) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelected(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div 
      className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
        dragActive ? 'border-blue-500 bg-blue-50/10' : 'border-gray-600/40'
      } ${className}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={onButtonClick}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <UploadCloud className={`h-8 w-8 mb-2 ${dragActive ? 'text-blue-400' : 'text-gray-400'}`} />
        <p className="mb-2 text-sm text-gray-300">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-400">
          CSV, JSON, or Excel files
        </p>
      </div>
      <input
        ref={inputRef}
        id="dropzone-file"
        type="file"
        className="hidden"
        accept={acceptedFileTypes}
        onChange={handleChange}
      />
    </div>
  );
};

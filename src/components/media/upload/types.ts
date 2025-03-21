
export interface FileWithMeta {
  file: File;
  progress: number;
  title: string;
  description: string;
  tags: string[];
}

export interface FileItemProps {
  file: FileWithMeta;
  index: number;
  uploading: boolean;
  onRemove: (index: number) => void;
  onTitleChange: (index: number, value: string) => void;
  onDescriptionChange: (index: number, value: string) => void;
  onTagsChange: (index: number, value: string) => void;
}

export interface FileError {
  fileName: string;
  message: string;
}

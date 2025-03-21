
import { renderHook, act } from '@testing-library/react-hooks';
import { useFileUpload } from '../../useFileUpload';
import { validateFiles } from '../../utils/fileValidation';
import { uploadFileToStorage, createMediaRecord } from '../../services/uploadService';
import { useToast } from '@/components/ui/use-toast';

// Mock the dependencies
jest.mock('../../utils/fileValidation');
jest.mock('../../services/uploadService');
jest.mock('@/components/ui/use-toast');

describe('useFileUpload', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default implementation of mocks
    (validateFiles as jest.Mock).mockReturnValue({
      validFiles: [],
      errors: []
    });
    
    (uploadFileToStorage as jest.Mock).mockResolvedValue(null);
    (createMediaRecord as jest.Mock).mockResolvedValue(true);
    
    (useToast as jest.Mock).mockReturnValue({
      toast: jest.fn()
    });
  });

  it('should initialize with empty files and errors arrays', () => {
    const { result } = renderHook(() => useFileUpload());
    
    expect(result.current.files).toEqual([]);
    expect(result.current.errors).toEqual([]);
    expect(result.current.uploading).toBe(false);
  });

  it('should handle file change and validate files', () => {
    const mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
    
    // Mock the validation to return one valid file
    (validateFiles as jest.Mock).mockReturnValue({
      validFiles: [mockFile],
      errors: []
    });
    
    const { result } = renderHook(() => useFileUpload());
    
    // Create a mock event
    const mockEvent = {
      target: {
        files: [mockFile]
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    
    act(() => {
      result.current.handleFileChange(mockEvent, 5, ['image/jpeg'], false);
    });
    
    // Check that files array was updated
    expect(result.current.files.length).toBe(1);
    expect(result.current.files[0].file).toBe(mockFile);
    expect(result.current.files[0].title).toBe('test');
  });

  it('should handle file removal', () => {
    const mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
    
    // Mock the validation to return one valid file
    (validateFiles as jest.Mock).mockReturnValue({
      validFiles: [mockFile],
      errors: []
    });
    
    const { result } = renderHook(() => useFileUpload());
    
    // First add a file
    const mockEvent = {
      target: {
        files: [mockFile]
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    
    act(() => {
      result.current.handleFileChange(mockEvent, 5, ['image/jpeg'], false);
    });
    
    // Then remove it
    act(() => {
      result.current.removeFile(0);
    });
    
    // Check that files array is empty again
    expect(result.current.files).toEqual([]);
  });

  it('should update file metadata', () => {
    const mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
    
    // Mock the validation to return one valid file
    (validateFiles as jest.Mock).mockReturnValue({
      validFiles: [mockFile],
      errors: []
    });
    
    const { result } = renderHook(() => useFileUpload());
    
    // First add a file
    const mockEvent = {
      target: {
        files: [mockFile]
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    
    act(() => {
      result.current.handleFileChange(mockEvent, 5, ['image/jpeg'], false);
    });
    
    // Update title
    act(() => {
      result.current.updateFileMetadata(0, 'title', 'New Title');
    });
    
    // Check that title was updated
    expect(result.current.files[0].title).toBe('New Title');
  });

  it('should update file tags', () => {
    const mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
    
    // Mock the validation to return one valid file
    (validateFiles as jest.Mock).mockReturnValue({
      validFiles: [mockFile],
      errors: []
    });
    
    const { result } = renderHook(() => useFileUpload());
    
    // First add a file
    const mockEvent = {
      target: {
        files: [mockFile]
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    
    act(() => {
      result.current.handleFileChange(mockEvent, 5, ['image/jpeg'], false);
    });
    
    // Update tags
    act(() => {
      result.current.updateFileTags(0, 'tag1,tag2,tag3');
    });
    
    // Check that tags were updated
    expect(result.current.files[0].tags).toEqual(['tag1', 'tag2', 'tag3']);
  });

  it('should upload files successfully', async () => {
    const mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
    
    // Mock the validation to return one valid file
    (validateFiles as jest.Mock).mockReturnValue({
      validFiles: [mockFile],
      errors: []
    });
    
    // Mock successful upload
    (uploadFileToStorage as jest.Mock).mockResolvedValue({
      filePath: 'path/to/file.jpg',
      publicUrl: 'https://example.com/file.jpg',
      fileId: 'file-123'
    });
    
    (createMediaRecord as jest.Mock).mockResolvedValue(true);
    
    const { result } = renderHook(() => useFileUpload('family-123'));
    
    // First add a file
    const mockEvent = {
      target: {
        files: [mockFile]
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    
    act(() => {
      result.current.handleFileChange(mockEvent, 5, ['image/jpeg'], false);
    });
    
    // Upload the file
    let uploadResult;
    await act(async () => {
      uploadResult = await result.current.uploadFiles();
    });
    
    // Check results
    expect(uploadResult).toEqual(['https://example.com/file.jpg']);
    expect(uploadFileToStorage).toHaveBeenCalledWith(mockFile);
    expect(createMediaRecord).toHaveBeenCalledWith(
      'file-123',
      'https://example.com/file.jpg',
      mockFile,
      expect.any(Object),
      'family-123'
    );
  });

  it('should handle upload failures', async () => {
    const mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
    
    // Mock the validation to return one valid file
    (validateFiles as jest.Mock).mockReturnValue({
      validFiles: [mockFile],
      errors: []
    });
    
    // Mock failed upload
    (uploadFileToStorage as jest.Mock).mockResolvedValue(null);
    
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast
    });
    
    const { result } = renderHook(() => useFileUpload());
    
    // First add a file
    const mockEvent = {
      target: {
        files: [mockFile]
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    
    act(() => {
      result.current.handleFileChange(mockEvent, 5, ['image/jpeg'], false);
    });
    
    // Try to upload the file
    let uploadResult;
    await act(async () => {
      uploadResult = await result.current.uploadFiles();
    });
    
    // Check results
    expect(uploadResult).toBeNull();
    expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
      title: "Upload failed",
      variant: "destructive"
    }));
  });

  it('should reset the upload state', () => {
    const mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
    
    // Mock the validation to return one valid file and some errors
    (validateFiles as jest.Mock).mockReturnValue({
      validFiles: [mockFile],
      errors: ['Some error']
    });
    
    const { result } = renderHook(() => useFileUpload());
    
    // First add a file
    const mockEvent = {
      target: {
        files: [mockFile]
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    
    act(() => {
      result.current.handleFileChange(mockEvent, 5, ['image/jpeg'], false);
    });
    
    // Then reset
    act(() => {
      result.current.resetUpload();
    });
    
    // Check that state is reset
    expect(result.current.files).toEqual([]);
    expect(result.current.errors).toEqual([]);
  });
});

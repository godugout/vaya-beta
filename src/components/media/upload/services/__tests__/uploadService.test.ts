
import { uploadFileToStorage, createMediaRecord } from '../uploadService';
import { supabase } from '@/integrations/supabase/client';
import { FileWithMeta } from '../../types';

// Mock Supabase client
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    storage: {
      from: jest.fn().mockReturnValue({
        upload: jest.fn(),
        getPublicUrl: jest.fn()
      })
    },
    from: jest.fn().mockReturnValue({
      insert: jest.fn()
    })
  }
}));

// Mock UUID generation
jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('mock-uuid')
}));

describe('uploadService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadFileToStorage', () => {
    it('should upload a file to storage and return file information', async () => {
      // Setup mocks
      const mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
      const mockUpload = jest.fn().mockResolvedValue({
        data: { path: 'mock-uuid.jpg' },
        error: null
      });
      const mockGetPublicUrl = jest.fn().mockReturnValue({
        data: { publicUrl: 'https://example.com/mock-uuid.jpg' }
      });
      
      (supabase.storage.from as jest.Mock).mockReturnValue({
        upload: mockUpload,
        getPublicUrl: mockGetPublicUrl
      });
      
      // Execute test
      const result = await uploadFileToStorage(mockFile);
      
      // Assertions
      expect(supabase.storage.from).toHaveBeenCalledWith('media');
      expect(mockUpload).toHaveBeenCalledWith('mock-uuid.jpg', mockFile, expect.any(Object));
      expect(mockGetPublicUrl).toHaveBeenCalledWith('mock-uuid.jpg');
      
      expect(result).toEqual({
        filePath: 'mock-uuid.jpg',
        publicUrl: 'https://example.com/mock-uuid.jpg',
        fileId: 'mock-uuid'
      });
    });
    
    it('should return null if the upload fails', async () => {
      // Setup mocks
      const mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
      const mockUpload = jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'Upload failed' }
      });
      
      (supabase.storage.from as jest.Mock).mockReturnValue({
        upload: mockUpload,
        getPublicUrl: jest.fn()
      });
      
      // Execute test
      const result = await uploadFileToStorage(mockFile);
      
      // Assertions
      expect(result).toBeNull();
    });
  });

  describe('createMediaRecord', () => {
    it('should create a database record for the uploaded media', async () => {
      // Setup mocks
      const mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
      const mockFileWithMeta: FileWithMeta = {
        file: mockFile,
        progress: 0,
        title: 'Test Image',
        description: 'A test image',
        tags: ['test', 'image']
      };
      
      const mockInsert = jest.fn().mockResolvedValue({
        data: { id: 'mock-uuid' },
        error: null
      });
      
      (supabase.from as jest.Mock).mockReturnValue({
        insert: mockInsert
      });
      
      // Execute test
      const result = await createMediaRecord(
        'mock-uuid',
        'https://example.com/mock-uuid.jpg',
        mockFile,
        mockFileWithMeta,
        'family-123'
      );
      
      // Assertions
      expect(supabase.from).toHaveBeenCalledWith('media_items');
      expect(mockInsert).toHaveBeenCalledWith({
        id: 'mock-uuid',
        title: 'Test Image',
        description: 'A test image',
        file_path: 'https://example.com/mock-uuid.jpg',
        file_type: 'image/jpeg',
        file_size: expect.any(Number),
        original_filename: 'test.jpg',
        tags: ['test', 'image'],
        annotations: [],
        family_id: 'family-123',
      });
      
      expect(result).toBe(true);
    });
    
    it('should return false if the database insert fails', async () => {
      // Setup mocks
      const mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
      const mockFileWithMeta: FileWithMeta = {
        file: mockFile,
        progress: 0,
        title: 'Test Image',
        description: 'A test image',
        tags: ['test', 'image']
      };
      
      const mockInsert = jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'Insert failed' }
      });
      
      (supabase.from as jest.Mock).mockReturnValue({
        insert: mockInsert
      });
      
      // Execute test
      const result = await createMediaRecord(
        'mock-uuid',
        'https://example.com/mock-uuid.jpg',
        mockFile,
        mockFileWithMeta
      );
      
      // Assertions
      expect(result).toBe(false);
    });
  });
});

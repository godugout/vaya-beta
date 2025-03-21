
import { updateFileMetadata, updateFileTags, updateFileProgress } from '../fileUtils';
import { FileWithMeta } from '../types';

describe('fileUtils', () => {
  const mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
  
  const testFiles: FileWithMeta[] = [
    {
      file: mockFile,
      progress: 0,
      title: 'Test Image',
      description: 'A test image',
      tags: ['test']
    },
    {
      file: mockFile,
      progress: 0,
      title: 'Another Image',
      description: 'Another test image',
      tags: ['another', 'test']
    }
  ];

  describe('updateFileMetadata', () => {
    it('should update the title of a file at the given index', () => {
      const updatedFiles = updateFileMetadata(testFiles, 0, 'title', 'Updated Title');
      expect(updatedFiles[0].title).toBe('Updated Title');
      expect(updatedFiles[1].title).toBe('Another Image'); // Unchanged
    });

    it('should update the description of a file at the given index', () => {
      const updatedFiles = updateFileMetadata(testFiles, 1, 'description', 'Updated description');
      expect(updatedFiles[0].description).toBe('A test image'); // Unchanged
      expect(updatedFiles[1].description).toBe('Updated description');
    });
    
    it('should not mutate the original array', () => {
      const updatedFiles = updateFileMetadata(testFiles, 0, 'title', 'Updated Title');
      expect(testFiles[0].title).toBe('Test Image'); // Original unchanged
      expect(updatedFiles).not.toBe(testFiles); // New array reference
    });
  });

  describe('updateFileTags', () => {
    it('should update tags for a file at the given index', () => {
      const updatedFiles = updateFileTags(testFiles, 0, 'new,tags,comma,separated');
      expect(updatedFiles[0].tags).toEqual(['new', 'tags', 'comma', 'separated']);
      expect(updatedFiles[1].tags).toEqual(['another', 'test']); // Unchanged
    });
    
    it('should handle empty tags', () => {
      const updatedFiles = updateFileTags(testFiles, 0, '');
      expect(updatedFiles[0].tags).toEqual([]);
    });
    
    it('should trim whitespace from tags', () => {
      const updatedFiles = updateFileTags(testFiles, 0, ' tag1 , tag2 ');
      expect(updatedFiles[0].tags).toEqual(['tag1', 'tag2']);
    });
    
    it('should not mutate the original array', () => {
      const updatedFiles = updateFileTags(testFiles, 0, 'new,tags');
      expect(testFiles[0].tags).toEqual(['test']); // Original unchanged
      expect(updatedFiles).not.toBe(testFiles); // New array reference
    });
  });

  describe('updateFileProgress', () => {
    it('should update progress for a file at the given index', () => {
      const updatedFiles = updateFileProgress(testFiles, 0, 50);
      expect(updatedFiles[0].progress).toBe(50);
      expect(updatedFiles[1].progress).toBe(0); // Unchanged
    });
    
    it('should not mutate the original array', () => {
      const updatedFiles = updateFileProgress(testFiles, 0, 75);
      expect(testFiles[0].progress).toBe(0); // Original unchanged
      expect(updatedFiles).not.toBe(testFiles); // New array reference
    });
  });
});

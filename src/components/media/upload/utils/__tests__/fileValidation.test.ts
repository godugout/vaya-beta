
import { validateFiles } from '../fileValidation';

describe('fileValidation', () => {
  describe('validateFiles', () => {
    it('should validate files based on size and type restrictions', () => {
      // Create test files
      const validFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
      const oversizedFile = new File(['x'.repeat(6 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
      const wrongTypeFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
      
      // Test with valid file and size and type restrictions
      const { validFiles: result1, errors: errors1 } = validateFiles(
        [validFile], 
        5, // 5MB
        ['image/jpeg', 'image/png']
      );
      expect(result1.length).toBe(1);
      expect(errors1.length).toBe(0);
      
      // Test with oversized file
      const { validFiles: result2, errors: errors2 } = validateFiles(
        [oversizedFile], 
        5, // 5MB
        ['image/jpeg', 'image/png']
      );
      expect(result2.length).toBe(0);
      expect(errors2.length).toBe(1);
      expect(errors2[0]).toContain('File size exceeds 5MB limit');
      
      // Test with wrong type file
      const { validFiles: result3, errors: errors3 } = validateFiles(
        [wrongTypeFile], 
        5, // 5MB
        ['image/jpeg', 'image/png']
      );
      expect(result3.length).toBe(0);
      expect(errors3.length).toBe(1);
      expect(errors3[0]).toContain('Unsupported file type');
      
      // Test with multiple files, some valid, some invalid
      const { validFiles: result4, errors: errors4 } = validateFiles(
        [validFile, oversizedFile, wrongTypeFile], 
        5, // 5MB
        ['image/jpeg', 'image/png']
      );
      expect(result4.length).toBe(1);
      expect(errors4.length).toBe(2);
      
      // Test with category file type wildcard
      const { validFiles: result5, errors: errors5 } = validateFiles(
        [validFile, wrongTypeFile], 
        5, // 5MB
        ['image/*']
      );
      expect(result5.length).toBe(1);
      expect(errors5.length).toBe(1);
      
      // Test with no type restrictions (all types allowed)
      const { validFiles: result6, errors: errors6 } = validateFiles(
        [validFile, wrongTypeFile], 
        5, // 5MB
        []
      );
      expect(result6.length).toBe(2);
      expect(errors6.length).toBe(0);
    });
  });
});

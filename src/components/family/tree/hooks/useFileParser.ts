
import { useCallback } from 'react';
import * as XLSX from 'xlsx';

export function useFileParser() {
  // Function to parse Excel files
  const parseExcelFile = useCallback((file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          if (!data) {
            throw new Error('Failed to read file data');
          }
          
          // Parse based on file extension
          if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
            const workbook = XLSX.read(data, { type: 'binary' });
            
            // Get first worksheet
            const worksheetName = workbook.SheetNames[0];
            if (!worksheetName) {
              throw new Error('Excel file contains no worksheets');
            }
            
            const worksheet = workbook.Sheets[worksheetName];
            
            // Convert to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            console.log('Parsed Excel data:', jsonData);
            
            if (!Array.isArray(jsonData) || jsonData.length === 0) {
              throw new Error('Excel file contains no valid data');
            }
            
            // Process data to handle various column naming conventions
            const processedData = jsonData.map((row: any) => {
              // Handle different possible column names for common fields
              return {
                name: row.Name || row.name || row.full_name || row.fullName,
                birthDate: row.Birthdate || row.birthDate || row.birth_date || row.dob,
                email: row.Email || row["Email Address"] || row.email,
                address: row.Address || row["Home Addresses"] || row.address,
                // Extract village information from name if available
                role: row.Name?.includes("Miroli") ? "mother's side" :
                      row.Name?.includes("Mandva") ? "father's side" :
                      row.Name?.includes("Malsar") ? "village" : "member",
                // Add any additional details as needed
                details: `Email: ${row["Email Address"] || ''}\nAddress: ${row["Home Addresses"] || ''}`
              };
            });
            
            resolve(processedData);
          } else {
            reject(new Error('Unsupported file format. Please upload an .xlsx or .xls file.'));
          }
        } catch (error) {
          console.error('Error parsing Excel file:', error);
          reject(error);
        }
      };
      
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        reject(new Error('Error reading the file'));
      };
      
      reader.readAsBinaryString(file);
    });
  }, []);

  return { parseExcelFile };
}

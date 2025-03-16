
import * as XLSX from 'xlsx';

// Function to parse CSV files
export const parseCSVFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',');
        
        const data = lines.slice(1).map(line => {
          const values = line.split(',');
          return headers.reduce((obj, header, i) => {
            obj[header.trim()] = values[i]?.trim() || '';
            return obj;
          }, {} as Record<string, string>);
        });
        
        resolve(data);
      } catch (error) {
        reject(new Error('Error parsing CSV file. Please check the format.'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};

// Function to parse JSON files
export const parseJSONFile = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        resolve(jsonData);
      } catch (error) {
        reject(new Error('Error parsing JSON file. Please check the format.'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};

// Function to parse Excel files
export const parseExcelFile = (file: File): Promise<any[]> => {
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
          
          resolve(jsonData);
        } else {
          reject(new Error('Unsupported file format. Please upload an .xlsx or .xls file.'));
        }
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        reject(error instanceof Error ? error : new Error('Unknown error parsing Excel file'));
      }
    };
    
    reader.onerror = (error) => {
      console.error('FileReader error:', error);
      reject(new Error('Error reading the file'));
    };
    
    reader.readAsBinaryString(file);
  });
};

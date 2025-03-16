
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
              // Extract key information from available fields
              const nameValue = row.Name || row.name || row.full_name || row.fullName || 
                              row['Full Name'] || row.person || row.member || '';
              
              const birthDateValue = row.Birthdate || row.birthDate || row.birth_date || 
                                  row.dob || row['Date of Birth'] || row.DOB || '';
              
              const emailValue = row.Email || row["Email Address"] || row.email || 
                              row['e-mail'] || row.contact || row.emailAddress || '';
              
              const addressValue = row.Address || row["Home Addresses"] || row.address || 
                                row['Home Address'] || row.location || row.residence || '';
              
              // More flexible role detection
              let roleValue = row.role || row.Role || row.relation || row.Relation || 'member';
              
              // Extract village information from name or other fields if available
              if (nameValue && typeof nameValue === 'string') {
                if (nameValue.includes("Miroli") || 
                    (row.village === 'Miroli') || 
                    (row.comments && row.comments.includes('Miroli'))) {
                  roleValue = "mother's side";
                } else if (nameValue.includes("Mandva") || 
                         (row.village === 'Mandva') || 
                         (row.comments && row.comments.includes('Mandva'))) {
                  roleValue = "father's side";
                } else if (nameValue.includes("Malsar") || 
                         (row.village === 'Malsar') || 
                         (row.comments && row.comments.includes('Malsar'))) {
                  roleValue = "village";
                }
              }
              
              // Build details string from all available information
              const detailsArray = [];
              if (emailValue) detailsArray.push(`Email: ${emailValue}`);
              if (addressValue) detailsArray.push(`Address: ${addressValue}`);
              
              // Add any other fields that might be useful
              const fieldsToAdd = ['phone', 'Phone', 'Phone Number', 'occupation', 'Occupation', 'notes', 'Notes'];
              fieldsToAdd.forEach(field => {
                if (row[field]) detailsArray.push(`${field}: ${row[field]}`);
              });
              
              return {
                name: nameValue || 'Unknown Member',
                birthDate: birthDateValue || null,
                email: emailValue || null,
                address: addressValue || null,
                role: roleValue,
                details: detailsArray.join('\n'),
                // Ensure we have an ID for each member
                id: row.id || row.ID || null,
                // Pass through any other known fields
                parentId: row.parentId || row.parent_id || row['Parent ID'] || null,
                spouseId: row.spouseId || row.spouse_id || row['Spouse ID'] || null,
                imageUrl: row.imageUrl || row.image || row.photo || row.avatar || null
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


// Function to parse family tree data from various file formats
export async function parseFamilyTreeData(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const fileName = file.name.toLowerCase();
    
    reader.onload = (event) => {
      try {
        // Handle JSON files
        if (fileName.endsWith('.json')) {
          const jsonData = JSON.parse(event.target?.result as string);
          resolve(processJsonData(jsonData));
        } 
        // Handle CSV files
        else if (fileName.endsWith('.csv')) {
          const csvData = event.target?.result as string;
          resolve(processCsvData(csvData));
        } 
        // Handle Excel files (basic support)
        else if (fileName.endsWith('.xlsx')) {
          // In a production app, you would use a library like xlsx
          // This is a placeholder that would be replaced with actual Excel parsing
          alert('Excel parsing requires a full implementation with xlsx library');
          reject(new Error('Excel parsing not implemented in this demo'));
        } else {
          reject(new Error('Unsupported file format'));
        }
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    if (fileName.endsWith('.json') || fileName.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
}

// Process JSON data into a format compatible with our tree structure
function processJsonData(data: any): any {
  // If the data already has nodes and edges, return it directly
  if (data.nodes && data.edges) {
    return {
      nodes: data.nodes.map((node: any) => ({
        ...node,
        type: node.type || 'familyMember',
      })),
      edges: data.edges.map((edge: any) => ({
        ...edge,
        type: edge.type || 'familyConnection',
      }))
    };
  }
  
  // If data is a simple array of family members
  if (Array.isArray(data)) {
    return convertMembersArrayToTree(data);
  }
  
  // If data has a members property which is an array
  if (data.members && Array.isArray(data.members)) {
    return convertMembersArrayToTree(data.members);
  }
  
  throw new Error('Unsupported JSON structure');
}

// Convert an array of members to nodes and edges
function convertMembersArrayToTree(members: any[]): any {
  // Create nodes from members
  const nodes = members.map((member, index) => ({
    id: member.id || `member-${index}`,
    type: 'familyMember',
    position: member.position || { x: 100 + Math.random() * 400, y: 100 + Math.random() * 400 },
    data: {
      name: member.name || member.full_name || 'Unknown',
      relationship: member.relationship || member.role || 'member',
      storyCount: member.storyCount || 0,
      ...member
    }
  }));
  
  // Create edges based on relationships if defined
  const edges: any[] = [];
  
  members.forEach((member, index) => {
    const sourceId = member.id || `member-${index}`;
    
    // Process parent-child relationships
    if (member.children && Array.isArray(member.children)) {
      member.children.forEach((childId: string) => {
        const targetNode = nodes.find(node => node.id === childId || node.data.name === childId);
        if (targetNode) {
          edges.push({
            id: `e-${sourceId}-${targetNode.id}`,
            source: sourceId,
            target: targetNode.id,
            type: 'familyConnection',
            data: { relationship: 'parent' }
          });
        }
      });
    }
    
    // Process spouse relationships
    if (member.spouse) {
      const spouseNode = nodes.find(node => 
        node.id === member.spouse || 
        node.data.name === member.spouse
      );
      if (spouseNode) {
        edges.push({
          id: `e-${sourceId}-${spouseNode.id}`,
          source: sourceId,
          target: spouseNode.id,
          type: 'familyConnection',
          data: { relationship: 'spouse' }
        });
      }
    }
  });
  
  return { nodes, edges };
}

// Process CSV data into a format compatible with our tree structure
function processCsvData(csvString: string): any {
  // Split the CSV into lines
  const lines = csvString.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  // Get headers from the first line
  const headers = lines[0].split(',').map(header => header.trim());
  
  // Create objects for each member based on the headers
  const members = lines.slice(1).map(line => {
    const values = line.split(',').map(value => value.trim());
    const member: {[key: string]: any} = {};
    
    headers.forEach((header, index) => {
      member[header] = values[index] || '';
    });
    
    return member;
  });
  
  // Convert members array to tree format
  return convertMembersArrayToTree(members);
}


interface Position {
  x: number;
  y: number;
}

export const useVerticalLayout = () => {
  const positionNodes = (node: any, x: number, y: number, horizontalSpacing = 200, verticalSpacing = 150) => {
    node.position = { x, y };
    
    if (node.children && node.children.length > 0) {
      const childrenWidth = (node.children.length - 1) * horizontalSpacing;
      const startX = x - childrenWidth / 2;
      
      node.children.forEach((child: any, index: number) => {
        const childX = startX + index * horizontalSpacing;
        positionNodes(child, childX, y + verticalSpacing);
      });
    }
  };

  const layoutVertical = (rootNodes: any[]) => {
    let rootX = 0;
    const rootSpacing = 400;
    rootNodes.forEach(root => {
      positionNodes(root, rootX, 100);
      rootX += rootSpacing;
    });
  };

  return { layoutVertical };
};

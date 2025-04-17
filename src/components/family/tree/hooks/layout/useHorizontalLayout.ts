
export const useHorizontalLayout = () => {
  const positionNodes = (node: any, x: number, y: number, horizontalSpacing = 250, verticalSpacing = 120) => {
    node.position = { x, y };
    
    if (node.children && node.children.length > 0) {
      const childrenHeight = (node.children.length - 1) * verticalSpacing;
      const startY = y - childrenHeight / 2;
      
      node.children.forEach((child: any, index: number) => {
        const childY = startY + index * verticalSpacing;
        positionNodes(child, x + horizontalSpacing, childY);
      });
    }
  };

  const layoutHorizontal = (rootNodes: any[]) => {
    let rootY = 0;
    const rootSpacing = 300;
    rootNodes.forEach(root => {
      positionNodes(root, 100, rootY);
      rootY += rootSpacing;
    });
  };

  return { layoutHorizontal };
};

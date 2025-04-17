
interface Position {
  x: number;
  y: number;
}

export const useRadialLayout = () => {
  const positionAtAngle = (x: number, y: number, angle: number, distance: number): Position => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: x + distance * Math.cos(radians),
      y: y + distance * Math.sin(radians),
    };
  };

  const positionNodes = (
    node: any,
    centerX: number,
    centerY: number,
    startAngle: number,
    endAngle: number,
    level: number,
    radiusStep: number
  ) => {
    const midAngle = (startAngle + endAngle) / 2;
    const distance = level * radiusStep;
    node.position = positionAtAngle(centerX, centerY, midAngle, distance);
    
    if (node.children && node.children.length > 0) {
      const angleStep = (endAngle - startAngle) / node.children.length;
      
      node.children.forEach((child: any, index: number) => {
        const childStartAngle = startAngle + index * angleStep;
        const childEndAngle = childStartAngle + angleStep;
        positionNodes(child, centerX, centerY, childStartAngle, childEndAngle, level + 1, radiusStep);
      });
    }
  };

  const layoutRadial = (rootNodes: any[]) => {
    const centerX = 500;
    const centerY = 300;
    const radiusStep = 200;
    
    if (rootNodes.length === 1) {
      rootNodes[0].position = { x: centerX, y: centerY };
      
      if (rootNodes[0].children?.length > 0) {
        const angleStep = 360 / rootNodes[0].children.length;
        rootNodes[0].children.forEach((child: any, index: number) => {
          const childStartAngle = index * angleStep;
          const childEndAngle = childStartAngle + angleStep;
          positionNodes(child, centerX, centerY, childStartAngle, childEndAngle, 1, radiusStep);
        });
      }
    } else {
      const angleStep = 360 / rootNodes.length;
      rootNodes.forEach((root, index) => {
        const rootAngle = index * angleStep;
        const rootPos = positionAtAngle(centerX, centerY, rootAngle, radiusStep / 2);
        root.position = rootPos;
        
        if (root.children?.length > 0) {
          const childAngleStep = 360 / root.children.length;
          root.children.forEach((child: any, childIndex: number) => {
            const childStartAngle = rootAngle - 45 + childIndex * childAngleStep;
            const childEndAngle = childStartAngle + childAngleStep;
            positionNodes(child, rootPos.x, rootPos.y, childStartAngle, childEndAngle, 1, radiusStep);
          });
        }
      });
    }
  };

  return { layoutRadial };
};

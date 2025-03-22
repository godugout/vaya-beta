
import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// The base unit for our 8px grid system
const GRID_UNIT = 8;

// Container variants
const containerVariants = cva(
  "mx-auto w-full px-4", // Default padding
  {
    variants: {
      maxWidth: {
        sm: "max-w-screen-sm", // 640px
        md: "max-w-screen-md", // 768px
        lg: "max-w-screen-lg", // 1024px
        xl: "max-w-screen-xl", // 1280px
        "2xl": "max-w-screen-2xl", // 1536px
        full: "max-w-full", // No max width
        none: "", // No constraints
      },
      padding: {
        0: "px-0",
        1: `px-${GRID_UNIT * 1}px`,
        2: `px-${GRID_UNIT * 2}px`,
        3: `px-${GRID_UNIT * 3}px`,
        4: `px-${GRID_UNIT * 4}px`,
        5: `px-${GRID_UNIT * 5}px`,
        6: `px-${GRID_UNIT * 6}px`,
      },
      responsive: {
        true: "px-4 sm:px-6 md:px-8 lg:px-12",
        false: "",
      }
    },
    defaultVariants: {
      maxWidth: "xl", 
      responsive: true,
    },
  }
);

// Grid variants
const gridVariants = cva(
  "grid", // Base grid class
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
        12: "grid-cols-12",
        none: "",
      },
      gap: {
        0: "gap-0",
        1: "gap-1", // 8px
        2: "gap-2", // 16px
        3: "gap-3", // 24px
        4: "gap-4", // 32px
        5: "gap-5", // 40px
        6: "gap-6", // 48px
        8: "gap-8", // 64px
      },
      responsive: {
        true: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        false: "",
      }
    },
    defaultVariants: {
      cols: 3,
      gap: 4,
      responsive: false,
    },
  }
);

interface ContainerProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth, padding, responsive, ...props }, ref) => (
    <div 
      ref={ref}
      className={cn(containerVariants({ maxWidth, padding, responsive }), className)}
      {...props}
    />
  )
);

Container.displayName = "Container";

interface GridProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  responsive?: boolean;
  autoRows?: boolean;
  masonry?: boolean;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, responsive, autoRows, masonry, ...props }, ref) => (
    <div 
      ref={ref}
      className={cn(
        gridVariants({ cols, gap, responsive }), 
        autoRows && "grid-flow-row auto-rows-max",
        masonry && "masonry", // This would require additional CSS or a masonry library
        className
      )}
      {...props}
    />
  )
);

Grid.displayName = "Grid";

interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6;
  colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  rowStart?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, colSpan, rowSpan, colStart, rowStart, ...props }, ref) => (
    <div 
      ref={ref}
      className={cn(
        colSpan && `col-span-${colSpan}`,
        rowSpan && `row-span-${rowSpan}`,
        colStart && `col-start-${colStart}`,
        rowStart && `row-start-${rowStart}`,
        className
      )}
      {...props}
    />
  )
);

GridItem.displayName = "GridItem";

// We also export a simple flex row/column component based on the 8px grid
interface FlexBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column';
  wrap?: boolean;
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;
}

export const FlexBox = React.forwardRef<HTMLDivElement, FlexBoxProps>(
  ({ className, direction = 'row', wrap, justify, align, gap, ...props }, ref) => (
    <div 
      ref={ref}
      className={cn(
        'flex',
        direction === 'column' && 'flex-col',
        wrap && 'flex-wrap',
        justify && `justify-${justify}`,
        align && `items-${align}`,
        gap !== undefined && `gap-${gap}`,
        className
      )}
      {...props}
    />
  )
);

FlexBox.displayName = "FlexBox";

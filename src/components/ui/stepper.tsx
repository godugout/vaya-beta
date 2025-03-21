
import * as React from "react";
import { cn } from "@/lib/utils";

interface StepsContextValue {
  activeStep: number;
  orientation: 'horizontal' | 'vertical';
}

const StepsContext = React.createContext<StepsContextValue>({
  activeStep: 0,
  orientation: 'horizontal',
});

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

export function Steps({
  activeStep,
  orientation = 'horizontal',
  className,
  children,
  ...props
}: StepsProps) {
  return (
    <StepsContext.Provider value={{ activeStep, orientation }}>
      <div
        className={cn(
          "w-full",
          orientation === 'horizontal' ? "flex items-center" : "flex flex-col gap-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </StepsContext.Provider>
  );
}

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  completed?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Step({
  completed,
  disabled,
  className,
  children,
  ...props
}: StepProps) {
  const { activeStep, orientation } = React.useContext(StepsContext);
  const index = React.useRef(-1);
  
  // Get the index of this step
  const childrenArray = React.Children.toArray(children);
  React.Children.forEach(React.Children.toArray(
    React.useContext(StepsContext).children
  ), (child, i) => {
    if (child === children) {
      index.current = i;
    }
  });
  
  // Determine the step status
  const isActive = activeStep === index.current;
  const isCompleted = completed || activeStep > index.current;
  
  return (
    <div
      className={cn(
        "relative",
        orientation === 'horizontal' ? "flex-1" : "pl-10 pb-8 relative",
        className
      )}
      {...props}
    >
      {orientation === 'vertical' && (
        <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-200">
          <div 
            className={cn(
              "absolute left-[-4px] top-0 h-8 w-8 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center",
              isActive && "border-primary bg-primary/10",
              isCompleted && "border-primary bg-primary text-white"
            )}
          >
            {isCompleted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            ) : (
              <span>{index.current + 1}</span>
            )}
          </div>
        </div>
      )}
      
      <div className="flex flex-col gap-2">
        {children}
      </div>
    </div>
  );
}

export interface StepLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function StepLabel({
  className,
  children,
  ...props
}: StepLabelProps) {
  const { orientation } = React.useContext(StepsContext);
  
  return (
    <div
      className={cn(
        "text-base font-medium",
        orientation === 'vertical' && "mb-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface StepContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function StepContent({
  className,
  children,
  ...props
}: StepContentProps) {
  return (
    <div
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  );
}

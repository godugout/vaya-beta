
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold text-autumn dark:text-leaf mb-4">Something went wrong</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-autumn text-white rounded-md hover:bg-autumn/90 dark:bg-leaf dark:text-black dark:hover:bg-leaf/90"
          >
            Go to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

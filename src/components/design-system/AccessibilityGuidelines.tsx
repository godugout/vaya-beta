
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, MousePointer2 } from 'lucide-react';

export const AccessibilityGuidelines = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accessibility Guidelines</CardTitle>
        <CardDescription>Best practices for creating accessible interfaces</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Color Contrast */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h3 className="text-lg font-semibold">Color Contrast</h3>
            </div>
            <p className="text-muted-foreground">
              All text must maintain a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text.
            </p>
          </div>

          {/* Keyboard Navigation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MousePointer2 className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold">Keyboard Navigation</h3>
            </div>
            <p className="text-muted-foreground">
              All interactive elements must be keyboard accessible with visible focus states.
            </p>
          </div>

          {/* Screen Readers */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Screen Reader Support</h3>
            </div>
            <p className="text-muted-foreground">
              Ensure all content is properly labeled and has appropriate ARIA attributes when needed.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

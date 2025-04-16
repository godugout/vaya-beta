
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { DesignSystemLayout } from '@/components/design-system/DesignSystemLayout';
import { ColorPalette } from '@/components/design-system/ColorPalette';
import { ColorScales } from '@/components/design-system/ColorScales';
import { Typography } from '@/components/design-system/Typography';
import { SpacingGuide } from '@/components/design-system/SpacingGuide';
import ComponentsShowcase from '@/pages/ComponentsShowcase';
import { AccessibilityGuidelines } from '@/components/design-system/AccessibilityGuidelines';

export default function DesignSystem() {
  const location = useLocation();
  
  if (location.pathname === '/design-system') {
    return <Navigate to="/design-system/colors" replace />;
  }
  
  return (
    <DesignSystemLayout>
      <Routes>
        <Route path="colors" element={
          <div className="space-y-8">
            <ColorPalette />
            <ColorScales />
          </div>
        } />
        <Route path="typography" element={<Typography />} />
        <Route path="spacing" element={<SpacingGuide />} />
        <Route path="components/*" element={<ComponentsShowcase />} />
        <Route path="accessibility" element={<AccessibilityGuidelines />} />
        <Route path="*" element={<Navigate to="/design-system/colors" replace />} />
      </Routes>
    </DesignSystemLayout>
  );
};

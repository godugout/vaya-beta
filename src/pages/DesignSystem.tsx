
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { DesignSystemLayout } from '@/components/design-system/DesignSystemLayout';
import { ColorPalette } from '@/components/design-system/ColorPalette';
import { Typography } from '@/components/design-system/Typography';
import { SpacingGuide } from '@/components/design-system/SpacingGuide';
import { ComponentsShowcase } from '@/components/design-system/ComponentsShowcase';
import { IconLibrary } from '@/components/design-system/IconLibrary';
import { ThemeCustomizer } from '@/components/design-system/ThemeCustomizer';
import { AccessibilityGuidelines } from '@/components/design-system/AccessibilityGuidelines';

export default function DesignSystem() {
  const location = useLocation();
  
  // Check if we're at the design-system root path and redirect to the theme customizer
  if (location.pathname === '/design-system') {
    return <Navigate to="/design-system/theme" replace />;
  }
  
  return (
    <DesignSystemLayout>
      <Routes>
        <Route path="theme" element={<ThemeCustomizer />} />
        <Route path="colors" element={<ColorPalette />} />
        <Route path="typography" element={<Typography />} />
        <Route path="spacing" element={<SpacingGuide />} />
        <Route path="components" element={<ComponentsShowcase />} />
        <Route path="icons" element={<IconLibrary />} />
        <Route path="accessibility" element={<AccessibilityGuidelines />} />
        <Route path="*" element={<Navigate to="/design-system/theme" replace />} />
      </Routes>
    </DesignSystemLayout>
  );
}

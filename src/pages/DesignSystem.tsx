
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { DesignSystemLayout } from '@/components/design-system/DesignSystemLayout';
import { ColorPalette } from '@/components/design-system/ColorPalette';
import { Typography } from '@/components/design-system/Typography';
import { SpacingGuide } from '@/components/design-system/SpacingGuide';
import { ComponentShowcase } from '@/components/design-system/ComponentShowcase';
import { IconLibrary } from '@/components/design-system/IconLibrary';
import { ThemeCustomizer } from '@/components/design-system/ThemeCustomizer';
import { AccessibilityGuidelines } from '@/components/design-system/AccessibilityGuidelines';

export default function DesignSystem() {
  return (
    <DesignSystemLayout>
      <Routes>
        <Route index element={<ThemeCustomizer />} />
        <Route path="colors" element={<ColorPalette />} />
        <Route path="typography" element={<Typography />} />
        <Route path="spacing" element={<SpacingGuide />} />
        <Route path="components" element={<ComponentShowcase />} />
        <Route path="icons" element={<IconLibrary />} />
        <Route path="accessibility" element={<AccessibilityGuidelines />} />
      </Routes>
    </DesignSystemLayout>
  );
}

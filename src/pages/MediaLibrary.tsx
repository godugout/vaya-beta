
import React from 'react';
import { Helmet } from 'react-helmet';
import { MainLayout } from '@/components/layout/MainLayout';
import { SpaceMediaGallery } from '@/components/space-vault/SpaceMediaGallery';

export default function MediaLibrary() {
  return (
    <>
      <Helmet>
        <title>Media Vault | Vaya</title>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Orbitron:wght@400;500;700&display=swap" rel="stylesheet" />
      </Helmet>
      
      <MainLayout>
        <SpaceMediaGallery />
      </MainLayout>
    </>
  );
}

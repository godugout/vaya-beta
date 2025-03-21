
import { MediaDetailSkeleton } from './detail/MediaDetailSkeleton';
import { MediaNotFound } from './detail/MediaNotFound';
import { MediaDetailContent } from './detail/MediaDetailContent';
import { useMediaDetail } from './detail/hooks/useMediaDetail';

interface MediaDetailProps {
  id: string;
  onBack: () => void;
}

export const MediaDetail = ({ id, onBack }: MediaDetailProps) => {
  const { mediaItem, loading } = useMediaDetail(id);

  if (loading) {
    return <MediaDetailSkeleton />;
  }

  if (!mediaItem) {
    return <MediaNotFound onBack={onBack} />;
  }

  return <MediaDetailContent mediaItem={mediaItem} onBack={onBack} />;
};

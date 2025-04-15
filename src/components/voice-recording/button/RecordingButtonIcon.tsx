
import { motion } from 'framer-motion';
import { Mic, Square, Loader2 } from 'lucide-react';
import { RecordingState } from '../EnhancedRecordingButton';

interface RecordingButtonIconProps {
  state: RecordingState;
  iconSize: string;
}

export const RecordingButtonIcon = ({ state, iconSize }: RecordingButtonIconProps) => {
  switch (state) {
    case 'idle':
      return <Mic className={iconSize} />;
      
    case 'recording':
      return <Square className={iconSize} />;
      
    case 'processing':
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        >
          <Loader2 className={iconSize} />
        </motion.div>
      );
      
    default:
      return <Mic className={iconSize} />;
  }
};

import { loadDashboardItemsToVar } from '@/utills/functions';
import { useAudioPlayer } from 'expo-audio';
import { useEffect } from 'react';

const useClickSound = () => {
    const sound = useAudioPlayer(require('@/assets/audio/click.mp3'));
    
    useEffect(() => {
      (async () => {
        const volume = await loadDashboardItemsToVar('volume');
        
        if (volume === 0 || !volume) {
          sound.muted = true;
        } else {
          sound.volume = volume;
        }
      })()
  
      return () => {
        sound.release()
      }
    }, [])

    const playSound = () => {
      sound.play();
      sound.seekTo(0);
    }

  return playSound;
}

export default useClickSound;

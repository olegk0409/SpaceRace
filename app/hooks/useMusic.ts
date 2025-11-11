import { loadDashboardItemsToVar } from '@/utills/functions';
import { useAudioPlayer } from 'expo-audio';
import { useEffect } from 'react';

const useMusic = () => {
  const music = useAudioPlayer(require('@/assets/audio/music.mp3'));

  useEffect(() => {
    (async () => {
      const volume = await loadDashboardItemsToVar('sound');
      music.loop = true;
      music.play();

      if (volume === 0 || !volume) {
        music.muted = true;
      } else {
        music.volume = volume;
      }
    })()

    return () => {
      music.release()
    }
  }, [])
}

export default useMusic;
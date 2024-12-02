import { useCallback, useEffect, useState } from 'react';

export function usePlaySoundInternalChat() {
  const [isUserInteracted, setIsUserInteracted] = useState(false);

  useEffect(() => {
    const handleUserInteraction = () => {
      setIsUserInteracted(true);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };

    /** Lắng nghe sự kiện click hoặc keydown để biết khi nào người dùng tương tác với trang */
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  const playMessageSound = useCallback(() => {
    const audio = new Audio('/sound/new-internal-message.mp3');
    audio.play().catch((error) => console.error('Error playing sound:', error));
  }, [isUserInteracted]);

  return {
    playMessageSound
  };
}

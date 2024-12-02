import { debounce } from 'lodash';

export const playInternalMessageSound = () => {
  const audio = new Audio('/sounds/new-message.mp3'); // Đường dẫn tới file âm thanh
  audio.play();
};

// Sử dụng debounce để giới hạn việc phát âm thanh
export const debouncedPlayMessageSound = debounce(playInternalMessageSound, 1000);

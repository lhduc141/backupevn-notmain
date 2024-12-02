import { colorsBase } from 'themes';
import { MessagePosition } from 'types';

export const maskedMessageReplied = (
  messReplied: MessagePosition,
  parent: HTMLDivElement,
  color?: string,
  scrollEnd?: () => void
) => {
  const clone = document.createElement('div');
  clone.className = `w-full absolute rounded-md left-0`;
  clone.style.opacity = `0`;
  clone.style.transition = `opacity 0.25s ease-in-out`;
  clone.style.top = `${messReplied.position}px`;
  clone.style.height = `${messReplied.height}px`;
  clone.style.backgroundColor = color ?? colorsBase.colorPrimary;

  parent?.appendChild(clone);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        /** Khi clone xuất hiện trong viewport, đổi background */
        clone.style.opacity = `0.2`;
        /** Sau 1000ms, xóa clone khỏi DOM và dừng quan sát */
        setTimeout(() => {
          clone.style.opacity = `0`;
        }, 250);
        setTimeout(() => {
          clone.remove();
          observer.disconnect();
          scrollEnd?.();
        }, 400);
      }
    });
  });

  // Bắt đầu quan sát clone
  observer.observe(clone);
};

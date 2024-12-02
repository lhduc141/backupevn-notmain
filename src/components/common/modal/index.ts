import { Modal as ModalAntd } from 'antd';
import SmallModal from './SmallModal ';
import StickerModal from './StickerModal';
import HeadlessModal from './HeadlessModal';

export type ModalProps = typeof ModalAntd & {
  Sticker: typeof StickerModal;
  Small: typeof SmallModal;
  Headless: typeof HeadlessModal;
};
const Modal = ModalAntd as ModalProps;

Modal.Small = SmallModal;
Modal.Sticker = StickerModal;
Modal.Headless = HeadlessModal;

export { Modal };

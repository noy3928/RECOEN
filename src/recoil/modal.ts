import { atom } from 'recoil';
import { ModalType } from 'src/shared/types/modal';

export const modalState = atom<ModalType>({
  key: 'modalState',
  default: null,
});

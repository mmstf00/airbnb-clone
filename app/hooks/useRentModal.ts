import { create } from 'zustand';

interface RentModalModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRentModal = create<RentModalModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useRentModal;
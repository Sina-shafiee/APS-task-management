import { User } from '../../../../types/user';

export type ViewUserDialogProps = User & {
  isModalOpen: boolean;
  closeModal: () => void;
};

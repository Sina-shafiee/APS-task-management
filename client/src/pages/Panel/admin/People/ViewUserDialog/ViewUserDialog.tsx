import { Close } from '@mui/icons-material';
import { Button, Dialog, DialogActions, Stack } from '@mui/material';
import { User } from '../../../../../types/user';

import EditForm from './EditForm';
import InitialContent from './InitialContent';

type ViewUserDialogProps = User & {
  isModalOpen: boolean;
  closeModal: () => void;
};

const ViewUserDialog = ({
  isModalOpen,
  closeModal,
  name,
  email,
  role,
  createdAt,
  skills,
  social,
  language
}: ViewUserDialogProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Dialog fullWidth maxWidth='sm' open={isModalOpen} onClose={closeModal}>
      {isEditing ? <EditForm /> : <InitialContent />}
      <DialogActions>
        <Stack direction='row' gap={2}>
          <Button>Delete</Button>
          <Button>Edit</Button>
        </Stack>
        <Button
          onClick={closeModal}
          variant='text'
          sx={{ position: 'absolute', top: 0, right: 0 }}
        >
          <Close />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewUserDialog;

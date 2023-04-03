import { useState } from 'react';
import { Dialog } from '@mui/material';

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
  language,
  _id
}: ViewUserDialogProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const setNotEditing = () => {
    setIsEditing(false);
  };

  const setEditing = () => {
    setIsEditing(true);
  };

  return (
    <Dialog fullWidth maxWidth='sm' open={isModalOpen} onClose={closeModal}>
      {isEditing ? (
        <EditForm
          name={name}
          email={email}
          createdAt={createdAt}
          _id={_id}
          language={language}
          skills={skills}
          social={social}
          closeModal={closeModal}
          setNotEditing={setNotEditing}
        />
      ) : (
        <InitialContent
          name={name}
          email={email}
          createdAt={createdAt}
          role={role}
          language={language}
          skills={skills}
          social={social}
          closeModal={closeModal}
          setEditing={setEditing}
        />
      )}
    </Dialog>
  );
};

export default ViewUserDialog;

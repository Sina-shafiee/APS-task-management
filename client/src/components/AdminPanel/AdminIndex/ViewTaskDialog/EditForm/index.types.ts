export type EditFormProps = {
  setNotEditing(): void;
  closeModal(): void;
  userId: string;
  title: string;
  desc: string;
  _id: string;
};

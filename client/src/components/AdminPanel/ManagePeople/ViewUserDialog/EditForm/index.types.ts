export type EditFormProps = {
  skills: string[];
  name: string;
  email: string;
  language: string[];
  createdAt?: string;
  _id: string;
  social: {
    linkedin: string;
    github: string;
  };
  closeModal: () => void;
  setNotEditing: () => void;
};

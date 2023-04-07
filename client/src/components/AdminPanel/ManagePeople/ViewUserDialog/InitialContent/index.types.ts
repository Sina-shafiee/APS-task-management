export type InitialContentProps = {
  skills: string[];
  name: string;
  email: string;
  language: string[];
  createdAt: string;
  role: string;
  social: {
    linkedin: string;
    github: string;
  };
  _id: string;
  closeModal: () => void;
  setEditing: () => void;
};

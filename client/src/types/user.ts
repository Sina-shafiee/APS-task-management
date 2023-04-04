export type User = {
  _id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  skills: string[];
  language: string[];
  social: {
    github: string;
    linkedin: string;
  };
};

export type UpdateUser = {
  name: string;
  skills: string[];
  language: string[];
  email?: string;
  social: {
    github: string;
    linkedin: string;
  };
};

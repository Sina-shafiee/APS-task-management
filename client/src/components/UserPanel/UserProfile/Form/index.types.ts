import { UseMutateFunction } from 'react-query';
import { UpdateUser, User } from '../../../../types/user';

export type FormProps = {
  mutate: UseMutateFunction<User, unknown, UpdateUser, unknown>;
  mutationResult: User | undefined;
};

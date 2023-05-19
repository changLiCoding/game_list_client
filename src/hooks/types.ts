import type { Filter } from '@/components/UserListFilterColumn/Desktop/types';
import type { InitialStateType } from '@/features/types';

export type UseFilterOptionsType = {
  filters: Filter[];
};

export type UseTokenAuthType = {
  loading: boolean;
  userState: InitialStateType;
};

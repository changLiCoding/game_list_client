import { StatusContentType } from '@/components/UserListFilterColumn/types';
import type { DropDownOption } from '@/types/global';

export type Filter = {
  name: string;
  options: DropDownOption[];
};

export type StatusItemType = {
  status: StatusContentType;
  index: number;
};

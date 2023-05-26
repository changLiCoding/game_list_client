import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { Dayjs } from 'dayjs';

import React from 'react';
import { GameFilters } from '@/graphql/__generated__/graphql';

export interface DropDownOption {
  value: string | number;
  label: string | number;
  children?: DropDownOption[];
}

export type OnChangeCascaderType = (string | number)[] | string | number;

export type OnChangeCheckboxType = CheckboxChangeEvent;

export type OnChangeTextAreaType = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export type OnChangeDatePickerType = Dayjs | null;

// TODO: Move this somewhere else?

export type MakeUndefined<T> = {
  [K in keyof T]: T[K] | undefined;
};

// TODO: Add 'sort' type to this and the backend
export type BaseFilters = MakeUndefined<
  Omit<GameFilters, '__typename' | 'errors'>
>;

export type Filters2 = MakeUndefined<BaseFilters>;

export type UserGameFilters = Filters2 & {
  selectedList: number;
};

import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { Dayjs } from 'dayjs';

import React from 'react';

export interface DropDownOption {
  value: string;
  label: string;
  children?: DropDownOption[];
}

export type OnChangeCascaderType = (string | number)[];

export type OnChangeCheckboxType = CheckboxChangeEvent;

export type OnChangeTextAreaType = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export type OnChangeDatePickerType = Dayjs | null;

export type OnChangeFilterType =
  | OnChangeCascaderType
  | OnChangeCheckboxType
  | Dayjs
  | OnChangeTextAreaType
  | null;

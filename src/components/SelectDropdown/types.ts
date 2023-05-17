import type { DropDownOption, OnChangeCascaderType } from '@/types/global';

export type SelectDropdownType = {
  fieldName: string;
  options: DropDownOption[];
  onChange: (value: OnChangeCascaderType, fieldName: string) => void;
  changeOnSelect: boolean;
  customCascaderStyle: string;
  value?: string[] | undefined;
};

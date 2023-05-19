import type { DropDownOption, OnChangeCascaderType } from '@/types/global';

export type SelectDropdownType = {
  fieldName: string;
  options: DropDownOption[];
  onChange: (value: OnChangeCascaderType, e: string) => void;
  changeOnSelect: boolean;
  customCascaderStyle: string;
  value?: string[] | undefined;
};

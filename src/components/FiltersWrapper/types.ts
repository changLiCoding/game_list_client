import type { DropDownOption, OnChangeCascaderType } from '@/types/global';

export interface FilterFieldProps {
  defaultValue?: string | undefined;
  fieldName: string;
  options: DropDownOption[];
  onChange: (value: OnChangeCascaderType, fieldName: string) => void;
  changeOnSelect: boolean;
  customCascaderStyle: string;
}

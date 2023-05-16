import type { OnChangeDatePickerType } from '@/types/global';

export type DatePickerFieldType = {
  fieldName: string;
  onChange: (value: OnChangeDatePickerType, dateString: string) => void;
  customCascaderStyle: string;
};

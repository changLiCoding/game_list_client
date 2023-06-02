import type { DropDownOption, OnChangeCascaderType } from '@/types/global';

export interface FilterFieldProps {
  defaultValue?: string | undefined;
  fieldName: string;
  options: DropDownOption[];
  onChange: (value: OnChangeCascaderType, fieldName: string) => void;
  changeOnSelect: boolean;
  customCascaderStyle: string;
}

type ArrayOnly<T> = T extends any[] ? T : never;

export type SelectFilterFieldType<T> =
  | {
      mode: 'multiple';
      value: ArrayOnly<T> | undefined;
      options: string[] | number[];
      onChange: (value: T) => void;
    }
  | {
      mode: undefined;
      value: T | undefined;
      options: string[] | number[];
      onChange: (value: T) => void;
    };

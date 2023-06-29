import { DefaultOptionType } from 'antd/es/select';
import type { DropDownOption, OnChangeCascaderType } from '@/types/global';

export interface FilterFieldProps {
  defaultValue?: string | undefined;
  fieldName: string;
  options: DropDownOption[];
  onChange: (value: OnChangeCascaderType, fieldName: string) => void;
  changeOnSelect: boolean;
  customCascaderStyle: string;
}

export type StateId = State['id'];

export type State = {
  id: 'not_added' | 'included' | 'excluded';
  color: string;
};

export type EntryProps = {
  title: string;
  onChange: (prevState: State, newState: State) => void;
};

export type ExclusionFiltersListProps = {
  title: string;
  entries: string[];
  onChange: (included: string[], excluded: string[]) => void;
};
/// //////////////////////////////////////

type ArrayOnly<T> = T extends any[] ? T : never;

export type SelectFilterFieldType<T> =
  | {
      mode: 'multiple';
      value: ArrayOnly<T> | undefined;
      options: string[] | number[];
      onChange: (value: T, option: T) => void;
      // onSelect: (value: ) => void;
    }
  | {
      mode: undefined;
      value: T | undefined;
      options: string[] | number[];
      onChange: (value: T, option: T) => void;
      // onSelect: () => void;
    };

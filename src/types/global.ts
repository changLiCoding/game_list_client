export interface DropDownOption {
  value: string;
  label: string;
  children?: DropDownOption[];
}

export type OnChangeType = (string | number)[];

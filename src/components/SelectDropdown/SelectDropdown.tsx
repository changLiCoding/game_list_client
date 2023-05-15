import { Cascader } from 'antd';
import styles from './SelectDropdownStyle.module.scss';
import type { DropDownOption, OnChangeCascaderType } from '@/types/global';

function SelectDropdown({
  fieldName,
  options,
  onChange,
  changeOnSelect,
  customCascaderStyle,
}: {
  fieldName: string;
  options: DropDownOption[];
  onChange: (value: OnChangeCascaderType, fieldName: string) => void;
  changeOnSelect: boolean;
  customCascaderStyle: string;
}) {
  return (
    <Cascader
      className={customCascaderStyle}
      placeholder={fieldName}
      options={options}
      onChange={(e: OnChangeCascaderType) => onChange(e, fieldName)}
      changeOnSelect={changeOnSelect}
      data-testid={`dropdown-${fieldName}`}
      dropdownMenuColumnStyle={{ width: '190px' }}
    />
  );
}

export default SelectDropdown;

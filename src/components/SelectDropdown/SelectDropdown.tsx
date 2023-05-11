import { Cascader } from 'antd';
// import styles from './SelectDropdownStyle.module.scss';
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
  onChange: (value: OnChangeCascaderType) => void;
  changeOnSelect: boolean;
  customCascaderStyle: string;
}) {
  return (
    <Cascader
      className={customCascaderStyle}
      placeholder={fieldName}
      options={options}
      onChange={(e: OnChangeCascaderType) => onChange(e)}
      changeOnSelect={changeOnSelect}
      data-testid={`dropdown-${fieldName}`}
    />
  );
}

export default SelectDropdown;

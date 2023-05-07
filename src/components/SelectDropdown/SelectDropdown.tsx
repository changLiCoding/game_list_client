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
  options: DropDownOption[] | undefined;
  onChange: (value: OnChangeCascaderType) => void;
  changeOnSelect: boolean | undefined;
  customCascaderStyle: string | undefined;
}) {
  return (
    <Cascader
      className={customCascaderStyle}
      placeholder={fieldName}
      options={options}
      onChange={(e: OnChangeCascaderType) => onChange(e)}
      changeOnSelect={changeOnSelect}
    />
  );
}

export default SelectDropdown;

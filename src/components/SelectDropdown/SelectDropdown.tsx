import { Cascader } from 'antd';
// import styles from './SelectDropdownStyle.module.scss';
import type { OnChangeCascaderType } from '@/types/global';
import type { SelectDropdownType } from '@/components/SelectDropdown/types';

function SelectDropdown({
  fieldName,
  options,
  onChange,
  changeOnSelect,
  customCascaderStyle,
  value,
}: SelectDropdownType) {
  return (
    <Cascader
      className={customCascaderStyle}
      placeholder={fieldName}
      options={options}
      onChange={(e: OnChangeCascaderType) => onChange(e, fieldName)}
      changeOnSelect={changeOnSelect}
      data-testid={`dropdown-${fieldName}`}
      dropdownMenuColumnStyle={{ width: '190px' }}
      value={value}
    />
  );
}

export default SelectDropdown;

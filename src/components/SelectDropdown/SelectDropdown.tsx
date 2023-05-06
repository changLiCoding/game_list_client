import { Cascader } from 'antd';
import React from 'react';
// import styles from './SelectDropdownStyle.module.scss';
import type { DropDownOption, OnChangeType } from '@/types/global';

function SelectDropdown({
  fieldName,
  options,
  onChange,
  changeOnSelect,
  customCascaderStyle,
}: {
  fieldName: string;
  options: DropDownOption[];
  onChange: (value: OnChangeType) => void;
  changeOnSelect: boolean;
  customCascaderStyle: string;
}) {
  return (
    <Cascader
      className={customCascaderStyle}
      placeholder={fieldName}
      options={options}
      onChange={(e: OnChangeType) => onChange(e)}
      changeOnSelect={changeOnSelect}
    />
  );
}

export default SelectDropdown;

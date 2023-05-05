import { Cascader } from 'antd';
import React from 'react';
import styles from './SelectDropdownStyle.module.scss';
import { DropDownOption } from '@/types/global';

function SelectDropdown({
  fieldName,
  options,
  onChange,
  changeOnSelect,
  customCascaderStyle,
}: {
  fieldName: string;
  options: DropDownOption[];
  onChange: (value: any) => void;
  changeOnSelect: boolean;
  customCascaderStyle: any;
}) {
  return (
    <Cascader
      className={customCascaderStyle}
      placeholder={fieldName}
      options={options}
      onChange={onChange}
      changeOnSelect={changeOnSelect}
    />
  );
}

export default SelectDropdown;

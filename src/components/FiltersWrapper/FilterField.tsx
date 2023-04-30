import './FilterField.scss';
import { Cascader, Layout } from 'antd';

import React from 'react';

export default function FilterField({
  fieldName,
  options,
  onChange,
  changeOnSelect,
}: {
  fieldName: string;
  options: any;
  onChange: any;
  changeOnSelect?: boolean;
}) {
  return (
    <Layout className="layout-FilterField-container">
      <h3 className="h3-FilterField-title">{fieldName}</h3>
      <Cascader
        className="Cascader-FilterField-cascader"
        placeholder={fieldName}
        options={options}
        onChange={onChange}
        changeOnSelect={changeOnSelect}
      />
    </Layout>
  );
}

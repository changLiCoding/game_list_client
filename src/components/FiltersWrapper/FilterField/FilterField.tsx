import { Cascader, Layout } from 'antd';

import styles from '@/components/FiltersWrapper/FilterField/FilterField.module.scss';
import { Option } from '@/components/FiltersWrapper/types';

export default function FilterField({
  fieldName,
  options,
  onChange,
  changeOnSelect,
}: {
  fieldName: string;
  options: Option[];
  onChange: (value: string[]) => void;
  changeOnSelect: boolean;
}) {
  return (
    <Layout className={styles.layoutFilterFieldContainer}>
      <h3 className={styles.h3FilterFieldTitle}>{fieldName}</h3>
      <Cascader
        className={styles.CascaderFilterFieldCascader}
        placeholder={fieldName}
        options={options}
        onChange={onChange}
        changeOnSelect={changeOnSelect}
      />
    </Layout>
  );
}

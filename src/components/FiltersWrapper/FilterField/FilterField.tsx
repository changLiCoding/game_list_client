import styles from '@/components/FiltersWrapper/FilterField/FilterField.module.scss';
import SelectDropdown from '@/components/SelectDropdown';
import type { DropDownOption, OnChangeType } from '@/types/global';

export default function FilterField({
  fieldName,
  options,
  onChange,
  changeOnSelect,
}: {
  fieldName: string;
  options: DropDownOption[];
  onChange: (value: OnChangeType) => void;
  changeOnSelect: boolean;
}) {
  return (
    <div className={styles.layoutFilterFieldContainer}>
      <h3 className={styles.h3FilterFieldTitle}>{fieldName}</h3>
      <SelectDropdown
        customCascaderStyle={styles.cascaderStyle}
        fieldName={fieldName}
        options={options}
        onChange={onChange}
        changeOnSelect={changeOnSelect}
      />
    </div>
  );
}

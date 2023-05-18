import styles from '@/components/FiltersWrapper/FilterField/FilterField.module.scss';
import type { FilterFieldProps } from '@/components/FiltersWrapper/types';
import SelectDropdown from '@/components/SelectDropdown';

export default function FilterField({
  defaultValue,
  fieldName,
  options,
  onChange,
  changeOnSelect,
  customCascaderStyle,
}: FilterFieldProps) {
  return (
    <div className={styles.layoutFilterFieldContainer}>
      <h3 className={styles.h3FilterFieldTitle}>{fieldName}</h3>
      <SelectDropdown
        value={defaultValue ? [defaultValue] : undefined}
        fieldName={fieldName}
        options={options}
        onChange={onChange}
        changeOnSelect={changeOnSelect}
        customCascaderStyle={customCascaderStyle}
      />
    </div>
  );
}

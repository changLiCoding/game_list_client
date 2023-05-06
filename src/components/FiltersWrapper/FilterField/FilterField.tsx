import styles from '@/components/FiltersWrapper/FilterField/FilterField.module.scss';
import SelectDropdown from '@/components/SelectDropdown';
import DatePickerField from '@/components/DatePickerField';
import type { DropDownOption, OnChangeType } from '@/types/global';

export default function FilterField({
  fieldName,
  options,
  onChange,
  changeOnSelect,
  type,
  optionalStyles,
}: {
  fieldName: string;
  options: DropDownOption[];
  onChange: (value: OnChangeType) => void;
  changeOnSelect: boolean;
  type: string | null;
  optionalStyles: string | null;
}) {
  return (
    <div className={styles.layoutFilterFieldContainer}>
      <h3 className={styles.h3FilterFieldTitle}>{fieldName}</h3>
      {type === 'date' ? (
        <DatePickerField
          fieldName={fieldName}
          onChange={onChange}
          customCascaderStyle={optionalStyles || styles.cascaderStyle}
        />
      ) : (
        <SelectDropdown
          customCascaderStyle={styles.cascaderStyle}
          fieldName={fieldName}
          options={options}
          onChange={onChange}
          changeOnSelect={changeOnSelect}
        />
      )}
    </div>
  );
}
